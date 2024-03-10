import express from "express";
import passport from "passport";

const router = express.Router();

// there is no form submission for Login so we are using GET method instead of POST method
router.get("/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/github/callback",
  passport.authenticate("github", {
    failureRedirect: process.env.CLIENT_BASE_URL + "/login",
  }),
  function (req, res) {
    // our home page = CLIENT_BASE_URL
    res.redirect(process.env.CLIENT_BASE_URL);
  }
);

// checks whether USER is authenticated or not
router.get("/check", (req, res) => {
    if (req.isAuthenticated()){
        res.send({ user: req.user });
    } else {
        res.send({ user: null });
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.json({ message: "Logged out" });
    });
});

export default router;
