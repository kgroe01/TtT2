const auth0 = new Auth0Client({
  domain: "dev-0xxzru015pu8i5d0.us.auth0.com",
  client_id: "R6UUnaSFBSUGYEIqOfPSHM94vrkigpQP",
  cacheLocation: "localstorage",
  authorizationParams: {
    redirect_uri: window.location.origin
  }
});

async function login() {
  await auth0.loginWithRedirect();
}

async function logout() {
  await auth0.logout({
    returnTo: window.location.origin
  });
}

async function checkAuth() {
  await auth0.handleRedirectCallback();
  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    const user = await auth0.getUser();
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "block";
    document.body.innerHTML += `<p>Welcome, ${user.name}!</p>`;
  }
}

window.onload = checkAuth;
