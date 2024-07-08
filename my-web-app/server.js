const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");

// Middleware to verify the time of the request
const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  if (day >= 1 && day <= 5 && hour >= 5 && hour <= 17) {
    next();
  } else {
    res.send(
      `<h1>Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).</h1>`
    );
  }
};

app.use(workingHoursMiddleware);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
