const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const morgan = require('morgan');
const methodOverride = require('method-override'); // Přidání method-override
const { createLogger, transports, format } = require('winston');
const pool = require('./db'); // Import poolu z db.js

dotenv.config();

const app = express();

// Nastavení EJS jako šablonovacího enginu
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method')); // Použití method-override

// Nastavení session
app.use(session({
    secret: 'tajne_heslo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Nastavte na true v produkčním prostředí s HTTPS
}));

// Logger
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'combined.log' })
    ]
});

app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Import routerů
const UserRoutes = require('./routes/users');
const PostRoutes = require('./routes/posts');
const DormitoryRoutes = require('./routes/dormitories');
const CommentRoutes = require('./routes/comments');
const PermissionRoutes = require('./routes/permissions');
const UniversityRoutes = require('./routes/universities');
const FieldOfStudyRoutes = require('./routes/fieldOfStudy');
const LikeRoutes = require('./routes/likes');
const PostPostTypeRoutes = require('./routes/postPostTypes');
const PostTypeRoutes = require('./routes/postTypes');
const PrivateMessagesRoutes = require('./routes/privateMessages');
const ReportRoutes = require('./routes/reports');
const UserPrivateMessageRoutes = require('./routes/userPrivateMessages');
const AuthRoutes = require('./routes/auth');

// Použití routerů
app.use('/users', UserRoutes);
app.use('/posts', PostRoutes);
app.use('/dormitories', DormitoryRoutes);
app.use('/comments', CommentRoutes);
app.use('/permissions', PermissionRoutes);
app.use('/universities', UniversityRoutes);
app.use('/fieldsOfStudy', FieldOfStudyRoutes);
app.use('/likes', LikeRoutes);
app.use('/postPostTypes', PostPostTypeRoutes);
app.use('/postTypes', PostTypeRoutes);
app.use('/privateMessages', PrivateMessagesRoutes);
app.use('/reports', ReportRoutes);
app.use('/userPrivateMessages', UserPrivateMessageRoutes);
app.use('/auth', AuthRoutes);

// Domovská stránka
const PostModel = require('./models/PostModel');
const postModel = new PostModel(pool);

app.get('/', async (req, res) => {
    try {
        const posts = await postModel.getAllPosts();
        res.render('index', { user: req.session.user, posts });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger.info(`Server běží na portu ${port}`);
});

module.exports = pool;
