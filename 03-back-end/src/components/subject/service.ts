import SubjectModel from "./model";
import * as mysql2 from 'mysql2/promise';
import { isArrayBufferView } from "util/types";

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

    public async getAll(): Promise<SubjectModel[]> {
        const lista: SubjectModel[] = [];

        const sql: string = "SELECT * FROM subject;";
        const [ rows, columns ] = await this.db.execute(sql);

        if (Array.isArray(rows)) {
            for (const row of rows) {
                lista.push(await this.adaptModel(row));
            }
        }

        return lista;
    }

    public async getById(subjectId: number): Promise<SubjectModel|null> {
        const sql: string = "SELECT * FROM subject WHERE subject_id = ?;";
        const [ rows, columns ] = await this.db.execute(sql, [subjectId]);

        if (!Array.isArray(rows)) {
            return null;
        }

        if (rows.length === 0) {
            return null;
        }

        return await this.adaptModel(rows[0]);
    }
}

export default SubjectService;