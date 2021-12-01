const router = require("express").Router();
module.exports = router;

router.use("/google", require("./google"));
router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/stories", require("./stories"));
router.use("/functionality", require("./functionality"));
