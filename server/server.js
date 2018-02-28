const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const passport = require('./strategies/sql.localstrategy');
const sessionConfig = require('./modules/session.config');

// Route includes
const indexRouter = require('./routes/index.router');
const userRouter = require('./routes/user.router');
const registerRouter = require('./routes/register.router');
const lyricRouter = require('./routes/lyric.router');
const songRouter = require('./routes/song.router');

const port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/lyric', lyricRouter);
app.use('/song', songRouter);

// Catch all bucket, must be last!
app.use('/', indexRouter);

// Listen //
app.listen(port, function(){
   console.log('thx for listening on channel:', port);
});
