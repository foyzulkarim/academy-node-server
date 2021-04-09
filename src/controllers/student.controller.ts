import { IRoute } from "./routes";
import { Request, Response } from "express";


const getHandler = (req: Request, res: Response) => {
    res.send(`student \n${req.method} at \n` + new Date());
};

const postHandler = (req: Request, res: Response) => {
    res.send(`student\n${req.method} at \n` + new Date());
};

export const routes: IRoute[] = [
    {
        http: 'get',
        path: '/student',
        handler: getHandler
    },
    {
        http: 'post',
        path: '/student',
        handler: postHandler
    }
];

