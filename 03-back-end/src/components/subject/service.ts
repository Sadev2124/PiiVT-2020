import SubjectModel from "./model";
import * as mysql2 from 'mysql2/promise';
import IErrorResponse from '../../common/IErrorResponse.interface';
import { IAddSubject } from "./dto/AddSubject";
import { Resolver } from "dns";
import BaseService from "../../services/BaseService";
import { IEditSubject } from "./dto/EditSubject";
import IModelAdapterOptions from '../../common/IModelAdapterOptions.interface';

class SubjectModelAdapterOptions implements IModelAdapterOptions{}

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

    public async delete(subjectId: number): Promise<IErrorResponse> {
        return new Promise<IErrorResponse>(resolve => {
            const sql = "DELETE FROM subject WHERE subject_id = ?;";
            this.db.execute(sql, [subjectId])
                .then(async result => {
                    const deleteInfo: any = result[0];
                    const deletedRowCount: number = +(deleteInfo.affectedRows);

                    if (deletedRowCount === 1) {
                        resolve({
                            errorCode: 0,
                            errorMessage: "Subject deleted."
                        });
                    }

                    else {
                        resolve({
                            errorCode: -1,
                            errorMessage: "This record could not be deleted because it does not exist."
                        });
                    }
                })
                .catch(error => {
                    if (error?.errno === 1451) {
                        resolve({
                            errorCode: -2,
                            errorMessage: "Can't delete a parent record."
                        });
                        return;
                    }

                    resolve({
                        errorCode: error?.errno,
                        errorMessage: error?.sqlMessage
                    });
                })
        });
    }
}

export default SubjectService;