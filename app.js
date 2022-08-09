"use strict";

/** Express app for evenbike. */
const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const tripRoutes = require("/routes/trip");

/**Third-party middleware */
app.use(cors());
app.use(morgan("tiny"));

/**Application-level middleware */
app.use(authenticateJWT);

/**Built-in middleware */
app.use(express.json());

/**Router-level middleware*/
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

/** Error-handling middleware */

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
