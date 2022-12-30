if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './.env' });
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require("path");

const func = require('./functions/global');

const indexRouter = require('./routes/index');
const pwdGeneratorRouter = require('./routes/pwdGenerator');
const gamesRouter = require('./routes/games');

const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app config
app.use(func.logger);
app.use(express.static(path.join(__dirname, 'public')));

app.set('layout', 'layouts/layout');
app.use(expressLayouts);


// Routes
app.use('/', indexRouter);
app.use('/pwd', pwdGeneratorRouter);
app.use('/game', gamesRouter);

app.listen(process.env.PORT);