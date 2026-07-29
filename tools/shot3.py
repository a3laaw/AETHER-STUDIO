import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width':1440,'height':900})
        errs=[]
        pg.on('console', lambda m: errs.append('CON: '+m.text) if m.type=='error' else None)
        pg.on('pageerror', lambda e: errs.append('ERR: '+str(e)))

        # interior entrance
        await pg.goto('file:///home/user/interior.html')
        await pg.wait_for_timeout(1500)
        await pg.screenshot(path='shots/i0.png')
        # explore
        await pg.click('#btnExplore')
        await pg.wait_for_timeout(2500)
        await pg.screenshot(path='shots/i1.png')
        # scroll mid-build
        await pg.evaluate("scrollTo(0, document.getElementById('roomTrack').offsetHeight*0.5)")
        await pg.wait_for_timeout(2500)
        await pg.screenshot(path='shots/i2.png')
        # full build + furniture spots
        await pg.evaluate("scrollTo(0, document.getElementById('roomTrack').offsetHeight - innerHeight)")
        await pg.wait_for_timeout(2500)
        await pg.screenshot(path='shots/i3.png')
        # click furniture spot
        spots = await pg.query_selector_all('.fspot.show')
        if spots:
            await spots[0].click()
            await pg.wait_for_timeout(700)
            await pg.screenshot(path='shots/i4.png')
        # switch room via plan: kitchen
        await pg.evaluate("openRoom('kitchen')")
        await pg.wait_for_timeout(2000)
        await pg.screenshot(path='shots/i5.png')
        # layout mode
        await pg.evaluate("setMode('layout')")
        await pg.wait_for_timeout(1200)
        await pg.screenshot(path='shots/i6.png')
        # pano mode
        await pg.evaluate("setMode('pano')")
        await pg.wait_for_timeout(1500)
        await pg.screenshot(path='shots/i7.png')
        # first person
        await pg.evaluate("enterFP()")
        await pg.wait_for_timeout(1500)
        await pg.mouse.move(400, 300)
        await pg.wait_for_timeout(500)
        await pg.screenshot(path='shots/i8.png')

        # index explore button at end
        await pg.goto('file:///home/user/index.html')
        await pg.wait_for_timeout(2000)
        await pg.evaluate("scrollTo(0, document.getElementById('track').offsetHeight - innerHeight)")
        await pg.wait_for_timeout(3000)
        await pg.screenshot(path='shots/i9.png')

        # admin interior page
        await pg.goto('file:///home/user/admin.html')
        await pg.fill('#lPass','aura2026')
        await pg.click('#lBtn')
        await pg.wait_for_timeout(1000)
        await pg.evaluate("go('interior')")
        await pg.wait_for_timeout(800)
        await pg.screenshot(path='shots/i10.png')

        print('ERRORS:', errs[:12])
        await b.close()

asyncio.run(main())
