/* ============================================================
   AURA Studio — Construction Build Effects (v1)
   يحول الصور العادية لفيلم بناء حي قدام عينك
   - Ken Burns (zoom + pan)
   - Mask Reveal (بناء يرتفع من تحت لفوق / مسح من الشمال لليمين)
   - Wavy Construction Edge (حافة متعرجة زي طوب بيتبني)
   - Crossfade + Dust Particles
   - Parallax Layers
   - Frame Interpolation hint for AI

   الاستخدام:
   const fx = new BuildEffects(document.getElementById('cine'));
   fx.drawWithEffect(currentImg, nextImg, progress, 'build-up');

   ============================================================ */

class BuildEffects {
  constructor(canvas) {
    this.cv = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.lastTime = 0;
  }

  /* ---------- 1. Ken Burns Effect ---------- */
  // progress: 0..1 خلال مدة الـ stage (مثلاً 3 ثواني)
  // direction: {x, y} للـ pan (-1..1)
  kenBurnsScale(progress, fromScale = 1.0, toScale = 1.18) {
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    return fromScale + (toScale - fromScale) * eased;
  }
  kenBurnsPan(progress, from = {x:0, y:0}, to = {x:-6, y:-4}) {
    const eased = 1 - Math.pow(1 - progress, 3);
    return {
      x: from.x + (to.x - from.x) * eased,
      y: from.y + (to.y - from.y) * eased
    };
  }
  drawKenBurns(img, progress, options = {}) {
    const {
      fromScale = 1.0,
      toScale = 1.15,
      fromPan = {x:0, y:0},
      toPan = {x: -5, y: -8},
      vignette = true
    } = options;
    const ctx = this.ctx;
    const cv = this.cv;
    const scale = this.kenBurnsScale(progress, fromScale, toScale);
    const pan = this.kenBurnsPan(progress, fromPan, toPan);

    ctx.save();
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, cv.width, cv.height);

    const iw = img.width, ih = img.height;
    const baseScale = Math.min(cv.width / iw, (cv.height * 0.92) / ih) * 0.92;
    const w = iw * baseScale * scale;
    const h = ih * baseScale * scale;
    const cx = (cv.width - w) / 2 + pan.x * (cv.width * 0.01);
    const cy = (cv.height - h) / 2 + cv.height * 0.02 + pan.y * (cv.height * 0.01);

    ctx.drawImage(img, cx, cy, w, h);

    if (vignette) {
      const grad = ctx.createRadialGradient(cv.width/2, cv.height/2, cv.width*0.3, cv.width/2, cv.height/2, cv.width*0.9);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(0,0,0,0.18)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, cv.width, cv.height);
    }
    ctx.restore();
  }

  /* ---------- 2. Mask Reveal — أساس فكرة "البنا قدامك" ---------- */
  // type: 'bottom-top' | 'left-right' | 'center-out' | 'diagonal'
  // progress: 0..1
  drawMaskReveal(img, progress, type = 'bottom-top', wavy = true) {
    const ctx = this.ctx, cv = this.cv;
    ctx.save();
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, cv.width, cv.height);

    // حساب موضع الصورة بنفس منطق draw الأصلي
    const iw = img.width, ih = img.height;
    const s = Math.min(cv.width / iw, (cv.height * .92) / ih) * .92;
    const w = iw * s, h = ih * s;
    const x = (cv.width - w) / 2;
    const y = (cv.height - h) / 2 + cv.height * .02;

    const p = Math.min(1, Math.max(0, progress));

    // بناء مسار القطع (clip)
    ctx.beginPath();
    if (type === 'bottom-top') {
      const visibleH = h * p;
      const topY = y + h - visibleH;
      if (wavy && p > 0 && p < 1) {
        // حافة متعرجة زي طوب بيتبني
        ctx.moveTo(x, y + h);
        ctx.lineTo(x, topY);
        const segments = 20;
        const step = w / segments;
        for (let i = 0; i <= segments; i++) {
          const px = x + i * step;
          const wave = Math.sin(i * 1.8 + p * 6) * 12 + Math.random() * 6;
          const py = topY + (i % 3 === 0 ? wave : 0);
          ctx.lineTo(px, py);
        }
        ctx.lineTo(x + w, y + h);
      } else {
        ctx.rect(x, topY, w, visibleH);
      }
    } else if (type === 'left-right') {
      const visibleW = w * p;
      if (wavy && p > 0 && p < 1) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + visibleW, y);
        const segments = 18;
        const step = h / segments;
        for (let i = 0; i <= segments; i++) {
          const py = y + i * step;
          const wave = Math.cos(i * 1.5 + p * 5) * 14;
          const px = x + visibleW + (i % 2 === 0 ? wave : -wave * 0.5);
          ctx.lineTo(px, py);
        }
        ctx.lineTo(x, y + h);
      } else {
        ctx.rect(x, y, visibleW, h);
      }
    } else if (type === 'center-out') {
      const radius = Math.hypot(w, h) * p * 0.7;
      ctx.arc(x + w/2, y + h/2, radius, 0, Math.PI * 2);
    } else if (type === 'diagonal') {
      // مسح قطري من تحت شمال لفوق يمين
      const diag = (w + h) * p;
      ctx.moveTo(x, y + h);
      ctx.lineTo(x + diag, y + h);
      ctx.lineTo(x + w, y + h - (diag - w));
      ctx.lineTo(x + w, y + h);
      ctx.closePath();
    }
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(img, x, y, w, h);

    // خط البناء (construction line) عند الحافة
    if (p > 0.02 && p < 0.98 && (type === 'bottom-top' || type === 'left-right')) {
      ctx.strokeStyle = 'rgba(191,167,106,0.9)';
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 6]);
      ctx.stroke();
      // نقاط سقالة صغيرة
      ctx.fillStyle = 'rgba(191,167,106,0.6)';
      ctx.setLineDash([]);
      for (let i = 0; i < 5; i++) {
        const sx = x + (w * (i + 0.5) / 5);
        const sy = type === 'bottom-top' ? (y + h - h * p) : (y + h * 0.5);
        ctx.beginPath();
        ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();

    // dust particles عند حافة البناء
    if (wavy && p > 0.05 && p < 0.95) {
      this.addDustParticles(x, y, w, h, p, type);
      this.drawDust();
    }
  }

  /* ---------- 2B. Wavy Construction Edge Helper ---------- */
  addDustParticles(x, y, w, h, progress, type) {
    const edgeY = y + h - h * progress;
    const edgeX = x + w * progress;
    if (Math.random() > 0.7) {
      const isVertical = type === 'bottom-top';
      this.particles.push({
        x: isVertical ? x + Math.random() * w : edgeX,
        y: isVertical ? edgeY : y + Math.random() * h,
        vx: (Math.random() - 0.5) * 2,
        vy: isVertical ? -Math.random() * 2 - 0.5 : (Math.random() - 0.5) * 1,
        life: 1.0,
        r: Math.random() * 2.5 + 0.5
      });
    }
    // حد أقصى 40 particle
    if (this.particles.length > 40) this.particles.shift();
  }
  drawDust() {
    const ctx = this.ctx;
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.02;
      p.vy += 0.02; // gravity
    });
    this.particles = this.particles.filter(p => p.life > 0);
    this.particles.forEach(p => {
      ctx.globalAlpha = p.life * 0.6;
      ctx.fillStyle = '#C9B89A';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  /* ---------- 3. Crossfade بين فريمين ---------- */
  drawCrossfade(img1, img2, progress, kenBurns = true) {
    // progress 0..1 بين فريمين متتاليين
    const ctx = this.ctx;
    if (!img1 || !img2) {
      if (img1) this.drawKenBurns(img1, progress);
      return;
    }
    // img1 يختفي, img2 يظهر مع build-up
    ctx.save();
    ctx.globalAlpha = 1;
    if (kenBurns) {
      this.drawKenBurns(img1, progress, {fromScale:1.0, toScale:1.08});
    } else {
      // draw img1 normal
      const iw = img1.width, ih = img1.height;
      const s = Math.min(this.cv.width / iw, (this.cv.height * .92) / ih) * .92;
      const w = iw * s, h = ih * s;
      ctx.drawImage(img1, (this.cv.width - w)/2, (this.cv.height - h)/2 + this.cv.height*.02, w, h);
    }

    // img2 مع mask reveal + alpha
    ctx.globalAlpha = progress;
    this.drawMaskReveal(img2, progress, 'bottom-top', true);
    ctx.restore();
  }

  /* ---------- 4. Build-Up Sequence (الأقوى - يجمع كل شيء) ---------- */
  // يحاكي بناء حقيقي: كل فريم جديد يظهر من تحت لفوق مع zoom خفيف وغبار
  drawBuildUp(imgPrev, imgCurrent, frameProgress, stageProgress = 0, options = {}) {
    const {
      revealType = 'bottom-top',
      kenBurns = true,
      dust = true,
      wavy = true
    } = options;

    // frameProgress: تقدم داخل الفريم الحالي 0..1
    // stageProgress: تقدم داخل المرحلة ككل 0..1 (للكين بيرنز البطيء)

    if (!imgCurrent) return;

    if (!imgPrev || frameProgress > 0.85) {
      // عرض الفريم الحالي فقط مع كين بيرنز + reveal
      if (kenBurns) {
        this.drawKenBurns(imgCurrent, stageProgress, {
          fromScale: 1.0,
          toScale: 1.12,
          toPan: {x: (Math.random() - 0.5) * 8, y: -6}
        });
      }
      // overlay reveal جزئي عند بداية الفريم
      if (frameProgress < 0.5) {
        const revealP = frameProgress * 2; // 0..1 في أول نص المدة
        this.ctx.save();
        this.ctx.globalAlpha = (1 - revealP) * 0.6;
        this.drawMaskReveal(imgCurrent, revealP, revealType, wavy);
        this.ctx.restore();
      }
    } else {
      // انتقال بين فريمين
      this.drawCrossfade(imgPrev, imgCurrent, frameProgress, kenBurns);
    }
  }

  /* ---------- 5. Parallax Layers (عمق ثلاثي الأبعاد) ---------- */
  // نفترض إن الصورة فيها foreground/background — نحاكي العمق بحركة مختلفة
  drawParallax(img, mouseX = 0, mouseY = 0, layers = 3) {
    const ctx = this.ctx, cv = this.cv;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, cv.width, cv.height);

    // نقسم الصورة لطبقات وهمية بحركة مختلفة
    for (let i = 0; i < layers; i++) {
      const depth = (i + 1) / layers; // 0.33, 0.66, 1.0
      const offsetX = mouseX * depth * 15;
      const offsetY = mouseY * depth * 10;
      const scale = 1 + (1 - depth) * 0.08;

      const iw = img.width, ih = img.height;
      const s = Math.min(cv.width / iw, (cv.height * .92) / ih) * .92 * scale;
      const w = iw * s, h = ih * s;
      const x = (cv.width - w) / 2 + offsetX;
      const y = (cv.height - h) / 2 + cv.height * .02 + offsetY;

      // طبقة بعيدة = أغمق وأقل وضوح
      ctx.globalAlpha = 0.7 + depth * 0.3;
      if (i === layers - 1) ctx.globalAlpha = 1;

      // قص كل طبقة بشكل مختلف لمحاكاة العمق
      if (i < layers - 1) {
        ctx.save();
        // نرسم جزء فقط من الصورة لكل طبقة (محاكاة)
        const clipY = y + h * (i / layers) * 0.3;
        ctx.beginPath();
        ctx.rect(x, clipY, w, h / layers);
        ctx.clip();
      }

      ctx.drawImage(img, x, y, w, h);
      if (i < layers - 1) ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  /* ---------- 6. AI Frame Interpolation Hint ---------- */
  // هذه دالة توضح كيف تدمج AI interpolation
  // في الإنتاج: تستخدم RIFE / FILM / RunwayML لتوليد فريمات وسيطة
  async interpolateFrames(img1, img2, steps = 8) {
    // Placeholder: في المتصفح بدون AI، نعمل crossfade بسيط كـ fallback
    // مع AI: هنا تستدعي API أو WASM model
    console.log(`[BuildEffects] Interpolating ${steps} frames between images (AI placeholder)`);
    const frames = [];
    for (let i = 0; i <= steps; i++) {
      const p = i / steps;
      // بدون AI: crossfade
      // مع AI: frames.push(await this.aiInterpolate(img1, img2, p))
      frames.push({p, blend: true});
    }
    return frames;
  }

  /* ---------- Utility: Get random reveal direction per stage ---------- */
  getRevealTypeForStage(stageId) {
    const map = {
      excavation: 'bottom-top',
      foundation: 'bottom-top',
      structure: 'bottom-top',
      shell: 'left-right',
      facade: 'left-right',
      complete: 'center-out',
      night: 'center-out'
    };
    return map[stageId] || 'bottom-top';
  }

  /* ---------- Utility: Stage color overlay for build feel ---------- */
  drawStageColorWash(stageColor, progress, alpha = 0.08) {
    const ctx = this.ctx, cv = this.cv;
    ctx.save();
    ctx.globalAlpha = alpha * (1 - progress);
    ctx.fillStyle = stageColor || '#BFA76A';
    ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.restore();
  }
}

/* ============================================================
   استخدام سريع في index.html:

   // بدلاً من draw(g) العادية:
   const fx = new BuildEffects(cv);
   let prevFrame = cache['0:'+(g-1)];
   let currFrame = cache['0:'+g];
   let frameProgress = current - Math.floor(current); // 0..1
   let stageProgress = (g - stage.from) / (stage.to - stage.from);

   fx.drawBuildUp(prevFrame, currFrame, frameProgress, stageProgress, {
     revealType: fx.getRevealTypeForStage(stage.id),
     kenBurns: true,
     wavy: true
   });

   // للـ gallery:
   fx.drawMaskReveal(img, 0.7, 'bottom-top', true);

   // للـ hero مع parallax على حركة الماوس:
   canvas.addEventListener('mousemove', e => {
     const mx = (e.clientX / innerWidth - 0.5);
     const my = (e.clientY / innerHeight - 0.5);
     fx.drawParallax(img, mx, my, 3);
   });

   ============================================================ */

// Export for module usage
if (typeof window !== 'undefined') window.BuildEffects = BuildEffects;
if (typeof module !== 'undefined') module.exports = BuildEffects;
