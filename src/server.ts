import express, { Application } from "express";
import router from "./controllers/routes";
import mongoose from "mongoose";

const setMongoConfig = async (): Promise<void> => {

    const uri = 'mongodb://localhost:27017/academy?readPreference=primary&ssl=false';

    var options: mongoose.ConnectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    };

    try {
        await mongoose.connect(uri, options);
        console.log("\nmongodb connection successful\n");
        mongoose.Promise = global.Promise;
    } catch (err) {
        console.log(err);
    }
}


const init = async (): Promise<void> => {
    let app = express();
    app.use(express.json());
    // app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    app.use('/api', router);

    app.use('/', (req, res) => {
        res.send(`Other request:\n${req.method} at \n` + new Date());
    });

    await setMongoConfig();
    await app.listen(3000);

    console.log('i am listening');
}

init();