const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const morgan = require('morgan');
const logger = require('./logger');

dotenv.config();

const app = express();

// Nastavení EJS jako šablonovacího enginu
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Nastavení session
app.use(session({
    secret: 'tajne_heslo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Nastavte na true v produkčním prostředí s HTTPS
}));

// Použití morgan pro logování HTTP požadavků
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

const pool = require('./db');

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

// Přidání cesty pro hlavní stránku
const PostModel = require('./models/PostModel');
const postModel = new PostModel();

app.get('/', async (req, res) => {
    try {
        const posts = await postModel.getAllPosts();
        res.render('index', { user: req.session.user, posts });
    } catch (error) {
        logger.error(error.stack);
        res.status(500).json({ message: error.message });
    }
});

// Middleware pro zpracování chyb
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Něco se pokazilo!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger.info(`Server běží na portu ${port}`);
});
