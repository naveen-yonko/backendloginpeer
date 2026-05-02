require("dotenv").config();
const express        = require("express");
const cors           = require("cors");
const session        = require("express-session");
const passport       = require("passport");
const connectDB      = require("./config/db");
require("./config/passport");

const authRoutes   = require("./routes/auth");
const googleRoutes = require("./routes/google");

const app = express();
connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/auth", googleRoutes);

app.get("/", (req, res) => res.send("Auth API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));