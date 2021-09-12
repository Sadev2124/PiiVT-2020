import SubjectModel from "./model";

class SubjectService{
    public async getAll(): Promise<SubjectModel[]> {
        const lista: SubjectModel[] = [];

        lista.push({
            subjectId: 1,
            name: "Matematika"
        });

        lista.push({
            subjectId: 2,
            name: "Srpski"
        });

        return lista;
    }
}

export default SubjectService;