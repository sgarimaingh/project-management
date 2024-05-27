require('dotenv').config();
const express = require('express');
const session = require('express-session');
const sequelize = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./config/logger');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const passport = require('./config/passport');


const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);

app.use(errorHandler);

// session handling
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


sequelize.sync().then(() => {
  app.listen(3000, () => {
    logger.info('Server started on port 3000');
  });
});
