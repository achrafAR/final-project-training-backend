import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import db from './config/db.js';
import cors from "cors";
import errorHandler from './middleware/error.middleware.js';
import homeUiRoute from './routes/homeUi.route.js';
import pagesRoute from './routes/pages.route.js';
import popularRoute from './routes/popular.route.js';
import openingRoute from './routes/opening.route.js';
import activityDescriptionRoute from './routes/activityDescription.route.js';
import socialMediaRoute from './routes/socialMedia.route.js';
import videoDescriptionRoute from './routes/videoDescription.route.js';
import AboutUsMainRoute from './routes/aboutUsMain.route.js';
import featuresRoute from './routes/features.route.js';
import galleryHomePageRoute from './routes/galleryHomePage.route.js';
import generalGalleryRoute from './routes/generalGallery.route.js';
import AsiRiverRoute from './routes/asiRiver.route.js';
import RaftingFounderRoute from './routes/raftingFounder.route.js';
import welcomeRoute from './routes/welcome.route.js';
import AboutUsValueRoute from './routes/aboutUsValue.route.js';
import AboutUsMissionRoute from './routes/aboutUsMission.route.js';
import AboutUsTeamRoute from './routes/aboutUsTeam.route.js';
import AboutUsDescriptionRoute from './routes/aboutUsDescription.route.js';






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
app.use('/aboutUsMain',AboutUsMainRoute)
app.use('/features',featuresRoute)
app.use('/galleryHomePage',galleryHomePageRoute)
app.use('/generalGallery',generalGalleryRoute)
app.use('/asiRiver',AsiRiverRoute)
app.use('/raftingFounder',RaftingFounderRoute)
app.use('/welcome',welcomeRoute)
app.use('/aboutUsValue',AboutUsValueRoute)
app.use('/aboutUsMission',AboutUsMissionRoute)
app.use('/aboutUsTeam',AboutUsTeamRoute)
app.use('/aboutUsDescription',AboutUsDescriptionRoute)








app.use(errorHandler);

app.listen(port, () => {
console.log(`API IS RUNNING ON PORT: ${port}`);
});