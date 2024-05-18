const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

dotenv.config();

const app = express();

app.use(bodyParser.json());

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

const UserRoutes = require("./routes/users");
const PostRoutes = require("./routes/posts");
const DormitoryRoutes = require("./routes/dormitories");
const CommentRoutes = require("./routes/comments");
const PermissionRoutes = require("./routes/permissions");
const UniversityRoutes = require("./routes/universities");
const FieldOfStudyRoutes = require("./routes/fieldOfStudy");
const LikeRoutes = require("./routes/likes");
const PostPostTypeRoutes = require("./routes/postPostTypes");
const PostTypeRoutes = require("./routes/postTypes");
const PrivateMessagesRoutes = require("./routes/privateMessages");
const ReportRoutes = require("./routes/reports");
const UserPrivateMessageRoutes = require("./routes/userPrivateMessages");

app.use("/users", UserRoutes);
app.use("/posts", PostRoutes);
app.use("/dormitories", DormitoryRoutes);
app.use("/comments", CommentRoutes);
app.use("/permissions", PermissionRoutes);
app.use("/universities", UniversityRoutes);
app.use("/fieldOfStudy", FieldOfStudyRoutes);
app.use("/likes", LikeRoutes);
app.use("/postPostTypes", PostPostTypeRoutes);
app.use("/postTypes", PostTypeRoutes);
app.use("/privateMessages", PrivateMessagesRoutes);
app.use("/reports", ReportRoutes);
app.use("/userPrivateMessages", UserPrivateMessageRoutes);

app.get('/', (req, res) => {
    res.send('Vítejte na naší API!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server běží na portu ${port}`);
});
