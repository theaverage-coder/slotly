const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


dotenv.config({ path: "./backend/.env" });
const port = process.env.PORT || 5000
//const { errorHandler } = require('./middleware/errorMiddleWare')

connectDB()

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log("request", req.method, req.originalUrl);
    next();
});
//app.use(express.json())
//app.use(express.urlencoded({ extended: false }))

// API routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/polls', require('./routes/pollRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));