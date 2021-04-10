import { IRoute } from "./routes";
import { Request, Response } from "express";
import * as service from "../services/student.service";

const getHandler = async (req: Request, res: Response) => {
    const students = await service.getStudents();
    res.send(students);
};

type T = service.Teacher;
const Doc = service.TeacherDocument;

const postHandler = async (req: Request, res: Response) => {
    const id = await service.saveGenericModel<T>(req.body, Doc);
    res.send(`teacher id : \n${id}`);
};

export const routes: IRoute[] = [
    {
        http: 'get',
        path: '/teacher',
        handler: getHandler
    },
    {
        http: 'post',
        path: '/teacher',
        handler: postHandler
    }
];

