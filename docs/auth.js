// ✅ Initialize Auth0 Client
const auth0 = new Auth0Client({
  domain: "dev-0xxzru015pu8i5d0.us.auth0.com",  // Replace with your Auth0 domain
  client_id: "R6UUnaSFBSUGYEIqOfPSHM94vrkigpQP", // Replace with your Auth0 client ID
  cacheLocation: "localstorage",
  authorizationParams: {
    redirect_uri: "https://kgroe01.github.io/TtT2/Login.html" // ✅ Must match Allowed Callback URL in Auth0
  }
});

// ✅ Function to Log In
async function login() {
  await auth0.loginWithRedirect();
}

// ✅ Function to Log Out
async function logout() {
  await auth0.logout({
    returnTo: "https://kgroe01.github.io/" // ✅ Ensure this matches Allowed Logout URLs in Auth0
  });
}

// ✅ Function to Check Authentication
async function checkAuth() {
  try {
    const query = window.location.search;

    // ✅ Handle Auth0 redirect callback after login
    if (query.includes("code=") || query.includes("error=")) {
      await auth0.handleRedirectCallback();
      window.history.replaceState({}, document.title, window.location.pathname); // Removes query params from URL
    }

    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
      document.getElementById("login").style.display = "none";
      document.getElementById("logout").style.display = "block";

      console.log("User is logged in");
    } else {
      console.log("User is NOT logged in");
    }
  } catch (error) {
    console.error("Authentication error:", error);
  }
}

// ✅ Run checkAuth() when the page loads
window.onload = checkAuth;
