import requests, json

BASE = "http://localhost:4321"

# Register
r = requests.post(f"{BASE}/api/auth/register", json={
    "email": "test@test.com",
    "password": "password123",
    "name": "yaseen",
    "store_name": "yaseen's Store",
    "bio": "Backyard gardener. Growing and sharing."
})
print("Register:", r.status_code, r.json())

# Login
r = requests.post(f"{BASE}/api/auth/login", json={
    "email": "test@test.com",
    "password": "password123"
})
print("Login:", r.status_code, r.json())
token = r.json().get("session_id") or r.json().get("token")

# Add a test item
headers = {"Authorization": f"Bearer {token}"} if token else {}
r = requests.post(f"{BASE}/api/items", json={
    "name": "what",
    "price": 123,
    "category": "Plants",
    "description": "A beautiful plant",
    "stock": 5
}, headers=headers)
print("Item:", r.status_code, r.json())
