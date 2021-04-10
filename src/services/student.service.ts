
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

export const StudentDocument: mongoose.Model<Student> = mongoose.model<Student>("Student", StudentSchema, "Students");

export interface Student extends mongoose.Document {
    name: string;
    phone: string;
    email: string;
    createdAt: Date;
    modifiedAt: Date;
}

const TeacherSchema = new Schema({
    name: { type: String, index: true },
    phone: { type: String, index: true },
    email: { type: String, index: true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

export const TeacherDocument: mongoose.Model<Teacher> = mongoose.model<Teacher>("Teacher", TeacherSchema, "Teachers");


export interface Teacher extends mongoose.Document {
    name: string;
    phone: string;
    email: string;
    createdAt: Date;
    modifiedAt: Date;
}

export class StudentViewModel {
    constructor(s: Student) {
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

const getAll = async (): Promise<Student[]> => {
    const students: Student[] = await StudentDocument.find().exec();
    return students;
}


export const getStudents = async (): Promise<StudentViewModel[]> => {
    const students = await getAll();
    const vms: StudentViewModel[] = students.map(student => new StudentViewModel(student));
    return vms;
}



// export const saveStudent = async (payload: StudentRequestModel): Promise<string> => {
//     const saved = await save<typeof StudentDocument>(StudentDocument, payload);
//     return saved.id;
// }



export const saveGenericModel = async <T extends mongoose.Document>(payload: T, db: mongoose.Model<T>): Promise<string> => {
    const saved = await save<typeof db>(db, payload);
    return saved.id;
}

async function save<T extends mongoose.Model<any>>(db: T, params: mongoose.Document) {
    let _id = new mongoose.Types.ObjectId();
    const model = {
        ...params,
        id: _id,
        createdAt: new Date(),
        modifiedAt: new Date()
    };

    const saved = await db.create(model);
    return saved;
}