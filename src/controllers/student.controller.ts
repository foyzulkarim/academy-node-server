import { IRoute } from "./routes";
import { Request, Response } from "express";
import * as service from "../services/student.service";

const getHandler = async (req: Request, res: Response) => {
    const models = await service.getGeneric<T>(Doc);
    res.send(models);
};

type T = service.Student;
const Doc = service.StudentDocument;

const postHandler = async (req: Request, res: Response) => {
    const id = await service.saveGenericModel<T>(req.body, Doc);
    res.send(`teacher id : \n${id}`);
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

