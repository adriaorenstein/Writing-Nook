const router = require("express").Router();
module.exports = router;

router.get("/me", async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    console.log("no user logged in in api/auth");
  }

  router.post("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    console.log("session destroyed");
    res.redirect("/home");
  });
});
