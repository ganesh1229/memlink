const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");
const linkRoutes = require("./routes/link.routes");
const redirectRoutes = require("./routes/redirect.routes");
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/auth", authRoutes);
app.use("/test", testRoutes);
app.use("/links", linkRoutes);

//last of app.use
app.use("/", redirectRoutes);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MemLink API Running",
  });
});

module.exports = app;