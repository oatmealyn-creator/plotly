from playwright.sync_api import sync_playwright
import requests, json, time

BASE = "http://localhost:4321"

# Register a test user
r = requests.post(f"{BASE}/api/auth/register", json={
    "email": "preview@test.com",
    "password": "password123",
    "name": "yaseen"
})
print("Register:", r.status_code)
reg = r.json()
if r.status_code == 409:
    # Already exists, login instead
    r = requests.post(f"{BASE}/api/auth/login", json={
        "email": "preview@test.com",
        "password": "password123"
    })
    print("Login:", r.status_code)
    reg = r.json()
    username = reg["user"]["username"]
else:
    username = reg["user"]["username"]

print("Username:", username)
session_id = reg["session_id"]

# Add a test item
r = requests.post(f"{BASE}/api/items", json={
    "name": "what",
    "price": 123,
    "category": "Plants",
    "description": "A beautiful plant",
    "stock": 5
}, cookies={"session_id": session_id})
print("Item:", r.status_code)

# Take screenshots
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    # Desktop
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    page.goto(f"{BASE}/g/{username}")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1000)
    page.screenshot(path="screenshot_desktop.png", full_page=True)
    print("Desktop screenshot saved")
    
    # Mobile
    page2 = browser.new_page(viewport={"width": 390, "height": 844})
    page2.goto(f"{BASE}/g/{username}")
    page2.wait_for_load_state("networkidle")
    page2.wait_for_timeout(1000)
    page2.screenshot(path="screenshot_mobile.png", full_page=True)
    print("Mobile screenshot saved")
    
    browser.close()
