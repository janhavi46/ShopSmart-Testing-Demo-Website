/**
 * ============================================================================
 * ShopSmart - Demo E-Commerce Website for Manual QA Testing Portfolio
 * File: script.js
 * Description: Client-side logic for product catalog, searching, filtering,
 *              sorting, cart management, coupon rules, and checkout validation.
 * ============================================================================
 */

// ============================================================================
// 1. PREDEFINED PRODUCT DATA
// ============================================================================
// 8 predefined products covering multiple categories and price points.
// Product illustrations are rendered using inline vector SVG graphics,
// ensuring zero dependence on external image CDNs or network connectivity.
const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 2499,
    description: "Over-ear noise isolating headphones with deep bass and 30-hour battery life.",
    svgColor: "#4f46e5",
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 36V28C12 16.954 20.954 8 32 8C43.046 8 52 16.954 52 28V36" stroke="#4f46e5" stroke-width="4" stroke-linecap="round"/>
      <rect x="8" y="32" width="10" height="20" rx="5" fill="#6366f1"/>
      <rect x="46" y="32" width="10" height="20" rx="5" fill="#6366f1"/>
      <path d="M18 42H22M42 42H46" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: 3999,
    description: "Heart rate tracking, SpO2 sensor, AMOLED touch display, and waterproof design.",
    svgColor: "#059669",
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="6" width="20" height="12" rx="3" fill="#94a3b8"/>
      <rect x="22" y="46" width="20" height="12" rx="3" fill="#94a3b8"/>
      <rect x="16" y="16" width="32" height="32" rx="8" fill="#059669"/>
      <circle cx="32" cy="32" r="10" fill="#10b981"/>
      <path d="M32 26V32L36 34" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 3,
    name: "Ergonomic Optical Mouse",
    category: "Electronics",
    price: 1199,
    description: "Vertical wireless ergonomic mouse with adjustable DPI and silent click buttons.",
    svgColor: "#2563eb",
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 10C22 10 18 18 18 30V38C18 48 24 54 32 54C40 54 46 48 46 38V30C46 18 42 10 32 10Z" fill="#2563eb"/>
      <path d="M32 10V26" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="32" cy="22" r="3" fill="#93c5fd"/>
    </svg>`
  },
  {
    id: 4,
    name: "Classic Denim Jacket",
    category: "Fashion",
    price: 2199,
    description: "Rugged washed cotton denim jacket with button flap pockets and comfort fit.",
    svgColor: "#1d4ed8",
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 12L32 18L44 12L54 22L46 30L44 54H20L18 30L10 22L20 12Z" fill="#1d4ed8"/>
      <path d="M32 18V54" stroke="#ffffff" stroke-width="2" stroke-dasharray="2 2"/>
      <path d="M22 28H28M36 28H42" stroke="#93c5fd" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 5,
    name: "Cotton Crewneck T-Shirt",
    category: "Fashion",
    price: 799,
    description: "Premium 100% bio-washed combed cotton t-shirt with breathable soft fabric.",
    svgColor: "#d97706",
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 12C26 16 38 16 42 12L56 20L48 28L44 26V54H20V26L16 28L8 20L22 12Z" fill="#d97706"/>
      <path d="M26 14C29 17 35 17 38 14" stroke="#ffffff" stroke-width="2"/>
    </svg>`
  },
  {
    id: 6,
    name: "Stainless Steel Water Bottle (1L)",
    category: "Home & Kitchen",
    price: 899,
    description: "Double-wall vacuum insulated flask keeping drinks cold for 24h and hot for 12h.",
    svgColor: "#0891b2",
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="26" y="8" width="12" height="6" rx="2" fill="#64748b"/>
      <path d="M24 14H40L42 22V52C42 55 40 56 36 56H28C24 56 22 55 22 52V22L24 14Z" fill="#0891b2"/>
      <line x1="28" y1="26" x2="36" y2="26" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 7,
    name: "Electric Drip Coffee Maker",
    category: "Home & Kitchen",
    price: 2899,
    description: "Programmable 600ml glass carafe coffee maker with reusable mesh filter basket.",
    svgColor: "#7c2d12",
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="10" width="28" height="12" rx="3" fill="#475569"/>
      <path d="M22 22H42V30L36 38H28L22 30V22Z" fill="#7c2d12"/>
      <path d="M24 38H40L42 54H22L24 38Z" fill="#cbd5e1" fill-opacity="0.6" stroke="#475569" stroke-width="2"/>
      <path d="M42 42H48V50H42" stroke="#475569" stroke-width="2"/>
    </svg>`
  },
  {
    id: 8,
    name: "Waterproof Laptop Backpack",
    category: "Accessories",
    price: 1699,
    description: "Anti-theft design with USB charging port, padded laptop compartment (up to 15.6\").",
    svgColor: "#475569",
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 16C24 12 28 8 32 8C36 8 40 12 40 16" stroke="#334155" stroke-width="3"/>
      <rect x="16" y="16" width="32" height="40" rx="8" fill="#475569"/>
      <rect x="20" y="28" width="24" height="16" rx="4" fill="#334155"/>
      <line x1="26" y1="36" x2="38" y2="36" stroke="#94a3b8" stroke-width="2"/>
    </svg>`
  }
];

// ============================================================================
// 2. APPLICATION STATE
// ============================================================================
// The application state tracks the cart contents and applied coupon code.
// Client-side localStorage persistence is used so testers can refresh the page.
const STATE = {
  // Cart items format: [{ id: 1, quantity: 2 }, ...]
  cart: [],
  // Applied coupon state: null or { code: 'SAVE10', discountPercent: 10 }
  appliedCoupon: null,
  // Active logged-in user: null or { id: string, name: string, email: string }
  currentUser: null,
  // Current active view: 'shop' | 'register' | 'login'
  currentView: "login"
};

// Storage Keys
const STORAGE_KEY_CART = "shopsmart_cart_v1";
const STORAGE_KEY_USERS = "shopsmart_registered_users_v1";
const STORAGE_KEY_SESSION = "shopsmart_active_user_v1";

// ============================================================================
// 3. DOM ELEMENT REFERENCES
// ============================================================================
// Caching DOM elements for clean and fast access throughout the script.
const DOM = {
  // Navigation & Badges
  brandLogo: document.getElementById("brand-logo"),
  navHome: document.getElementById("nav-home"),
  navProducts: document.getElementById("nav-products"),
  navCartBtn: document.getElementById("nav-cart-btn"),
  cartBadge: document.getElementById("cart-badge"),
  cartDrawerCount: document.getElementById("cart-drawer-count"),
  btnHeroCart: document.getElementById("btn-hero-cart"),

  // Navigation Auth Elements
  navLogin: document.getElementById("nav-login"),
  navRegister: document.getElementById("nav-register"),
  navAuthLoggedOut: document.getElementById("nav-auth-logged-out"),
  navAuthLoggedIn: document.getElementById("nav-auth-logged-in"),
  navUserName: document.getElementById("nav-user-name"),
  navLogoutBtn: document.getElementById("nav-logout-btn"),

  // Page Views
  viewShop: document.getElementById("view-shop"),
  viewRegister: document.getElementById("view-register"),
  viewLogin: document.getElementById("view-login"),

  // Filter & Search Controls
  searchInput: document.getElementById("search-input"),
  clearSearchBtn: document.getElementById("clear-search-btn"),
  categoryFilter: document.getElementById("category-filter"),
  sortSelect: document.getElementById("sort-select"),
  resetFiltersBtn: document.getElementById("reset-filters-btn"),
  resultsCount: document.getElementById("results-count"),

  // Product Grid
  productsGrid: document.getElementById("products-grid"),
  noProductsMessage: document.getElementById("no-products-message"),
  emptyStateResetBtn: document.getElementById("empty-state-reset-btn"),

  // Cart Drawer
  cartDrawer: document.getElementById("cart-drawer"),
  cartOverlay: document.getElementById("cart-overlay"),
  closeCartBtn: document.getElementById("close-cart-btn"),
  cartItemsList: document.getElementById("cart-items-list"),
  cartEmptyState: document.getElementById("cart-empty-state"),
  cartFooter: document.getElementById("cart-footer"),
  btnEmptyCartShop: document.getElementById("btn-empty-cart-shop"),

  // Coupon
  couponInput: document.getElementById("coupon-input"),
  applyCouponBtn: document.getElementById("apply-coupon-btn"),
  couponMessage: document.getElementById("coupon-message"),
  appliedCouponTag: document.getElementById("applied-coupon-tag"),
  removeCouponBtn: document.getElementById("remove-coupon-btn"),

  // Totals
  subtotalAmount: document.getElementById("subtotal-amount"),
  discountAmount: document.getElementById("discount-amount"),
  totalAmount: document.getElementById("total-amount"),
  proceedCheckoutBtn: document.getElementById("proceed-checkout-btn"),

  // Checkout Modal & Form
  checkoutModal: document.getElementById("checkout-modal"),
  closeCheckoutBtn: document.getElementById("close-checkout-btn"),
  cancelCheckoutBtn: document.getElementById("cancel-checkout-btn"),
  checkoutForm: document.getElementById("checkout-form"),
  checkoutItemCount: document.getElementById("checkout-item-count"),
  checkoutTotalAmount: document.getElementById("checkout-total-amount"),

  // Checkout Form Inputs & Error Message Elements
  inputName: document.getElementById("input-name"),
  inputEmail: document.getElementById("input-email"),
  inputPhone: document.getElementById("input-phone"),
  inputAddress: document.getElementById("input-address"),
  inputCity: document.getElementById("input-city"),
  inputPincode: document.getElementById("input-pincode"),

  errorName: document.getElementById("error-name"),
  errorEmail: document.getElementById("error-email"),
  errorPhone: document.getElementById("error-phone"),
  errorAddress: document.getElementById("error-address"),
  errorCity: document.getElementById("error-city"),
  errorPincode: document.getElementById("error-pincode"),

  // Order Confirmation Modal
  orderConfirmationModal: document.getElementById("order-confirmation-modal"),
  confirmOrderId: document.getElementById("confirm-order-id"),
  confirmCustomerName: document.getElementById("confirm-customer-name"),
  confirmCustomerEmail: document.getElementById("confirm-customer-email"),
  confirmCustomerPhone: document.getElementById("confirm-customer-phone"),
  confirmDestination: document.getElementById("confirm-destination"),
  confirmTotalAmount: document.getElementById("confirm-total-amount"),
  continueShoppingBtn: document.getElementById("continue-shopping-btn"),

  // Registration Elements
  registerForm: document.getElementById("register-form"),
  registerName: document.getElementById("register-name"),
  registerEmail: document.getElementById("register-email"),
  registerPassword: document.getElementById("register-password"),
  registerConfirmPassword: document.getElementById("register-confirm-password"),
  toggleRegisterPassword: document.getElementById("toggle-register-password"),
  toggleRegisterConfirmPassword: document.getElementById("toggle-register-confirm-password"),
  registerSubmitBtn: document.getElementById("register-submit-btn"),
  registerSuccessMsg: document.getElementById("register-success-msg"),
  btnRegisteredGoLogin: document.getElementById("btn-registered-go-login"),
  linkToLogin: document.getElementById("link-to-login"),
  errorRegisterName: document.getElementById("error-register-name"),
  errorRegisterEmail: document.getElementById("error-register-email"),
  errorRegisterPassword: document.getElementById("error-register-password"),
  errorRegisterConfirmPassword: document.getElementById("error-register-confirm-password"),

  // Login Elements
  loginForm: document.getElementById("login-form"),
  loginEmail: document.getElementById("login-email"),
  loginPassword: document.getElementById("login-password"),
  toggleLoginPassword: document.getElementById("toggle-login-password"),
  loginSubmitBtn: document.getElementById("login-submit-btn"),
  loginGeneralError: document.getElementById("login-general-error"),
  loginErrorText: document.getElementById("login-error-text"),
  loginRegSuccess: document.getElementById("login-registration-success"),
  loginAlreadyAuth: document.getElementById("login-already-authenticated"),
  loggedInUserDisplay: document.getElementById("logged-in-user-display"),
  btnLoginViewLogout: document.getElementById("btn-login-view-logout"),
  linkToRegister: document.getElementById("link-to-register"),
  errorLoginEmail: document.getElementById("error-login-email"),
  errorLoginPassword: document.getElementById("error-login-password"),

  // Footer Reset Button
  btnResetDemoData: document.getElementById("btn-reset-demo-data"),

  // Toast Container
  toastContainer: document.getElementById("toast-container")
};

// ============================================================================
// 4. UTILITY & FORMATTING FUNCTIONS
// ============================================================================

/**
 * Formats a numeric value into Indian Rupee currency format (₹).
 * Example: 2499 -> "₹2,499.00"
 * @param {number} amount - The numeric monetary value
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
  const rounded = Number(amount || 0).toFixed(2);
  // Using Indian numbering format with commas
  const parts = rounded.split(".");
  let integerPart = parts[0];
  const decimalPart = parts[1];

  // Indian currency formatting: last 3 digits, then groups of 2
  let lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);
  if (otherNumbers !== "") {
    lastThree = "," + lastThree;
  }
  const formattedInt = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  return `₹${formattedInt}.${decimalPart}`;
}

/**
 * Displays a lightweight toast notification in the bottom right corner.
 * @param {string} message - Message to display
 * @param {'info' | 'success' | 'warning'} type - Visual styling type
 */
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.setAttribute("role", "status");

  let icon = "ℹ️";
  if (type === "success") icon = "✅";
  if (type === "warning") icon = "⚠️";

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  DOM.toastContainer.appendChild(toast);

  // Automatically fade out and remove after 2.8 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease-out";
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 2800);
}

// ============================================================================
// 5. LOCAL STORAGE CART PERSISTENCE
// ============================================================================

/**
 * Loads saved cart from localStorage if available.
 */
function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CART);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Validate that items exist in predefined PRODUCTS list
        STATE.cart = parsed.filter(item => {
          return PRODUCTS.some(p => p.id === item.id) && item.quantity > 0;
        });
      }
    }
  } catch (err) {
    console.warn("Unable to load cart from localStorage:", err);
    STATE.cart = [];
  }
}

/**
 * Saves current cart to localStorage.
 */
function saveCartToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(STATE.cart));
  } catch (err) {
    console.warn("Unable to save cart to localStorage:", err);
  }
}

// ============================================================================
// 6. PRODUCT RENDERING, SEARCHING & FILTERING
// ============================================================================

/**
 * Renders an array of product objects into the product grid.
 * @param {Array} productsList - Products to display
 */
function renderProducts(productsList) {
  DOM.productsGrid.innerHTML = "";

  if (productsList.length === 0) {
    DOM.noProductsMessage.classList.remove("hidden");
    DOM.resultsCount.textContent = "Showing 0 products";
    return;
  }

  DOM.noProductsMessage.classList.add("hidden");
  DOM.resultsCount.textContent = `Showing ${productsList.length} of ${PRODUCTS.length} products`;

  productsList.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.setAttribute("data-product-id", product.id);

    card.innerHTML = `
      <div class="product-image-container">
        <span class="product-category-tag">${product.category}</span>
        <div class="product-illustration">
          ${product.svg}
        </div>
      </div>
      <div class="product-body">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <div class="product-price">
            <span class="currency-symbol">₹</span>${product.price.toLocaleString("en-IN")}
          </div>
          <button 
            type="button" 
            class="btn btn-add-cart" 
            data-action="add-to-cart" 
            data-id="${product.id}"
            id="add-to-cart-btn-${product.id}"
            aria-label="Add ${product.name} to cart"
          >
            Add to Cart
          </button>
        </div>
      </div>
    `;

    DOM.productsGrid.appendChild(card);
  });
}

/**
 * Filters and sorts predefined products based on user selections in search,
 * category dropdown, and price sort dropdown. Works seamlessly combined.
 */
function filterAndSortProducts() {
  const searchTerm = DOM.searchInput.value.trim().toLowerCase();
  const selectedCategory = DOM.categoryFilter.value;
  const selectedSort = DOM.sortSelect.value;

  // Show or hide clear search button
  if (DOM.searchInput.value.length > 0) {
    DOM.clearSearchBtn.classList.add("visible");
  } else {
    DOM.clearSearchBtn.classList.remove("visible");
  }

  // 1. Filter by category & search term
  let filtered = PRODUCTS.filter(product => {
    const matchesCategory = (selectedCategory === "all") || (product.category === selectedCategory);
    const matchesSearch = (searchTerm === "") || product.name.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  // 2. Sort by price
  if (selectedSort === "price-low-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "price-high-low") {
    filtered.sort((a, b) => b.price - a.price);
  }
  // "default" retains predefined catalog ordering

  renderProducts(filtered);
}

/**
 * Resets search query, category filter and sorting dropdown to defaults.
 */
function resetAllFilters() {
  DOM.searchInput.value = "";
  DOM.categoryFilter.value = "all";
  DOM.sortSelect.value = "default";
  DOM.clearSearchBtn.classList.remove("visible");
  filterAndSortProducts();
  showToast("Filters reset to default", "info");
}

// ============================================================================
// 7. SHOPPING CART LOGIC & CALCULATIONS
// ============================================================================

/**
 * Calculates current subtotal, discount, and final amount based on cart items.
 * @returns {{ subtotal: number, discount: number, finalTotal: number, totalUnits: number }}
 */
function calculateCartTotals() {
  let subtotal = 0;
  let totalUnits = 0;

  STATE.cart.forEach(cartItem => {
    const product = PRODUCTS.find(p => p.id === cartItem.id);
    if (product) {
      subtotal += product.price * cartItem.quantity;
      totalUnits += cartItem.quantity;
    }
  });

  // Calculate discount if coupon is applied
  let discount = 0;
  if (STATE.appliedCoupon && STATE.appliedCoupon.code === "SAVE10" && subtotal > 0) {
    discount = (subtotal * STATE.appliedCoupon.discountPercent) / 100;
  }

  const finalTotal = Math.max(0, subtotal - discount);

  return {
    subtotal,
    discount,
    finalTotal,
    totalUnits
  };
}

/**
 * Adds a product to the cart. If the product already exists, increments its quantity.
 * @param {number} productId - ID of product to add
 */
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItem = STATE.cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
    showToast(`Increased quantity of "${product.name}" (${existingItem.quantity})`, "success");
  } else {
    STATE.cart.push({ id: productId, quantity: 1 });
    showToast(`Added "${product.name}" to cart`, "success");
  }

  saveCartToStorage();
  updateCartUI();
}

/**
 * Updates quantity of a product in the cart.
 * Prevents quantity from dropping below 1 (Boundary Value Test requirement).
 * @param {number} productId - Product ID
 * @param {number} delta - +1 to increase, -1 to decrease
 */
function updateCartQuantity(productId, delta) {
  const item = STATE.cart.find(item => item.id === productId);
  if (!item) return;

  const newQty = item.quantity + delta;

  // Boundary condition check: Quantity cannot be less than 1 through controls
  if (newQty < 1) {
    showToast("Quantity cannot be less than 1. Use Remove to delete.", "warning");
    return;
  }

  item.quantity = newQty;
  saveCartToStorage();
  updateCartUI();
}

/**
 * Completely removes a product from the shopping cart.
 * @param {number} productId - Product ID to remove
 */
function removeFromCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  STATE.cart = STATE.cart.filter(item => item.id !== productId);

  // If cart becomes empty, reset coupon message
  if (STATE.cart.length === 0) {
    DOM.couponMessage.textContent = "";
    DOM.couponMessage.className = "coupon-message";
  }

  saveCartToStorage();
  updateCartUI();

  if (product) {
    showToast(`Removed "${product.name}" from cart`, "info");
  }
}

/**
 * Renders the shopping cart items list, badges, and totals.
 */
function updateCartUI() {
  const totals = calculateCartTotals();

  // 1. Update navigation badges & drawer counts
  DOM.cartBadge.textContent = totals.totalUnits;
  DOM.cartDrawerCount.textContent = `(${totals.totalUnits} ${totals.totalUnits === 1 ? "item" : "items"})`;

  // 2. Toggle empty state vs list
  if (STATE.cart.length === 0) {
    DOM.cartEmptyState.classList.remove("hidden");
    DOM.cartItemsList.classList.add("hidden");
    DOM.proceedCheckoutBtn.disabled = true;
    DOM.proceedCheckoutBtn.title = "Add items to your cart to proceed";
  } else {
    DOM.cartEmptyState.classList.add("hidden");
    DOM.cartItemsList.classList.remove("hidden");
    DOM.proceedCheckoutBtn.disabled = false;
    DOM.proceedCheckoutBtn.removeAttribute("title");
  }

  // 3. Render cart item cards
  DOM.cartItemsList.innerHTML = "";
  STATE.cart.forEach(cartItem => {
    const product = PRODUCTS.find(p => p.id === cartItem.id);
    if (!product) return;

    const itemTotal = product.price * cartItem.quantity;
    const isMinQuantity = cartItem.quantity <= 1;

    const li = document.createElement("li");
    li.className = "cart-item-card";
    li.setAttribute("data-item-id", product.id);

    li.innerHTML = `
      <div class="cart-item-thumb">
        ${product.svg}
      </div>
      <div class="cart-item-info">
        <h4 class="cart-item-name" title="${product.name}">${product.name}</h4>
        <span class="cart-item-unit-price">${formatCurrency(product.price)} each</span>
        <div class="cart-item-actions">
          <div class="qty-control">
            <button 
              type="button" 
              class="qty-btn" 
              data-action="decrease-qty" 
              data-id="${product.id}"
              id="decrease-qty-btn-${product.id}"
              aria-label="Decrease quantity"
              ${isMinQuantity ? 'disabled title="Minimum quantity is 1"' : ""}
            >-</button>
            <span class="qty-val" id="qty-val-${product.id}" aria-label="Current quantity">${cartItem.quantity}</span>
            <button 
              type="button" 
              class="qty-btn" 
              data-action="increase-qty" 
              data-id="${product.id}"
              id="increase-qty-btn-${product.id}"
              aria-label="Increase quantity"
            >+</button>
          </div>
          <button 
            type="button" 
            class="btn-remove-item" 
            data-action="remove-item" 
            data-id="${product.id}"
            id="remove-item-btn-${product.id}"
          >Remove</button>
        </div>
      </div>
      <div class="cart-item-end">
        <span class="cart-item-total" id="cart-item-total-${product.id}">${formatCurrency(itemTotal)}</span>
      </div>
    `;

    DOM.cartItemsList.appendChild(li);
  });

  // 4. Update Price Breakdown Displays
  DOM.subtotalAmount.textContent = formatCurrency(totals.subtotal);
  DOM.discountAmount.textContent = `-${formatCurrency(totals.discount)}`;
  DOM.totalAmount.textContent = formatCurrency(totals.finalTotal);

  // 5. Update Coupon Tag UI
  if (STATE.appliedCoupon && STATE.appliedCoupon.code === "SAVE10" && totals.subtotal > 0) {
    DOM.appliedCouponTag.classList.remove("hidden");
  } else {
    DOM.appliedCouponTag.classList.add("hidden");
  }
}

// ============================================================================
// 8. COUPON VALIDATION & APPLICATION
// ============================================================================

/**
 * Validates and applies coupon code.
 * Rules:
 *  - Demo valid coupon: "SAVE10" (10% discount).
 *  - Empty input: prompts user.
 *  - Empty cart: cannot apply.
 *  - Invalid code: displays error.
 *  - Duplicate application: prevents stacking and warns user.
 */
function applyCoupon() {
  const enteredCode = DOM.couponInput.value.trim().toUpperCase();

  // Reset coupon feedback styles
  DOM.couponMessage.className = "coupon-message";

  // Check 1: Empty input check
  if (!enteredCode) {
    DOM.couponMessage.textContent = "Please enter a coupon code.";
    DOM.couponMessage.classList.add("error");
    return;
  }

  // Check 2: Empty cart check
  if (STATE.cart.length === 0) {
    DOM.couponMessage.textContent = "Your cart is empty. Add products before applying a coupon.";
    DOM.couponMessage.classList.add("error");
    return;
  }

  // Check 3: Already applied check (prevents duplicate stacking)
  if (STATE.appliedCoupon && STATE.appliedCoupon.code === enteredCode) {
    DOM.couponMessage.textContent = `Coupon "${enteredCode}" is already applied to this cart.`;
    DOM.couponMessage.classList.add("error");
    return;
  }

  // Check 4: Valid coupon check
  if (enteredCode === "SAVE10") {
    STATE.appliedCoupon = {
      code: "SAVE10",
      discountPercent: 10
    };
    DOM.couponMessage.textContent = "Success! 10% discount has been applied to your order.";
    DOM.couponMessage.classList.add("success");
    DOM.couponInput.value = "";
    updateCartUI();
    showToast("Coupon SAVE10 applied! (10% OFF)", "success");
  } else {
    // Check 5: Invalid coupon check
    DOM.couponMessage.textContent = `"${enteredCode}" is not a valid coupon code. Try "SAVE10".`;
    DOM.couponMessage.classList.add("error");
  }
}

/**
 * Removes the currently active coupon code.
 */
function removeCoupon() {
  if (STATE.appliedCoupon) {
    STATE.appliedCoupon = null;
    DOM.couponMessage.textContent = "Coupon removed.";
    DOM.couponMessage.className = "coupon-message";
    updateCartUI();
    showToast("Coupon removed", "info");
  }
}

// ============================================================================
// 9. DRAWER & MODAL UI CONTROLS
// ============================================================================

function openCartDrawer() {
  // Protect cart drawer from unauthenticated access
  if (!STATE.currentUser) {
    showToast("Please sign in to access your shopping cart.", "warning");
    window.location.hash = "#login";
    return;
  }

  DOM.cartDrawer.classList.add("open");
  DOM.cartDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeCartDrawer() {
  DOM.cartDrawer.classList.remove("open");
  DOM.cartDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function openCheckoutModal() {
  // Protect checkout modal from unauthenticated access
  if (!STATE.currentUser) {
    showToast("Please sign in to proceed to checkout.", "warning");
    closeCartDrawer();
    window.location.hash = "#login";
    return;
  }

  // Validate that cart is not empty before allowing checkout
  if (STATE.cart.length === 0) {
    showToast("Your cart is empty! Add products to proceed.", "warning");
    return;
  }

  // Close cart drawer and display checkout modal
  closeCartDrawer();
  const totals = calculateCartTotals();
  DOM.checkoutItemCount.textContent = `${totals.totalUnits} ${totals.totalUnits === 1 ? "item" : "items"}`;
  DOM.checkoutTotalAmount.textContent = formatCurrency(totals.finalTotal);

  DOM.checkoutModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  // Focus the first input field
  setTimeout(() => DOM.inputName.focus(), 100);
}

function closeCheckoutModal() {
  DOM.checkoutModal.classList.add("hidden");
  document.body.style.overflow = "";
}

function openOrderConfirmationModal(orderDetails) {
  closeCheckoutModal();

  DOM.confirmOrderId.textContent = orderDetails.orderId;
  DOM.confirmCustomerName.textContent = orderDetails.fullName;
  DOM.confirmCustomerEmail.textContent = orderDetails.email;
  DOM.confirmCustomerPhone.textContent = orderDetails.phone;
  DOM.confirmDestination.textContent = `${orderDetails.address}, ${orderDetails.city} - ${orderDetails.pincode}`;
  DOM.confirmTotalAmount.textContent = formatCurrency(orderDetails.totalAmount);

  DOM.orderConfirmationModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeOrderConfirmationModal() {
  DOM.orderConfirmationModal.classList.add("hidden");
  document.body.style.overflow = "";
  // Return to products view
  window.location.hash = "#products-section";
}

// ============================================================================
// 10. CHECKOUT FORM VALIDATION (POSITIVE & NEGATIVE TEST RULES)
// ============================================================================

/**
 * Sets error state and message for a form input.
 * @param {HTMLElement} inputElem - Input or textarea element
 * @param {HTMLElement} errorElem - Error text container element
 * @param {string} message - Validation error description
 */
function setFieldError(inputElem, errorElem, message) {
  inputElem.classList.add("has-error");
  errorElem.textContent = message;
}

/**
 * Clears error state for a form input.
 * @param {HTMLElement} inputElem 
 * @param {HTMLElement} errorElem 
 */
function clearFieldError(inputElem, errorElem) {
  inputElem.classList.remove("has-error");
  errorElem.textContent = "";
}

/**
 * Validates the entire checkout form against manual testing criteria.
 * Returns true if valid, false if any field fails.
 * Cart is strictly preserved on validation failure.
 */
function validateCheckoutForm() {
  let isValid = true;

  // 1. Full Name Validation:
  // - Required, non-whitespace
  // - At least 3 characters
  const nameVal = DOM.inputName.value.trim();
  if (nameVal === "") {
    setFieldError(DOM.inputName, DOM.errorName, "Full name is required.");
    isValid = false;
  } else if (nameVal.length < 3) {
    setFieldError(DOM.inputName, DOM.errorName, "Full name must be at least 3 characters long.");
    isValid = false;
  } else {
    clearFieldError(DOM.inputName, DOM.errorName);
  }

  // 2. Email Address Validation:
  // - Required, non-whitespace
  // - Valid RFC email pattern (user@domain.tld)
  const emailVal = DOM.inputEmail.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (emailVal === "") {
    setFieldError(DOM.inputEmail, DOM.errorEmail, "Email address is required.");
    isValid = false;
  } else if (!emailRegex.test(emailVal)) {
    setFieldError(DOM.inputEmail, DOM.errorEmail, "Please enter a valid email address (e.g. name@example.com).");
    isValid = false;
  } else {
    clearFieldError(DOM.inputEmail, DOM.errorEmail);
  }

  // 3. Indian Mobile Phone Number Validation:
  // - Required, non-whitespace
  // - Exactly 10 digits
  // - Must start with 6, 7, 8, or 9
  // - Boundary testing: 9 digits -> invalid, 10 digits -> valid, 11 digits -> invalid
  const phoneVal = DOM.inputPhone.value.trim();
  const indianPhoneRegex = /^[6-9]\d{9}$/;
  if (phoneVal === "") {
    setFieldError(DOM.inputPhone, DOM.errorPhone, "Phone number is required.");
    isValid = false;
  } else if (!/^\d+$/.test(phoneVal)) {
    setFieldError(DOM.inputPhone, DOM.errorPhone, "Phone number must contain digits only.");
    isValid = false;
  } else if (phoneVal.length !== 10) {
    setFieldError(DOM.inputPhone, DOM.errorPhone, `Phone number must be exactly 10 digits (currently ${phoneVal.length}).`);
    isValid = false;
  } else if (!indianPhoneRegex.test(phoneVal)) {
    setFieldError(DOM.inputPhone, DOM.errorPhone, "Indian mobile number must start with 6, 7, 8, or 9.");
    isValid = false;
  } else {
    clearFieldError(DOM.inputPhone, DOM.errorPhone);
  }

  // 4. Delivery Address Validation:
  // - Required, non-whitespace
  // - Minimum length 10 characters for realistic delivery
  const addressVal = DOM.inputAddress.value.trim();
  if (addressVal === "") {
    setFieldError(DOM.inputAddress, DOM.errorAddress, "Delivery address is required.");
    isValid = false;
  } else if (addressVal.length < 10) {
    setFieldError(DOM.inputAddress, DOM.errorAddress, "Please provide a complete address (at least 10 characters).");
    isValid = false;
  } else {
    clearFieldError(DOM.inputAddress, DOM.errorAddress);
  }

  // 5. City Validation:
  // - Required, non-whitespace
  // - At least 2 characters
  const cityVal = DOM.inputCity.value.trim();
  if (cityVal === "") {
    setFieldError(DOM.inputCity, DOM.errorCity, "City is required.");
    isValid = false;
  } else if (cityVal.length < 2) {
    setFieldError(DOM.inputCity, DOM.errorCity, "City name must be at least 2 characters.");
    isValid = false;
  } else {
    clearFieldError(DOM.inputCity, DOM.errorCity);
  }

  // 6. Indian PIN Code Validation:
  // - Required, non-whitespace
  // - Exactly 6 digits
  // - Cannot start with 0 (Indian PIN codes range from 110001 to 855117 etc.)
  // - Boundary testing: 5 digits -> invalid, 6 digits -> valid, 7 digits -> invalid
  const pincodeVal = DOM.inputPincode.value.trim();
  const indianPincodeRegex = /^[1-9]\d{5}$/;
  if (pincodeVal === "") {
    setFieldError(DOM.inputPincode, DOM.errorPincode, "PIN code is required.");
    isValid = false;
  } else if (!/^\d+$/.test(pincodeVal)) {
    setFieldError(DOM.inputPincode, DOM.errorPincode, "PIN code must contain digits only.");
    isValid = false;
  } else if (pincodeVal.length !== 6) {
    setFieldError(DOM.inputPincode, DOM.errorPincode, `PIN code must be exactly 6 digits (currently ${pincodeVal.length}).`);
    isValid = false;
  } else if (!indianPincodeRegex.test(pincodeVal)) {
    setFieldError(DOM.inputPincode, DOM.errorPincode, "Valid Indian PIN code cannot start with 0.");
    isValid = false;
  } else {
    clearFieldError(DOM.inputPincode, DOM.errorPincode);
  }

  return isValid;
}

/**
 * Handles simulated checkout form submission.
 * @param {Event} event - Submit event
 */
function handleCheckoutSubmit(event) {
  event.preventDefault();

  // Validate form
  const isFormValid = validateCheckoutForm();

  if (!isFormValid) {
    showToast("Please correct the errors in the checkout form.", "warning");
    // Cart is preserved!
    return;
  }

  // Gather order details
  const totals = calculateCartTotals();
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const orderId = `#ORD-${randomSuffix}`;

  const orderDetails = {
    orderId,
    fullName: DOM.inputName.value.trim(),
    email: DOM.inputEmail.value.trim(),
    phone: DOM.inputPhone.value.trim(),
    address: DOM.inputAddress.value.trim(),
    city: DOM.inputCity.value.trim(),
    pincode: DOM.inputPincode.value.trim(),
    totalAmount: totals.finalTotal,
    itemCount: totals.totalUnits
  };

  // 1. Display order confirmation
  openOrderConfirmationModal(orderDetails);

  // 2. Clear shopping cart and coupon on successful order placement
  STATE.cart = [];
  STATE.appliedCoupon = null;
  DOM.couponMessage.textContent = "";
  DOM.couponMessage.className = "coupon-message";
  saveCartToStorage();
  updateCartUI();

  // 3. Reset form
  DOM.checkoutForm.reset();
  clearAllFormErrors();
  showToast("Order placed successfully!", "success");
}

/**
 * Clears all error states from checkout form fields.
 */
function clearAllFormErrors() {
  clearFieldError(DOM.inputName, DOM.errorName);
  clearFieldError(DOM.inputEmail, DOM.errorEmail);
  clearFieldError(DOM.inputPhone, DOM.errorPhone);
  clearFieldError(DOM.inputAddress, DOM.errorAddress);
  clearFieldError(DOM.inputCity, DOM.errorCity);
  clearFieldError(DOM.inputPincode, DOM.errorPincode);
}

// ============================================================================
// 11. AUTHENTICATION & DEMO ACCOUNTS LOGIC
// ============================================================================

/**
 * Computes a SHA-256 hash of a string using the native Web Crypto API.
 * Includes a lightweight fallback for test environments without crypto.subtle.
 * 
 * EDUCATIONAL & QA DEMO NOTICE:
 * Client-side hashing does NOT equal real-world security. In production,
 * authentication is performed on a secure backend with salted hashing (bcrypt/Argon2).
 * This function exists strictly to demonstrate front-end credential validation.
 * 
 * @param {string} plainText - Password string to hash
 * @returns {Promise<string>} Hex-encoded hash string
 */
async function hashPassword(plainText) {
  if (window.crypto && window.crypto.subtle) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(plainText);
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    } catch (err) {
      console.warn("Web Crypto error, using fallback:", err);
    }
  }

  // Simple deterministic fallback for offline environments
  let hash = 0;
  for (let i = 0; i < plainText.length; i++) {
    const char = plainText.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return "fallback_" + Math.abs(hash).toString(16);
}

/**
 * Retrieves the list of newly registered user accounts from localStorage.
 * Does NOT overwrite accounts on reload.
 * @returns {Array} Array of user objects
 */
function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn("Unable to read registered users from storage:", err);
  }
  return [];
}

/**
 * Saves registered users array to localStorage.
 * Plaintext passwords are NEVER stored; only password hashes are persisted.
 * @param {Array} users - Array of user objects
 */
function saveRegisteredUsers(users) {
  try {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  } catch (err) {
    console.warn("Unable to save registered users to storage:", err);
  }
}

/**
 * Loads the active user session from localStorage (if previously authenticated).
 */
function loadSessionFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSION);
    if (raw) {
      const user = JSON.parse(raw);
      if (user && user.email) {
        STATE.currentUser = user;
      }
    }
  } catch (err) {
    console.warn("Unable to load session from storage:", err);
    STATE.currentUser = null;
  }
}

/**
 * Saves active user session to localStorage.
 * Only saves generic user identity (id, name, email); NEVER stores passwords.
 * @param {Object} user 
 */
function saveSessionToStorage(user) {
  try {
    STATE.currentUser = {
      id: user.id,
      name: user.name,
      email: user.email
    };
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(STATE.currentUser));
  } catch (err) {
    console.warn("Unable to save session to storage:", err);
  }
}

/**
 * Clears the active user session.
 */
function clearSessionFromStorage() {
  STATE.currentUser = null;
  try {
    localStorage.removeItem(STORAGE_KEY_SESSION);
  } catch (err) {
    console.warn("Unable to remove session from storage:", err);
  }
}

/**
 * Updates the navigation bar and authentication banners according to the login state.
 */
function updateAuthUI() {
  if (STATE.currentUser) {
    // Logged-in state
    DOM.navAuthLoggedOut.classList.add("hidden");
    DOM.navAuthLoggedIn.classList.remove("hidden");
    DOM.navUserName.textContent = STATE.currentUser.name;

    // Show shopping navigation links
    DOM.navHome.classList.remove("hidden");
    DOM.navProducts.classList.remove("hidden");
    DOM.navCartBtn.classList.remove("hidden");

    // In Login view, show the 'already authenticated' banner
    if (DOM.loginAlreadyAuth) {
      DOM.loginAlreadyAuth.classList.remove("hidden");
      DOM.loggedInUserDisplay.textContent = `${STATE.currentUser.name} (${STATE.currentUser.email})`;
      DOM.loginForm.classList.add("hidden");
    }
  } else {
    // Logged-out state
    DOM.navAuthLoggedOut.classList.remove("hidden");
    DOM.navAuthLoggedIn.classList.add("hidden");
    DOM.navUserName.textContent = "User";

    // Hide shopping navigation links until login succeeds
    DOM.navHome.classList.add("hidden");
    DOM.navProducts.classList.add("hidden");
    DOM.navCartBtn.classList.add("hidden");

    if (DOM.loginAlreadyAuth) {
      DOM.loginAlreadyAuth.classList.add("hidden");
      DOM.loginForm.classList.remove("hidden");
    }
  }
}

/**
 * Switches the active page view between Shopping, Registration, and Login.
 * Strictly guards the shopping view from unauthenticated access.
 * @param {'shop' | 'register' | 'login'} viewName 
 */
function switchView(viewName) {
  // Authentication Guard:
  // If user is not authenticated and attempts to view 'shop', force redirect to 'login'
  if (viewName === "shop" && !STATE.currentUser) {
    viewName = "login";
    if (window.location.hash.toLowerCase() !== "#login" && window.location.hash.toLowerCase() !== "#register") {
      window.location.hash = "#login";
    }
  }

  STATE.currentView = viewName;

  // 1. Hide all page views
  DOM.viewShop.classList.add("hidden");
  DOM.viewRegister.classList.add("hidden");
  DOM.viewLogin.classList.add("hidden");

  // 2. Clear nav active classes
  DOM.navHome.classList.remove("active");
  DOM.navProducts.classList.remove("active");
  DOM.navLogin.classList.remove("active");
  DOM.navRegister.classList.remove("active");

  // 3. Show targeted view
  if (viewName === "register") {
    DOM.viewRegister.classList.remove("hidden");
    DOM.navRegister.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (viewName === "login") {
    DOM.viewLogin.classList.remove("hidden");
    DOM.navLogin.classList.add("active");
    updateAuthUI();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    // Default: Shopping catalog
    DOM.viewShop.classList.remove("hidden");
    DOM.navHome.classList.add("active");
  }
}

/**
 * Reads the URL hash and routes to the appropriate view.
 * Enforces Login-first experience and protects shopping features from unauthenticated access.
 */
function handleRouting() {
  const hash = window.location.hash.toLowerCase();

  // Re-check authentication from storage to ensure state freshness on back/forward navigation
  loadSessionFromStorage();
  updateAuthUI();

  // Case 1: Unauthenticated Visitor / Logged-Out User
  if (!STATE.currentUser) {
    // Ensure cart drawer and modals cannot remain open
    closeCartDrawer();
    closeCheckoutModal();

    if (hash === "#register") {
      switchView("register");
    } else {
      // Force redirect to login for #home, #products-section, empty hash, or any other URL
      if (window.location.hash.toLowerCase() !== "#login") {
        window.location.hash = "#login";
      }
      switchView("login");
    }
    return;
  }

  // Case 2: Authenticated User
  if (hash === "#register") {
    // Already authenticated; redirect to homepage
    window.location.hash = "#home";
  } else if (hash === "#login") {
    switchView("login");
  } else if (hash === "#products-section") {
    switchView("shop");
    DOM.navHome.classList.remove("active");
    DOM.navProducts.classList.add("active");
  } else {
    // Default to ShopSmart homepage
    switchView("shop");
    DOM.navHome.classList.add("active");
    DOM.navProducts.classList.remove("active");
  }
}

/**
 * Handles Registration Form Submission with validation rules.
 * @param {Event} event 
 */
async function handleRegisterSubmit(event) {
  event.preventDefault();

  const nameVal = DOM.registerName.value.trim();
  const emailVal = DOM.registerEmail.value.trim();
  const passwordVal = DOM.registerPassword.value;
  const confirmPasswordVal = DOM.registerConfirmPassword.value;

  let isValid = true;

  // Rule 1: Full name - mandatory, no whitespace-only, min 2 chars
  if (nameVal === "") {
    setFieldError(DOM.registerName, DOM.errorRegisterName, "Full name is required.");
    isValid = false;
  } else if (nameVal.length < 2) {
    setFieldError(DOM.registerName, DOM.errorRegisterName, "Full name must be at least 2 characters.");
    isValid = false;
  } else {
    clearFieldError(DOM.registerName, DOM.errorRegisterName);
  }

  // Rule 2: Email address - mandatory, valid format, no duplicates
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const normalizedEmail = emailVal.toLowerCase();

  if (emailVal === "") {
    setFieldError(DOM.registerEmail, DOM.errorRegisterEmail, "Email address is required.");
    isValid = false;
  } else if (!emailRegex.test(emailVal)) {
    setFieldError(DOM.registerEmail, DOM.errorRegisterEmail, "Please enter a valid email address (e.g. name@example.com).");
    isValid = false;
  } else {
    // Check duplicate against predefined DEMO_USERS
    const demoAccounts = (typeof window !== "undefined" && window.DEMO_USERS) || [];
    const existsInDemo = demoAccounts.some(u => u.email.toLowerCase() === normalizedEmail);

    // Check duplicate against registered accounts in localStorage
    const registeredUsers = getRegisteredUsers();
    const existsInRegistered = registeredUsers.some(u => u.email.toLowerCase() === normalizedEmail);

    if (existsInDemo || existsInRegistered) {
      setFieldError(DOM.registerEmail, DOM.errorRegisterEmail, "This email address is already registered. Please sign in or use another email.");
      isValid = false;
    } else {
      clearFieldError(DOM.registerEmail, DOM.errorRegisterEmail);
    }
  }

  // Rule 3: Password - mandatory, min 6 characters
  if (!passwordVal) {
    setFieldError(DOM.registerPassword, DOM.errorRegisterPassword, "Password is required.");
    isValid = false;
  } else if (passwordVal.length < 6) {
    setFieldError(DOM.registerPassword, DOM.errorRegisterPassword, "Password must be at least 6 characters long.");
    isValid = false;
  } else {
    clearFieldError(DOM.registerPassword, DOM.errorRegisterPassword);
  }

  // Rule 4: Confirm password - mandatory, must match password
  if (!confirmPasswordVal) {
    setFieldError(DOM.registerConfirmPassword, DOM.errorRegisterConfirmPassword, "Please confirm your password.");
    isValid = false;
  } else if (confirmPasswordVal !== passwordVal) {
    setFieldError(DOM.registerConfirmPassword, DOM.errorRegisterConfirmPassword, "Passwords do not match.");
    isValid = false;
  } else {
    clearFieldError(DOM.registerConfirmPassword, DOM.errorRegisterConfirmPassword);
  }

  if (!isValid) {
    showToast("Please correct the errors in the registration form.", "warning");
    return;
  }

  // Prevent duplicate submissions while hashing
  DOM.registerSubmitBtn.disabled = true;
  DOM.registerSubmitBtn.textContent = "Registering...";

  try {
    // Generate educational SHA-256 hash (never store plaintext)
    const passwordHash = await hashPassword(passwordVal);

    const newUser = {
      id: "usr-" + Date.now(),
      name: nameVal,
      email: normalizedEmail,
      passwordHash: passwordHash,
      registeredAt: new Date().toISOString()
    };

    // Append to existing registered users in localStorage
    const currentRegistered = getRegisteredUsers();
    currentRegistered.push(newUser);
    saveRegisteredUsers(currentRegistered);

    // Reset registration form inputs
    DOM.registerForm.reset();
    clearFieldError(DOM.registerName, DOM.errorRegisterName);
    clearFieldError(DOM.registerEmail, DOM.errorRegisterEmail);
    clearFieldError(DOM.registerPassword, DOM.errorRegisterPassword);
    clearFieldError(DOM.registerConfirmPassword, DOM.errorRegisterConfirmPassword);

    // Pre-fill registered email in the login form for convenience
    DOM.loginEmail.value = normalizedEmail;

    // Show registration success banner in login view
    if (DOM.loginRegSuccess) {
      DOM.loginRegSuccess.classList.remove("hidden");
    }

    showToast("Registration successful! Please sign in with your credentials.", "success");

    // Redirect to Login page rather than automatically authenticating
    window.location.hash = "#login";
    switchView("login");
  } finally {
    DOM.registerSubmitBtn.disabled = false;
    DOM.registerSubmitBtn.textContent = "Register Account";
  }
}

/**
 * Handles Login Form Submission.
 * Authenticates against both predefined demo accounts and registered accounts.
 * @param {Event} event 
 */
async function handleLoginSubmit(event) {
  event.preventDefault();

  const emailVal = DOM.loginEmail.value.trim();
  const passwordVal = DOM.loginPassword.value;

  let isValid = true;
  DOM.loginGeneralError.classList.add("hidden");

  // Validate email field
  if (emailVal === "") {
    setFieldError(DOM.loginEmail, DOM.errorLoginEmail, "Email address is required.");
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailVal)) {
    setFieldError(DOM.loginEmail, DOM.errorLoginEmail, "Please enter a valid email address.");
    isValid = false;
  } else {
    clearFieldError(DOM.loginEmail, DOM.errorLoginEmail);
  }

  // Validate password field
  if (!passwordVal) {
    setFieldError(DOM.loginPassword, DOM.errorLoginPassword, "Password is required.");
    isValid = false;
  } else {
    clearFieldError(DOM.loginPassword, DOM.errorLoginPassword);
  }

  if (!isValid) return;

  // Prevent accidental repeated button clicks
  DOM.loginSubmitBtn.disabled = true;
  DOM.loginSubmitBtn.textContent = "Signing In...";

  try {
    const enteredHash = await hashPassword(passwordVal);
    const normalizedEmail = emailVal.toLowerCase();

    // 1. Search in predefined DEMO_USERS
    const demoAccounts = (typeof window !== "undefined" && window.DEMO_USERS) || [];
    let matchedUser = demoAccounts.find(u => {
      const emailMatches = u.email.toLowerCase() === normalizedEmail;
      const passMatches = (u.passwordHash === enteredHash) || (u.demoPasswordRef === passwordVal);
      return emailMatches && passMatches;
    });

    // 2. Search in newly registered users (localStorage)
    if (!matchedUser) {
      const registeredUsers = getRegisteredUsers();
      matchedUser = registeredUsers.find(u => {
        return u.email.toLowerCase() === normalizedEmail && u.passwordHash === enteredHash;
      });
    }

    if (matchedUser) {
      // Successful authentication
      saveSessionToStorage(matchedUser);
      updateAuthUI();

      // Clear form and error states
      DOM.loginForm.reset();
      clearFieldError(DOM.loginEmail, DOM.errorLoginEmail);
      clearFieldError(DOM.loginPassword, DOM.errorLoginPassword);
      DOM.loginGeneralError.classList.add("hidden");
      if (DOM.loginRegSuccess) {
        DOM.loginRegSuccess.classList.add("hidden");
      }

      showToast(`Welcome, ${matchedUser.name}!`, "success");

      // Redirect user to the ShopSmart homepage upon successful login
      window.location.hash = "#home";
      switchView("shop");
    } else {
      // Authentication failure - Generic message to not reveal account existence
      DOM.loginGeneralError.classList.remove("hidden");
      DOM.loginErrorText.textContent = "Invalid email or password. Please try again.";
      DOM.loginPassword.value = "";
      showToast("Invalid email or password", "warning");
    }
  } finally {
    DOM.loginSubmitBtn.disabled = false;
    DOM.loginSubmitBtn.textContent = "Sign In";
  }
}

/**
 * Handles user logout.
 */
function handleLogout() {
  const userName = STATE.currentUser ? STATE.currentUser.name : "User";
  clearSessionFromStorage();
  updateAuthUI();
  showToast(`You have logged out. Goodbye, ${userName}!`, "info");

  // Hide any leftover registration banner
  if (DOM.loginRegSuccess) {
    DOM.loginRegSuccess.classList.add("hidden");
  }

  // Always redirect to Login on logout
  window.location.hash = "#login";
  switchView("login");
}

/**
 * Resets newly registered demo accounts back to initial state.
 * Does NOT delete unrelated files or shopping cart contents.
 */
function resetDemoRegistrationData() {
  try {
    localStorage.removeItem(STORAGE_KEY_USERS);

    // If active user was a registered account (not a demo account), log out
    const demoAccounts = (typeof window !== "undefined" && window.DEMO_USERS) || [];
    if (STATE.currentUser && !demoAccounts.some(d => d.email.toLowerCase() === STATE.currentUser.email.toLowerCase())) {
      clearSessionFromStorage();
      updateAuthUI();
    }

    // Hide any previous registration success banner
    if (DOM.registerSuccessMsg) {
      DOM.registerSuccessMsg.classList.add("hidden");
    }

    showToast("Registered demo accounts have been reset. Predefined accounts remain active.", "info");
  } catch (err) {
    console.warn("Unable to reset demo data:", err);
  }
}

/**
 * Helper to wire password show/hide toggle buttons.
 * @param {HTMLElement} btn 
 * @param {HTMLElement} input 
 */
function setupPasswordToggle(btn, input) {
  if (!btn || !input) return;
  btn.addEventListener("click", () => {
    if (input.type === "password") {
      input.type = "text";
      btn.textContent = "🙈";
      btn.setAttribute("aria-label", "Hide password");
      btn.title = "Hide password";
    } else {
      input.type = "password";
      btn.textContent = "👁️";
      btn.setAttribute("aria-label", "Show password");
      btn.title = "Show password";
    }
  });
}

// ============================================================================
// 12. EVENT LISTENERS & DELEGATION
// ============================================================================

function attachEventListeners() {
  // Navigation & Drawer Openers
  DOM.navCartBtn.addEventListener("click", openCartDrawer);
  DOM.btnHeroCart.addEventListener("click", openCartDrawer);
  DOM.closeCartBtn.addEventListener("click", closeCartDrawer);
  DOM.cartOverlay.addEventListener("click", closeCartDrawer);
  DOM.btnEmptyCartShop.addEventListener("click", () => {
    closeCartDrawer();
    window.location.hash = "#products-section";
  });

  // Search & Filter Listeners
  DOM.searchInput.addEventListener("input", filterAndSortProducts);
  DOM.categoryFilter.addEventListener("change", filterAndSortProducts);
  DOM.sortSelect.addEventListener("change", filterAndSortProducts);

  DOM.clearSearchBtn.addEventListener("click", () => {
    DOM.searchInput.value = "";
    DOM.clearSearchBtn.classList.remove("visible");
    filterAndSortProducts();
    DOM.searchInput.focus();
  });

  DOM.resetFiltersBtn.addEventListener("click", resetAllFilters);
  DOM.emptyStateResetBtn.addEventListener("click", resetAllFilters);

  // Product Grid Delegation (Add to Cart)
  DOM.productsGrid.addEventListener("click", (event) => {
    const addBtn = event.target.closest('[data-action="add-to-cart"]');
    if (addBtn) {
      const productId = parseInt(addBtn.getAttribute("data-id"), 10);
      addToCart(productId);
    }
  });

  // Cart List Delegation (Increase, Decrease, Remove)
  DOM.cartItemsList.addEventListener("click", (event) => {
    const increaseBtn = event.target.closest('[data-action="increase-qty"]');
    if (increaseBtn) {
      const productId = parseInt(increaseBtn.getAttribute("data-id"), 10);
      updateCartQuantity(productId, 1);
      return;
    }

    const decreaseBtn = event.target.closest('[data-action="decrease-qty"]');
    if (decreaseBtn) {
      const productId = parseInt(decreaseBtn.getAttribute("data-id"), 10);
      updateCartQuantity(productId, -1);
      return;
    }

    const removeBtn = event.target.closest('[data-action="remove-item"]');
    if (removeBtn) {
      const productId = parseInt(removeBtn.getAttribute("data-id"), 10);
      removeFromCart(productId);
      return;
    }
  });

  // Coupon Listeners
  DOM.applyCouponBtn.addEventListener("click", applyCoupon);
  DOM.couponInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyCoupon();
    }
  });
  DOM.removeCouponBtn.addEventListener("click", removeCoupon);

  // Checkout Modal Navigation
  DOM.proceedCheckoutBtn.addEventListener("click", openCheckoutModal);
  DOM.closeCheckoutBtn.addEventListener("click", closeCheckoutModal);
  DOM.cancelCheckoutBtn.addEventListener("click", () => {
    closeCheckoutModal();
    openCartDrawer();
  });

  // Real-time clearing of error states when user types
  DOM.inputName.addEventListener("input", () => clearFieldError(DOM.inputName, DOM.errorName));
  DOM.inputEmail.addEventListener("input", () => clearFieldError(DOM.inputEmail, DOM.errorEmail));
  DOM.inputPhone.addEventListener("input", () => clearFieldError(DOM.inputPhone, DOM.errorPhone));
  DOM.inputAddress.addEventListener("input", () => clearFieldError(DOM.inputAddress, DOM.errorAddress));
  DOM.inputCity.addEventListener("input", () => clearFieldError(DOM.inputCity, DOM.errorCity));
  DOM.inputPincode.addEventListener("input", () => clearFieldError(DOM.inputPincode, DOM.errorPincode));

  // Checkout Form Submission
  DOM.checkoutForm.addEventListener("submit", handleCheckoutSubmit);

  // Order Confirmation Modal
  DOM.continueShoppingBtn.addEventListener("click", closeOrderConfirmationModal);

  // Escape Key to close modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!DOM.orderConfirmationModal.classList.contains("hidden")) {
        closeOrderConfirmationModal();
      } else if (!DOM.checkoutModal.classList.contains("hidden")) {
        closeCheckoutModal();
      } else if (DOM.cartDrawer.classList.contains("open")) {
        closeCartDrawer();
      }
    }
  });

  // --- Authentication Event Listeners ---
  // Registration Form
  DOM.registerForm.addEventListener("submit", handleRegisterSubmit);
  DOM.registerName.addEventListener("input", () => clearFieldError(DOM.registerName, DOM.errorRegisterName));
  DOM.registerEmail.addEventListener("input", () => clearFieldError(DOM.registerEmail, DOM.errorRegisterEmail));
  DOM.registerPassword.addEventListener("input", () => clearFieldError(DOM.registerPassword, DOM.errorRegisterPassword));
  DOM.registerConfirmPassword.addEventListener("input", () => clearFieldError(DOM.registerConfirmPassword, DOM.errorRegisterConfirmPassword));

  // Password Toggles
  setupPasswordToggle(DOM.toggleRegisterPassword, DOM.registerPassword);
  setupPasswordToggle(DOM.toggleRegisterConfirmPassword, DOM.registerConfirmPassword);
  setupPasswordToggle(DOM.toggleLoginPassword, DOM.loginPassword);

  // Registration navigation button
  DOM.btnRegisteredGoLogin.addEventListener("click", () => {
    window.location.hash = "#login";
  });

  // Login Form
  DOM.loginForm.addEventListener("submit", handleLoginSubmit);
  DOM.loginEmail.addEventListener("input", () => {
    clearFieldError(DOM.loginEmail, DOM.errorLoginEmail);
    DOM.loginGeneralError.classList.add("hidden");
  });
  DOM.loginPassword.addEventListener("input", () => {
    clearFieldError(DOM.loginPassword, DOM.errorLoginPassword);
    DOM.loginGeneralError.classList.add("hidden");
  });

  // Logout Buttons
  DOM.navLogoutBtn.addEventListener("click", handleLogout);
  DOM.btnLoginViewLogout.addEventListener("click", handleLogout);

  // Footer Reset Demo Accounts Button
  DOM.btnResetDemoData.addEventListener("click", resetDemoRegistrationData);

  // Logo Click Protection
  DOM.brandLogo.addEventListener("click", (e) => {
    if (!STATE.currentUser) {
      e.preventDefault();
      window.location.hash = "#login";
    } else {
      window.location.hash = "#home";
    }
  });

  // Navigation Links Protection
  DOM.navHome.addEventListener("click", (e) => {
    if (!STATE.currentUser) {
      e.preventDefault();
      showToast("Please sign in to view products.", "warning");
      window.location.hash = "#login";
    }
  });

  DOM.navProducts.addEventListener("click", (e) => {
    if (!STATE.currentUser) {
      e.preventDefault();
      showToast("Please sign in to view products.", "warning");
      window.location.hash = "#login";
    }
  });

  // URL Hash & History Routing (Handles back/forward buttons and direct navigation)
  window.addEventListener("hashchange", handleRouting);
  window.addEventListener("popstate", handleRouting);
  window.addEventListener("pageshow", handleRouting);
}

// ============================================================================
// 13. GLOBAL TESTING API (For Console / Manual Testing Inspection)
// ============================================================================
// Makes demo auth state cleanly inspectable and resettable in browser console
window.ShopSmartAuth = {
  resetDemoData: resetDemoRegistrationData,
  getRegisteredUsers: getRegisteredUsers,
  getCurrentUser: () => STATE.currentUser,
  getDemoUsers: () => (typeof window !== "undefined" && window.DEMO_USERS) || []
};

// ============================================================================
// 14. INITIALIZATION
// ============================================================================

/**
 * Initializes the application on DOMContentLoaded.
 */
function initShopSmart() {
  loadCartFromStorage();
  loadSessionFromStorage();
  renderProducts(PRODUCTS);
  updateCartUI();
  updateAuthUI();
  attachEventListeners();
  handleRouting();
}

// Execute on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initShopSmart);
} else {
  initShopSmart();
}
