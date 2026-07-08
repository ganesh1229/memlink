require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;
console.log("BASE_URL:", process.env.BASE_URL);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});