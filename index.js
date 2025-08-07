// معرفی و بارگذاری کتابخانه ها
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const swagger = require("./swagger");

const path = require("path");

// معرفی متغیرهای اصلی
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// معرفی کلاس های api و مسیر ها
// const auth = require("./routes/auth");
const users = require("./routes/userRoute");
const records = require("./routes/recordRoute");

// معرفی دیتابیس
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Polar")
  .then(() => console.log("Successfully connected to Polar MongoDB!"))
  .catch((err) => console.log(`Connection Error ${err}`));

app.use(express.static("views")); // فراخوانی فایل استاتیک در فولدر
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// معرفی پوشه عکس ها
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

const https_options = {
  /*      ca: fs.readFileSync("/home/admin/conf/web/api.foodbell.co.uk/ssl/api.foodbell.co.uk.ca"),
        key: fs.readFileSync("/home/admin/conf/web/api.foodbell.co.uk/ssl/api.foodbell.co.uk.key"),
        cert: fs.readFileSync("/home/admin/conf/web/api.foodbell.co.uk/ssl/api.foodbell.co.uk.crt"),    
     */
};

// Allow CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
const http = require("http").Server(app);
const https = require("https").Server(https_options, app);

// اتصال مسیر های و آدرس دهی آنها
app.use("/api-docs", swagger);
// app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/records", records);

// راه اندازی سرور روی پورت معرفی شده
const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`Listen on ${port}`);
});

https.listen(8000, () => {
  console.log(`Listen on ${8000}`);
});
