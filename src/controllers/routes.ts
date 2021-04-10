import express, { Request, Response, Router } from "express";
import { routes as studentRoutes } from "./student.controller";
import { routes as teacherRoutes } from "./teacher.controller";

export type Handler = (req: Request, res: Response) => void;

export interface IRoute {
    http: string,
    path: string,
    handler: Handler,
}

const getHandler = (req: Request, res: Response) => {
    res.send(`\n${req.method} at \n` + new Date());
};
const healthHandler = (req: Request, res: Response) => {
    res.send(`service is up and running \n${req.method} at \n` + new Date());
};

const routes: IRoute[] = [
    {
        http: 'get',
        path: '/',
        handler: getHandler
    },
    {
        http: 'get',
        path: '/health',
        handler: healthHandler
    },
    ...studentRoutes,
    ...teacherRoutes
];


let router: Router = express.Router();

routes.forEach((route) => {
    (router as any)[route.http](route.path, route.handler);
})

export default router;