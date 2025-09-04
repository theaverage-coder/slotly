const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


dotenv.config({ path: "./backend/.env" });
const port = process.env.PORT || 5000
//const { errorHandler } = require('./middleware/errorMiddleWare')

console.log('Mongo URI:', process.env.MONGO_URI);

connectDB()

const app = express();
app.use(express.json());
app.use(cors());


//app.use(express.json())
//app.use(express.urlencoded({ extended: false }))

//app.use(errorHandler)
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));