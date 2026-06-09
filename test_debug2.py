from playwright.sync_api import sync_playwright

BASE = "http://localhost:4321"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    # Capture console messages
    page.on("console", lambda msg: print(f"[CONSOLE {msg.type}] {msg.text}"))
    page.on("pageerror", lambda err: print(f"[PAGE ERROR] {err}"))

    # 1. Go to register
    page.goto(f"{BASE}/register")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(3000)
    print(f"URL after goto: {page.url}")

    # 2. Fill and submit form
    page.fill("#name", "Test Gardener")
    page.fill("#email", "test@garden.com")
    page.fill("#password", "password123")
    print("Form filled")
    page.locator('button[type="submit"]').click()
    print("Submit clicked")
    page.wait_for_timeout(5000)
    print(f"URL after submit: {page.url}")

    page.screenshot(path="debug_after_register.png", full_page=True)
    browser.close()
