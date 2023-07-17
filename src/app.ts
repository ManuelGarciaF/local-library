import createError from 'http-errors';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import indexRouter from './routes/index';
import catalogRouter from './routes/catalog';

const app = express();

// Set up mongoose connection
dotenv.config();
mongoose.set('strictQuery', false);
const mongoURL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.e902pw3.mongodb.net/local_library?retryWrites=true&w=majority`;

async function main() {
    await mongoose.connect(mongoURL);
}
main().catch((err) => console.log(err));

// view engine setup
app.set('views', path.resolve(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/catalog', catalogRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
    next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.message);
});

export default app;
