// ✅ Initialize Auth0 Client
const auth0 = new Auth0Client({
  domain: "dev-0xxzru015pu8i5d0.us.auth0.com",  // Replace with your domain
  client_id: "R6UUnaSFBSUGYEIqOfPSHM94vrkigpQP", // Replace with your client ID
  cacheLocation: "localstorage",
  authorizationParams: {
    redirect_uri: https://kgroe01.github.io/TtT2/Login.html, // ✅ Must match Allowed Callback URL in Auth0
    response_mode: "query"  // Ensures URL parameters are handled correctly
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

// ✅ Function to Check Authentication & Redirect if Needed
async function checkAuth() {
  try {
    const query = window.location.search;

    // ✅ Handle redirect callback before checking authentication
    if (query.includes("code=") || query.includes("error=")) {
      await auth0.handleRedirectCallback();
      window.history.replaceState({}, document.title, window.location.pathname); // Removes query params from URL
    }

    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
      const user = await auth0.getUser();
      console.log("User Info:", user); // ✅ Debugging - View user details in console

      document.getElementById("login").style.display = "none";
      document.getElementById("logout").style.display = "block";

      // ✅ Redirect users based on their email
      const userRedirects = {
        "kgroe@iastate.edu": "https://kgroe01.github.io/TtT2/Login.html",
        "testsub2001ttt@gmail.com": "https://kgroe01.github.io/TtT2/Modules.html",
      };

      // ✅ Redirect if the user’s email is in the list
      if (user.email in userRedirects) {
        window.location.href = userRedirects[user.email];
      } else {
        window.location.href = "https://kgroe01.github.io/TtT2/"; // Default page
      }
    }
  } catch (error) {
    console.error("Authentication error:", error);
  }
}

// ✅ Run `checkAuth()` when the page loads
window.onload = checkAuth;
