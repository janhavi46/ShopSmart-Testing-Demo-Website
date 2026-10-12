# ShopSmart - Demo E-Commerce Web Application

A realistic, responsive, and lightweight client-side e-commerce website designed specifically for **Manual Software Testing Portfolio** projects.

---

## 📌 Project Purpose

This project provides an interactive sandbox for IT graduates and aspiring QA Engineers to practice, document, and showcase:
- **Test Scenario Creation**
- **Test Case Design** (Positive, Negative, Boundary Value Analysis, Equivalence Partitioning)
- **Authentication & Validation Testing** (Registration, Login, Demo Accounts, Session State)
- **Defect Logging & Bug Reporting**
- **Exploratory Testing**
- **UI/UX and Accessibility Evaluation**

All functionality runs 100% on the client side using pure HTML5, CSS3, and Vanilla JavaScript, requiring zero backend setups, zero databases, and zero npm packages.

---

## 🚀 How to Run the Website Locally

You can launch and test this website locally using any of the following methods:

### Method 1: VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Right-click `index.html` and select **"Open with Live Server"**.
3. The site will automatically open at `http://127.0.0.1:5500/index.html`.

### Method 2: Direct Browser Launch
Double-click `index.html` or right-click `index.html` -> **Open with** -> **Google Chrome** (or Edge, Firefox, Safari).

---

## 📂 Project File Structure

```
demo_website_manual_testing/
├── index.html               # Semantic HTML5 markup: catalog, cart drawer, checkout modal, auth views
├── style.css                # Vanilla CSS3 styling, responsive grid, auth card design & animations
├── script.js                # Vanilla JavaScript business logic, cart state, auth rules & validation
├── test-data/
│   └── demo-users.js        # 4 predefined fictional test accounts with SHA-256 hashes
└── README.md                # Project documentation, test credentials, instructions & limitations
```

---

## 👥 Predefined Demo Test Accounts

The following four fictional accounts are configured in `test-data/demo-users.js` for testing successful authentication:

| User Label | Email Address | Password | Intended Test Focus |
|---|---|---|---|
| **User 1** | `user1@shopsmart.test` | `ShopTest@123` | Baseline valid user login |
| **User 2** | `user2@shopsmart.test` | `TestUser@456` | Second demo persona verification |
| **User 3** | `user3@shopsmart.test` | `ValidUser@789` | Alternate credential testing |
| **User 4** | `user4@shopsmart.test` | `CartTest@321` | Cart persistence across login/logout |

> [!NOTE]
> Demo account credentials are provided for QA test execution and portfolio documentation. They are intentionally fictional and client-side only.

---

## ✨ Implemented Features

### 1. Account Registration Flow
- **Navigation**: "Register" link in navbar leads directly to `#register`.
- **Fields**: Full Name, Email Address, Password, Confirm Password.
- **Show/Hide Password**: Interactive toggle buttons for password fields (`👁️` / `🙈`).
- **Validation Rules**:
  - Mandatory fields cannot be empty or whitespace-only.
  - Full Name requires at least 2 characters.
  - Email must follow a valid pattern (`user@domain.tld`). Accidental whitespace is trimmed.
  - Password requires a minimum of 6 characters.
  - Confirm Password must match the password exactly.
  - **Duplicate Email Prevention**: Registration is rejected if the email already exists in predefined demo accounts or previously registered accounts (case-insensitive).
- **Post-Registration**: Displays a success banner, clears the form, pre-fills the email in the login form, and provides a "Proceed to Login" button.
- **Login Readiness**: Newly registered users can immediately sign in using their registered credentials.

### 2. User Login Flow
- **Navigation**: "Login" link in navbar leads directly to `#login`.
- **Fields**: Email Address, Password, Show/Hide Password toggle button (`👁️` / `🙈`).
- **Authentication**: Checks credentials against both predefined demo accounts (`DEMO_USERS`) and newly registered users (`localStorage`).
- **Secure Error Handling**: Displays a generic `"Invalid email or password"` message to avoid revealing whether a specific email address exists in the system.
- **Spam / Rapid-Click Protection**: Temporarily disables the Sign In button while evaluating credentials to prevent duplicate submissions.
- **Keyboard Usability**: Allows submitting via the Enter key.

### 3. Login State, Session & Logout
- **Navbar State**:
  - **Logged Out**: Displays `Login` link and `Register` button.
  - **Logged In**: Replaces login/register options with `👋 Hi, [Name]` indicator and a `Logout` button.
- **Page Refresh Persistence**: The active session is stored in browser `localStorage` (`shopsmart_active_user_v1`), keeping the user logged in across page reloads.
- **Logout**: Clears the active session, restores logged-out navigation, and displays an informative toast notification.
- **Cart Continuity**: The shopping cart and product filters are completely preserved when logging in, logging out, or switching between pages.

### 4. Product Catalog, Search & Filtering
- **Predefined Catalog**: 8 realistic products across 4 categories (*Electronics, Fashion, Home & Kitchen, Accessories*).
- **Search by Name**: Case-insensitive real-time search with clear button.
- **Category Filter**: Filter by category or view all.
- **Price Sorting**: Sort by "Price: Low to High", "Price: High to Low", or reset to default order.
- **Combined Logic**: Search, category filtering, and sorting operate together seamlessly.
- **Empty State**: Clear feedback message and reset button when search or filters return zero matches.

### 5. Shopping Cart & Checkout
- **Cart Drawer**: Side-panel cart accessible from anywhere in the application.
- **Quantity Controls**: `+` and `-` buttons with a strict boundary rule preventing quantity from dropping below 1.
- **Explicit Removal**: Dedicated "Remove" button to delete items.
- **Coupon System**: Demo coupon code `SAVE10` applies a 10% discount on the subtotal. Prevents stacking and auto-recalculates when quantities change.
- **Client-Side Form Validation**: Validates Name, Email, 10-digit Indian mobile number (`^[6-9]\d{9}$`), Delivery Address, City, and 6-digit Indian PIN code (`^[1-9]\d{5}$`).
- **Simulated Order Confirmation**: Generates a simulated order reference number (`#ORD-XXXXXX`) and clears the cart upon success.

---

## 🔄 How to Reset Demo Registration Data

To reset registered test accounts back to the initial baseline for fresh manual testing runs:

1. **Via UI (Easiest)**: Click the **"Reset Demo Accounts"** link located in the website footer.
2. **Via Browser DevTools Console**: Open the browser console (`F12`) and run:
   ```javascript
   ShopSmartAuth.resetDemoData();
   ```
3. **Via LocalStorage Clear**: Run `localStorage.removeItem('shopsmart_registered_users_v1');` in the console.

> **What gets reset**: Only newly registered demo accounts stored in `localStorage` are cleared. Unrelated files, predefined demo accounts (`test-data/demo-users.js`), and shopping cart contents are strictly preserved.

---

## ⚠️ Security Limitations of Client-Side Authentication & Route Protection

This application is designed specifically as an **educational testing sandbox for manual QA portfolios**:

1. **Client-Side Access Control**: All route protection, login checks, and view switching are enforced client-side via JavaScript in the browser. While this provides a realistic manual testing experience for positive, negative, and exploratory testing, client-side route guards are **not production-grade security** and can be bypassed by modifying browser-side code, DevTools scripts, or DOM classes.
2. **No Backend or Database**: In real-world web applications, protected resources and APIs are secured behind server-side authentication middleware, session tokens (JWT/OAuth), and access control lists.
3. **Client-Side Hashing**: Password hashes are calculated in the browser using the Web Crypto API (`SHA-256`). While this prevents plaintext passwords from appearing in `localStorage`, client-side hashing without server-side salting (e.g., bcrypt/Argon2) is **educational only** and not secure for production.
4. **Public Demo Credentials**: The predefined demo credentials are intentionally public and visible in `test-data/demo-users.js`.
5. **No Real PII or Passwords**: Never enter real personal passwords or sensitive information during testing.
