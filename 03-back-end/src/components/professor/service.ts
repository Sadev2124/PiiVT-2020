import BaseService from "../../common/BaseService";
import IErrorResponse from "../../common/IErrorResponse.interface";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import { IEditUser } from "../user/dto/IEditUser";
import UserModel from "../user/model";
import { IAddProfessor } from "./dto/IAddProfessor";
import { IEditProfessor } from "./dto/IEditProfessor";
import ProfessorModel from "./model";

class ProfessorModelAdapterOptions implements IModelAdapterOptions { }

class ProfessorService extends BaseService<ProfessorModel> {
    protected async adaptModel(
        data: any,
    ): Promise<ProfessorModel> {
        const item = new ProfessorModel();

        item.professorId = +(data?.professor_id);
        item.name = data?.name;
        item.surname = data?.surname;
        item.userId = +(data?.user_Id);

        return item;
    }

    public async getAll(): Promise<ProfessorModel[]> {
        return await this.getAllFromTable("professor") as ProfessorModel[];
    }

    public async getById(professorId: number): Promise<ProfessorModel|null> {
        return await this.getByIdFromTable("professor", professorId) as ProfessorModel|null;
    }

    public async add(data: IAddProfessor): Promise<ProfessorModel|IErrorResponse> {
        return new Promise<ProfessorModel|IErrorResponse>(async resolve => {
            this.db.execute(
                `INSERT professor SET name = ?, surname = ?;`,
                [
                    data.name,
                    data.surname,
                ]
            )
            .then(async res => {
                const newProfessorId: number = +((res[0] as any)?.insertId);
                resolve(await this.getById(newProfessorId));
            })
            .catch(error => {
                resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage
                });
            })
        });
    }

    public async edit(professorId: number, data: IEditProfessor): Promise<ProfessorModel|IErrorResponse|null> {
        const result = await this.getById(professorId);

        if (result === null) {
            return null;
        }

        if (!(result instanceof ProfessorModel)) {
            return result;
        }

        return new Promise<ProfessorModel|IErrorResponse>(async resolve => {
            const sql = `UPDATE professor SET name = ?, surname = ? WHERE professor_id = ?;`;

            this.db.execute(sql, [data.name, data.surname, professorId])
                .then(async result => {
                    resolve(await this.getById(professorId));
                })
                .catch(error => {
                    resolve({
                        errorCode: error?.errno,
                        errorMessage: error?.sqlMessage
                    });
                });
        });
    }

    public async delete(professorId: number): Promise<IErrorResponse> {
        return new Promise<IErrorResponse>(async resolve => {
            this.db.execute(
                `DELETE FROM professor WHERE professor_id = ?;`,
                [ professorId, ]
            )
            .then(res => {
                resolve({
                    errorCode: 0,
                    errorMessage: `Deleted ${(res as any[])[0]?.affectedRows} records.`
                });
            })
            .catch(error => {
                resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage
                });
            });
        });
    }

    public async getProfessorByUserId(userId: number): Promise<ProfessorModel|null> {
        const professors = await this.getAllByFieldNameFromTable("professor", "user_id", userId);

        if (!Array.isArray(professors) || professors.length === 0) {
            return null;
        }

        return professors[0];
    }

    public async getProfessorBySubjectId(subjectId: number): Promise<ProfessorModel|null> {
        const sql = `SELECT professor_id FROM professor_subject WHERE subject_id = ?;`;
        const [ rows ] = await this.db.execute(sql, [ subjectId ]);

        if (!Array.isArray(rows) || rows.length === 0) {
            return null;
        }

        const data: any = rows[0];

        const professorId = +(data?.professor_id);

        return await this.getByIdFromTable("professor", professorId) as ProfessorModel|null;
    }
    
    public async getProfessorsBySubjectName(subjectName: string): Promise<ProfessorModel|null> {
        const sql = `
            SELECT
                professor_id
            FROM
                professor_subject
            INNER JOIN subject ON subject.subject_id = professor_subject.subject_id
            WHERE
                subject.name = ?;`;
        const [ rows ] = await this.db.execute(sql, [ subjectName ]);

        if (!Array.isArray(rows) || rows.length === 0) {
            return null;
        }

        const data: any = rows[0];

        const professorId = +(data?.professor_id);

        return await this.getByIdFromTable("professor", professorId) as ProfessorModel|null;
    }
}

export default ProfessorService;