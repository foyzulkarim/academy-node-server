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

export const StudentDocument : mongoose.Model<Student>  = mongoose.model<Student>("Student", StudentSchema, "Students");

export interface StudentViewModel {
    id: string;
    name: string;
    phone: string;
    email: string;
}

const convert = (model: Student): StudentViewModel => {
    let vm: StudentViewModel = {
        ...JSON.parse(JSON.stringify(model))
    };

    return vm;
}

export interface StudentRequestModel {
    id: string;
    name: string;
    phone: string;
    email: string;
}

export const getAll = async <T extends mongoose.Document>(collection: mongoose.Model<T>): Promise<T[]> => {
    const models = await collection.find().exec();
    return models;
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