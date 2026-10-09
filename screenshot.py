from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3001')
    page.screenshot(path='c:\\Users\\AHSAN HAROON\\antigravity\\puplume-marketing\\public\\marketing-screenshot.png', full_page=True)
    browser.close()
