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

    public async getById(subjectId: number): Promise<SubjectModel|null> {
        if (subjectId === 1 || subjectId === 2) {
            if (subjectId === 1) {
                return {
                    subjectId: 1,
                    name: "Matematika"
                };
            }

            if (subjectId === 2) {
                return {
                    subjectId: 2,
                    name: "Srpski"
                };
            } 
        } else {
            return null;
        }
    }
}

export default SubjectService;