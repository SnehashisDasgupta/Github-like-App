// Simple route middleware to ensure user is authenticated.
// If the request is authenticated (typically via a persistent login session), the request will proceed.  
// Otherwise, the user will be redirected to the login page.
export async function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { 
        return next(); 
    }
    res.redirect( process.env.CLIENT_BASR_URL+'/login' );
}