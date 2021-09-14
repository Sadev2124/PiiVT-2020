import IModel from "../../common/IModel.interface";

class ProfessorModel implements IModel {
    professorId: number;
    name: string;
    surname: string;
    userId: number;
}

export default ProfessorModel;