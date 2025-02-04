const auth0 = new Auth0Client({
  domain: "dev-0xxzru015pu8i5d0.us.auth0.com", // Your Auth0 domain
  client_id: "R6UUnaSFBSUGYEIqOfPSHM94vrkigpQP", // Your Auth0 client ID
  cacheLocation: "localstorage",
  authorizationParams: {
    redirect_uri: "https://kgroe01.github.io/Login.html" // Ensure this matches Allowed Callback URLs in Auth0
  }
});

async function login() {
  await auth0.loginWithRedirect();
}

async function logout() {
  await auth0.logout({
    returnTo: "https://kgroe01.github.io/"
  });
}

async function checkAuth() {
  try {
    const query = window.location.search;

    // ✅ Only handle redirect callback if there's an authentication response
    if (query.includes("code=") || query.includes("error=")) {
      await auth0.handleRedirectCallback();
      window.history.replaceState({}, document.title, window.location.pathname); // Removes query params from URL
    }

    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
      const user = await auth0.getUser();
      console.log("User Info:", user); // Debugging: View user details in console

      document.getElementById("login").style.display = "none";
      document.getElementById("logout").style.display = "block";

      // ✅ Redirect users based on their email
      if (user.email === "kgroe@iastate.edu" || user.email === "testsub2001ttt@gmail.com") {
        window.location.href = "https://r-graph-gallery.com/";
      } else {
        window.location.href = "index.html"; // Default page for non-matching users
      }
    }
  } catch (error) {
    console.error("Authentication error:", error);
  }
}

// ✅ Run `checkAuth()` on page load
window.onload = checkAuth;
