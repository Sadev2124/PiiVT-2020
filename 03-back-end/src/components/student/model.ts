import IModel from "../../common/IModel.interface";

class StudentModel implements IModel {
    studentId: number;
    name: string;
    surname: string;
    jmbg: string;
    email: string;
    phoneNumber: string;
    postalAddress: string;
    userId: number;
}

export default StudentModel;