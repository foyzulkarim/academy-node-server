import express, { Application } from "express";
import router from "./controllers/routes";


const init = (): Application => {
    let app = express();

    app.use('/api', router);

    app.use('/', (req, res) => {
        res.send(`Other request:\n${req.method} at \n` + new Date());
    });

    return app;
}

const app = init();
app.listen(3000, () => {
    console.log('i am listening');
});