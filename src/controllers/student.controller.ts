import { IRoute } from "./routes";
import { Request, Response } from "express";
import * as service from "../services/student.service";

const getHandler = async (req: Request, res: Response) => {
    const students = await service.getStudents();
    res.send(students);
};

const postHandler = async (req: Request, res: Response) => {
    const id = await service.saveGenericModel<service.StudentRequestModel, service.Student>(req.body as service.StudentRequestModel, service.StudentDocument);    
    res.send(`student id : \n${id}`);
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

