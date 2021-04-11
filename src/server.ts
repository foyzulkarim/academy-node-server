import express, { Application } from "express";
import router from "./controllers/routes";
import mongoose from "mongoose";


const setupMongo = async () => {
    const uri = 'mongodb://localhost:27017/academy?readPreference=primary&ssl=false';
    const options: mongoose.ConnectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    };

    try {
        await mongoose.connect(uri, options);
        console.log('mongodb connection established');
        mongoose.Promise = global.Promise;
    } catch (error) {
        console.log(error);
    }
}


const init = async (): Promise<void> => {
    let app = express();
    app.use(express.json());

    app.use('/api', router);
    app.use('/', (req, res) => {
        res.send(`Other request:\n${req.method} at \n` + new Date());
    });

    await setupMongo();
    await app.listen(3000);
    console.log('i am listening on port 3000');
}

init();