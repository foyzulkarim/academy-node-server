
import { request } from "express";
import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: { type: String, index: true },
    phone: { type: String, index: true },
    email: { type: String, index: true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

export const StudentDocument = mongoose.model<IStudent>("Student", StudentSchema, "Students");

export interface IStudent extends mongoose.Document {
    name: string;
    phone: string;
    email: string;
    createdAt: Date;
    modifiedAt: Date;
}

export class StudentViewModel {
    constructor(s: IStudent) {
        this.id = s.id;
        this.name = s.name;
        this.phone = s.phone;
        this.email = s.email;
        this.createdAt = s.createdAt;
        this.modifiedAt = s.modifiedAt;
    }

    id!: string;
    name!: string;
    phone!: string;
    email!: string;
    createdAt!: Date;
    modifiedAt!: Date;
}

export class StudentRequestModel {
    id!: string;
    name!: string;
    phone!: string;
    email!: string;
    createdAt: Date | undefined;
    modifiedAt: Date | undefined;
}

const getAll = async (): Promise<IStudent[]> => {
    const students: IStudent[] = await StudentDocument.find().exec();
    return students;
}

const save = async (student: IStudent): Promise<any> => {
    const saved: IStudent = await student.save();
    return saved.phone;
}


export const getStudents = async (): Promise<StudentViewModel[]> => {
    const students = await getAll();
    const vms: StudentViewModel[] = students.map(student => new StudentViewModel(student));
    return vms;
}

export const saveStudent = async (payload: StudentRequestModel): Promise<string> => {
    let _id = new mongoose.Types.ObjectId();
    const l = {
        id: _id,
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        createdAt: new Date(),
        modifiedAt: new Date()
    };

    let s = new StudentDocument(l);
    const saved: IStudent = await s.save();
    return saved.id;
}

