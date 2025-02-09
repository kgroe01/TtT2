const auth0 = new Auth0Client({
  domain: "dev-0xxzru015pu8i5d0.us.auth0.com",
  client_id: "R6UUnaSFBSUGYEIqOfPSHM94vrkigpQP",
  cacheLocation: "localstorage",
  authorizationParams: {
    redirectUri: "https://kgroe01.github.io/TtT2/Login.html" // MUST MATCH Auth0 Allowed Callback URL
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

    // ✅ Handle redirect callback only if necessary
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

      // ✅ Redirect users to different pages based on their email
      const userRedirects = {
        "kgroe@iastate.edu": "https://kgroe01.github.io/TtT2/Login.html",
        "testsub2001ttt@gmail.com": "https://kgroe01.github.io/TtT2/Modules.html",
      };

      // ✅ Redirect to a specific page if the user's email is in the list
      if (user.email in userRedirects) {
        window.location.href = userRedirects[user.email];
      } else {
        window.location.href = "https://kgroe01.github.io/TtT2/"; // Default page if email is not listed
      }
    }
  } catch (error) {
    console.error("Authentication error:", error);
  }
}

// ✅ Run `checkAuth()` on page load
window.onload = checkAuth;
