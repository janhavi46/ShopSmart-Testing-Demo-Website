/**
 * ============================================================================
 * ShopSmart - Predefined Demo Test Accounts
 * File: test-data/demo-users.js
 * Description: Fictional test accounts for manual QA testing & portfolio evaluation.
 * 
 * IMPORTANT TESTING & SECURITY NOTICE:
 * - These accounts are generic, fictional test accounts intended strictly for
 *   educational and manual QA testing demonstration purposes.
 * - This application is a client-side demo with no backend server or database.
 * - These predefined credentials are public and must NOT be treated as secure
 *   authentication credentials. Never use real passwords or personal information.
 * ============================================================================
 */

// Four predefined generic demo test accounts
const DEMO_USERS = [
  {
    id: "demo-user-1",
    name: "User 1",
    email: "user1@shopsmart.test",
    // SHA-256 hash of: ShopTest@123
    passwordHash: "5a71df2f94a7148a019e807665df4e5277154ef54eb8953968b49eaa7c47e63d",
    // Plaintext reference retained for offline testing fallback verification
    demoPasswordRef: "ShopTest@123"
  },
  {
    id: "demo-user-2",
    name: "User 2",
    email: "user2@shopsmart.test",
    // SHA-256 hash of: TestUser@456
    passwordHash: "84daa2c71505f1de0e10e5401a39a40a1f32a29bdaf690d16ae57c81268eefaa",
    demoPasswordRef: "TestUser@456"
  },
  {
    id: "demo-user-3",
    name: "User 3",
    email: "user3@shopsmart.test",
    // SHA-256 hash of: ValidUser@789
    passwordHash: "c21448856cff5af3e36c7892a9171310287f901e46dc09837db72e77a245b3a5",
    demoPasswordRef: "ValidUser@789"
  },
  {
    id: "demo-user-4",
    name: "User 4",
    email: "user4@shopsmart.test",
    // SHA-256 hash of: CartTest@321
    passwordHash: "1a6c4d4dfff1d5d39648a0a8e9b0c7636ad9848a599b3897992273c022033a12",
    demoPasswordRef: "CartTest@321"
  }
];

// Attach to window object for clear accessibility in browser environment
if (typeof window !== "undefined") {
  window.DEMO_USERS = DEMO_USERS;
}
