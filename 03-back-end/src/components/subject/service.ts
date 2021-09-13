import SubjectModel from "./model";
import * as mysql2 from 'mysql2/promise';
import IErrorResponse from '../../common/IErrorResponse.interface';

class SubjectService{
    private db: mysql2.Connection;

    constructor(db: mysql2.Connection) {
        this.db = db;
    }

    protected async adaptModel(row: any): Promise<SubjectModel>{
        const item: SubjectModel = new SubjectModel();

        item.subjectId = row?.subject_id;
        item.name = row?.name;

        return item;
    }

    public async getAll(): Promise<SubjectModel[]|IErrorResponse> {
        return new Promise<SubjectModel[]|IErrorResponse>(async (resolve) => {

            const sql: string = "SELECT * FROM subject;";
            this.db.execute(sql)
                .then(async result => {
                    const rows = result[0];
                    const lista: SubjectModel[] = [];

                    if (Array.isArray(rows)) {
                        for (const row of rows) {
                            lista.push(await this.adaptModel(row))
                        }
                    }
        
                    resolve(lista);
                })
                .catch(error => {
                    resolve({
                        errorCode: error?.errno,
                        errorMessage: error?.sqlMessage
                    });
                });
        });
    }

    public async getById(subjectId: number): Promise<SubjectModel|null|IErrorResponse> {
        return new Promise<SubjectModel|null|IErrorResponse>(async resolve => {
            const sql: string = "SELECT * FROM subject WHERE subject_id = ?;";
            this.db.execute(sql, [subjectId])
                .then(async result => {
                    const [ rows, columns ] = result;
                    if (!Array.isArray(rows)) {
                        resolve (null);
                        return;
                    }
        
                    if (rows.length === 0) {
                        resolve (null);
                        return;
                    }
        
                    resolve(await this.adaptModel(
                        rows[0]
                    ));
                })
                .catch(error => {
                    resolve({
                        errorCode: error?.errno,
                        errorMessage: error?.sqlMessage
                    });
                });
        });
    }
}

export default SubjectService;