import express, { Application } from "express";

const init = (): Application => {
    let app = express();

    app.get('/', (req, res) => {
        res.send(`thanks for requesting\n${req.method} at \n` + new Date());
    })

    app.use('/', (req, res) => {
        res.send(`Other request:\n${req.method} at \n` + new Date());
    });

    return app;
}

const app = init();
app.listen(3000, () => {
    console.log('i am listening');
});