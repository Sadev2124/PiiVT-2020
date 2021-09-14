import IModel from "../../common/IModel.interface";

type markType = 'first_trimester' | 'second_trimester' | 'semester_mark' | 'final_mark';

class MarkModel implements IModel {
    markId: number;
    mark: number;
    markType: markType;
    description: string | null;
    professorId: number;
    studentId: number;
    subjectId: number;
}

export default MarkModel;