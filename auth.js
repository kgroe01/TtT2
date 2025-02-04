// Initialize Auth0 client
let auth0Client = null;

async function initializeAuth() {
    auth0Client = await createAuth0Client({
        domain: dev-0xxzru015pu8i5d0.us.auth0.com,
        client_id: R6UUnaSFBSUGYEIqOfPSHM94vrkigpQP,
        redirect_uri: window.location.origin
    });
    checkAuth();
}

// Function to log in
async function login() {
    await auth0Client.loginWithRedirect();
}

// Function to log out
async function logout() {
    await auth0Client.logout({ returnTo: window.location.origin });
}

// Function to check if user is logged in and redirect them
async function checkAuth() {
    const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
        const user = await auth0Client.getUser();
        
        console.log("User:", user);

        // Redirect only if it's a teacher's email
        const allowedEmails = ["kgroe@iastate.edu", "teacher2@example.com"];
        if (allowedEmails.includes(user.email)) {
            window.location.href = "Modules.html";
        } else {
            alert("You are not authorized to access the training modules.");
            logout();
        }
    }
}

// Handle login redirect callback
async function handleAuthCallback() {
    await auth0Client.handleRedirectCallback();
    checkAuth();
}

// Initialize authentication on page load
window.onload = initializeAuth;
