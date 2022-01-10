import express from "express";
import userRouter from "./routes/user.route";
import teamRouter from "./routes/team.route";
import topicRouter from "./routes/topic.route";
import commentRouter from "./routes/comment.route";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

app.use("/team", teamRouter);

app.use("/topic", topicRouter);

app.use("/comment", commentRouter);

app.listen(port, () => {
  console.log(`server run on ${port}`);
});
