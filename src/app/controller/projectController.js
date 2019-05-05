const express = require("express");
const router = express.Router();

const middleware = require("../middlewares/auth");

router.use(middleware);

router.get("", (req, res) => {
  res.send({ ok: true, user: req.userId });
});

module.exports = app => app.use("/projects", router);
