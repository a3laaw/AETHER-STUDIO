import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width':1440,'height':900})
        errs=[]
        pg.on('console', lambda m: errs.append('CON: '+m.text) if m.type=='error' else None)
        pg.on('pageerror', lambda e: errs.append('ERR: '+str(e)))

        await pg.goto('file:///home/user/index.html')
        await pg.wait_for_timeout(3000)
        await pg.screenshot(path='shots/u0.png')

        # exterior end -> explore button
        await pg.evaluate("scrollTo(0, document.getElementById('track').offsetHeight - innerHeight)")
        await pg.wait_for_timeout(3000)
        await pg.screenshot(path='shots/u1.png')

        # interior part: scroll into roomTrack mid
        await pg.evaluate("scrollTo(0, document.getElementById('roomTrack').offsetTop + document.getElementById('roomTrack').offsetHeight*0.55)")
        await pg.wait_for_timeout(2500)
        await pg.screenshot(path='shots/u2.png')

        # project stages part
        await pg.evaluate("document.getElementById('project-sec').scrollIntoView()")
        await pg.wait_for_timeout(1500)
        await pg.screenshot(path='shots/u3.png')

        # services part
        await pg.evaluate("document.getElementById('services').scrollIntoView()")
        await pg.wait_for_timeout(1200)
        await pg.screenshot(path='shots/u4.png')

        # stage detail interactions
        await pg.evaluate("selectStage('structure'); document.getElementById('stageDetail').scrollIntoView()")
        await pg.wait_for_timeout(1200)
        await pg.screenshot(path='shots/u5.png')

        # redirects
        await pg.goto('file:///home/user/project.html')
        await pg.wait_for_timeout(1500)
        u = pg.url
        print('project.html redirect ->', u.split('/')[-1])

        await pg.goto('file:///home/user/interior.html')
        await pg.wait_for_timeout(1500)
        print('interior.html redirect ->', pg.url.split('/')[-1])

        print('ERRORS:', errs[:12])
        await b.close()

asyncio.run(main())
