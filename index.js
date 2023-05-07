import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import db from './config/db.js';
import cors from "cors";
import errorHandler from './middleware/error.middleware.js';
import homeUiRoute from './routes/homeUi.route.js';
import pagesRoute from './routes/pages.route.js'
import popularRoute from './routes/popular.route.js'
import openingRoute from './routes/opening.route.js'
import activityDescriptionRoute from './routes/activityDescription.route.js';
import socialMediaRoute from './routes/socialMedia.route.js';
import videoDescriptionRoute from './routes/videoDescription.route.js';
import AboutUsRoute from './routes/aboutUs.route.js';




const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};


dotenv.config();


const port = process.env.PORT || 5000;



await db();

const app = new express();
app.use(cors(corsOptions));

app.use(express.json());
app.use(
bodyParser.urlencoded({
    extended: true,
})
);

//Routes
app.get('/', (req, res) => {
res.send('hello world');
});

app.use('/homeUi',homeUiRoute)
app.use('/pages',pagesRoute)
app.use('/popular',popularRoute)
app.use('/opening',openingRoute)
app.use('/activityDescription',activityDescriptionRoute)
app.use('/socialMedia',socialMediaRoute)
app.use('/videoDescription',videoDescriptionRoute)
app.use('/aboutUs',AboutUsRoute)





app.use(errorHandler);

app.listen(port, () => {
console.log(`API IS RUNNING ON PORT: ${port}`);
});