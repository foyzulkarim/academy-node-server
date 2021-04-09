import express, { Application, Request, Response } from "express";


export type Handler = (req: Request, res: Response) => void;

interface IRoute {
    http: string,
    path: string,
    handler: Handler,
}

const init = (): Application => {
    let app = express();

    let routes: IRoute[] = [
        {
            http: 'get',
            path: '/',
            handler: (req: Request, res: Response) => {
                res.send(`thanks for requesting!!!\n${req.method} at \n` + new Date());
            }
        },
        {
            http: 'get',
            path: '/dictionary',
            handler: (req: Request, res: Response) => {
                res.send(`it worked\n${req.method} at \n` + new Date());
            }
        }
    ];

    routes.forEach((route) => {
        (app as any)[route.http](route.path, route.handler);
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