require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const appRouter = require('./routes/appRoutes');
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { configCloudinary } = require('./configs/cloudinaryConfig');
configCloudinary();

const passport = require('./configs/passportConfig');
app.use(passport.initialize());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use('/api', authRouter);
app.use('/api', appRouter);

const PORT = process.env.PORT || 3000;
// '0.0.0.0' host % 8080 POST required for railway deploy
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on port ${PORT}!`);
});
