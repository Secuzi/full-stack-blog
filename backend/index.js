import express from "express";
import connectDB from "./lib/mongodb.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connectDB();
});
