const { userLogout } = require("../controller/auth.controller");
const { getUser } = require("../controller/user.controller");
const { userAuthentification } = require("../middleware/auth.middleware");

const router = require("express").Router();

router.get("/", userAuthentification, getUser);
router.post("/logout", userAuthentification, userLogout);

module.exports = router;
