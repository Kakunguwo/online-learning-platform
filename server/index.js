import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import adminRouter from "./routes/adminRoute.js";
import courseRouter from "./routes/courseRoutes.js";
import instructorRouter from "./routes/instructorsRoutes.js";
import enrollmentRouter from "./routes/enrollmentRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOrigin = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOrigin));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/courses", courseRouter);
app.use("/api/instructors", instructorRouter);
app.use("/api/enrollment", enrollmentRouter);
app.use("/api/students", studentRoutes);


mongoose
  .connect("mongodb://127.0.0.1:27017/onlineLearningPlatformDB")
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log(err));

app.use(notFound);
app.use(errorHandler);

export const mongooseConnection = mongoose.connection;
