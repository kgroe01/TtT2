let auth0Client = null;

async function initializeAuth() {
    auth0Client = await createAuth0Client({
        domain: dev-0xxzru015pu8i5d0.us.auth0.com,
        client_id: R6UUnaSFBSUGYEIqOfPSHM94vrkigpQP,
        redirect_uri: window.location.origin
    });

    console.log("Auth0 initialized");
    checkAuth();
}

// Login function
async function login() {
    console.log("Login button clicked");
    await auth0Client.loginWithRedirect();
}

// Logout function
async function logout() {
    console.log("Logout button clicked");
    await auth0Client.logout({ returnTo: window.location.origin });
}

// Check if user is logged in and restrict access
async function checkAuth() {
    const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
        const user = await auth0Client.getUser();
        console.log("User authenticated:", user);

        // Allowed teacher emails
        const allowedEmails = ["teacher1@example.com", "teacher2@example.com"];

        if (allowedEmails.includes(user.email)) {
            window.location.href = "Modules.html";
        } else {
            alert("You are not authorized to access the training modules.");
            logout();
        }
    }
}

// Handle login redirect
async function handleAuthCallback() {
    await auth0Client.handleRedirectCallback();
    checkAuth();
}

// Initialize authentication when page loads
window.onload = initializeAuth;
