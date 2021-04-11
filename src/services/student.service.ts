import mongoose from "mongoose";
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    createdAt: { type: Date },
    modifiedAt: { type: Date }
});

export interface Student extends mongoose.Document {
    id: string;
    name: string;
    phone: string;
    email: string;
    createdAt: Date;
    modifiedAt: Date;
}

export const StudentDocument: mongoose.Model<Student> = mongoose.model<Student>("Student", StudentSchema, "Students");

export interface IStudentViewModel {
    id: string;
    name: string;
    phone: string;
    email: string;
}

export class StudentViewModel implements IStudentViewModel {
    id: string = '';
    name: string = '';
    phone: string = '';
    email: string = '';
}


export interface StudentRequestModel {
    id: string;
    name: string;
    phone: string;
    email: string;
}

export const convert = <T extends mongoose.Document>(model: T, vm: any): any => {
    const source = Object.create(model);
    const keys = Object.keys(vm);
    let viewModel = {} as any;
    keys.forEach((k) => {
        viewModel[k] = source[k];
    });

    return viewModel;
}

export const getAll = async <T extends mongoose.Document>(collection: mongoose.Model<T>, vm: any): Promise<any[]> => {
    const models = await collection.find().exec();
    const vms = models.map(model => convert<T>(model, vm));
    return vms;
}

export const save = async <T extends mongoose.Model<any>>(collection: T, payload: any): Promise<string> => {
    const obj = {
        ...payload,
        id: new mongoose.Types.ObjectId(),
        createdAt: new Date(),
        modifiedAt: new Date()
    };

    const savedObj = await collection.create(obj);
    return savedObj.id;
}