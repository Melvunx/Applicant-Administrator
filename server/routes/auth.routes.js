const router = require("express").Router();
const { userRegister } = require("../controller/auth.controller");
const passport = require("../middleware/local-stategy");

router.post("/register", userRegister);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: "Server Error", error });
    } else if (!user) res.status(401).send({ message: info.message });

    req.logIn(user, (loginError) => {
      if (loginError)
        return res
          .status(500)
          .send({ message: "Server Error", error: loginError });

      res.cookie("userData", user, { maxAge: 6000 * 60 });
      const { username, email, lastname, last_login } = user;
      console.log(`User ${username} logged in !`);
      return res.status(200).json({
        message: "Login succesfully !",
        cookie: "Cookie send for 1 hour",
        data: { username, email, lastname, last_login },
      });
    });
  })(req, res, next);
});

module.exports = router;
