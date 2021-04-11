import { IRoute } from "./routes";
import { Request, Response } from "express";
import * as service from "../services/student.service";

const getHandler = async (req: Request, res: Response) => {
    const students = await service.getAll(collection);
    res.send(students);
};

const collection = service.StudentDocument;

const postHandler = async (req: Request, res: Response) => {
    let savedId = await service.save(collection, req.body);
    res.send(`student\n${savedId} \n`);
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

