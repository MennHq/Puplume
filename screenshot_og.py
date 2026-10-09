from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1200, "height": 630})
    page = context.new_page()
    page.goto('http://localhost:3001')
    # Wait a second for animations to settle
    page.wait_for_timeout(1000)
    page.screenshot(path='c:\\Users\\AHSAN HAROON\\antigravity\\puplume-marketing\\public\\og-image.jpg')
    browser.close()
