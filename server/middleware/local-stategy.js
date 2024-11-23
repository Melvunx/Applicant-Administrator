const passport = require("passport");
const bcrypt = require("bcrypt");
const { Strategy } = require("passport-local");
const authModel = require("../models/auth.models");

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await authModel.findOne({ username });

      if (!user) return done(null, false, { message: "Invalid username" });

      const isValidatePassword = await bcrypt.compare(password, user.password);
      if (!isValidatePassword)
        return done(null, false, { message: "Invalid password" });

      const loggedUser = await authModel.findOneAndUpdate(
        { username },
        {
          last_login: new Date(),
        },
        { new: true }
      );

      if (!loggedUser)
        return done(null, false, { message: "error to update login" });

      return done(null, loggedUser);
    } catch (error) {
      return done(error, false);
    }
  })
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await authModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
