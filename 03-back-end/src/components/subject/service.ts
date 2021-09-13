import SubjectModel from "./model";
import * as mysql2 from 'mysql2/promise';
import IErrorResponse from '../../common/IErrorResponse.interface';
import { IAddSubject } from "./dto/AddSubject";
import { Resolver } from "dns";
import BaseService from "../../services/BaseService";
import { IEditSubject } from "./dto/EditSubject";

class SubjectService extends BaseService<SubjectModel>{

    protected async adaptModel(row: any): Promise<SubjectModel>{
        const item: SubjectModel = new SubjectModel();

        item.subjectId = row?.subject_id;
        item.name = row?.name;

        return item;
    }

    public async getAll(): Promise<SubjectModel[]|IErrorResponse> {
        return await this.getAllFromTable("subject");
    }

    public async getById(subjectId: number): Promise<SubjectModel|null|IErrorResponse> {
        return await this.getByIdFromTable("subject", subjectId);
    }

    public async add(data: IAddSubject): Promise<SubjectModel|IErrorResponse> {
        return new Promise<SubjectModel|null|IErrorResponse>(async resolve => {
            const sql = `INSERT subject SET name = ?;`;

            this.db.execute(sql, [data.name])
                .then(async result =>{
                    //const [ insertInfo ] = result;
                    const insertInfo: any = result[0];

                    const newSubjectId: number = +(insertInfo?.insertId);
                    resolve(await this.getById(newSubjectId));
                })
                .catch(error => {
                    resolve({
                        errorCode: error?.errno,
                        errorMessage: error?.sqlMessage
                    })
                })
        });
    }

    public async edit(subjectId: number, data: IEditSubject): Promise<SubjectModel|null|IErrorResponse> {
        const result = await this.getById(subjectId);

        if (result === null) {
            return null;
        }

        if (!(result instanceof SubjectModel)) {
            return result;
        }

        return new Promise<SubjectModel|IErrorResponse>(async resolve => {
            const sql = `UPDATE subject SET name = ? WHERE subject_id = ?;`;

            this.db.execute(sql, [data.name, subjectId])
                .then(async result => {
                    resolve(await this.getById(subjectId));
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