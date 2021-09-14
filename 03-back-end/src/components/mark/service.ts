import BaseService from "../../common/BaseService";
import IErrorResponse from "../../common/IErrorResponse.interface";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import { IAddMark } from "./dto/IAddMark";
import MarkModel from "./model";

class MarkModelAdapterOptions implements IModelAdapterOptions { }

class MarkService extends BaseService<MarkModel> {
    protected async adaptModel(
        data: any,
    ): Promise<MarkModel> {
        const item = new MarkModel();

        item.markId = +(data?.mark_id);
        item.mark = data?.mark;
        item.markType = data?.type;
        item.description = data?.description;
        item.professorId = data?.professor_id;
        item.studentId = data?.student_id;
        item.subjectId = data?.subject_id;

        return item;
    }

    public async getAll(): Promise<MarkModel[]> {
        return await this.getAllFromTable("mark") as MarkModel[];
    }

    public async getById(markId: number): Promise<MarkModel|null> {
        return await this.getByIdFromTable("mark", markId) as MarkModel|null;
    }

    public async add(data: IAddMark): Promise<MarkModel|IErrorResponse> {
        return new Promise<MarkModel|IErrorResponse>(async resolve => {
            this.db.execute(
                `INSERT mark SET mark = ?, type = ?, 
                 description = ?, professor_id = ?, 
                 student_id = ?, subject_id = ?;`,
                [
                    data.mark,
                    data.markType,
                    data.description,
                    data.professorId,
                    data.studentId,
                    data.subjectId
                ]
            )
            .then(async res => {
                const newMarkId: number = +((res[0] as any)?.insertId);
                resolve(await this.getById(newMarkId));
            })
            .catch(error => {
                resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage
                });
            })
        });
    }

    public async getMarksByStudentBySubjectByMarkType(studentId: number, subjectId: number, markType: string): Promise<MarkModel[]|IErrorResponse> {
        console.log(studentId + "----" + subjectId + "----" + markType);
        const sql = `
            SELECT
                mark_id
            FROM
                mark
            WHERE
                student_id = ?
            AND
                subject_id = ?
            AND
                type = ?;`;
                
        const [ rows ] = await this.db.execute(sql, [ studentId, subjectId, markType ]);

        if (!Array.isArray(rows) || rows.length === 0) {
            return null;
        }

        const items: MarkModel[] = [];

        for (const row of rows as any) {
            const value: any = row;
            const item: any = await this.getByIdFromTable("mark", value.mark_id) as MarkModel;
            items.push(item);
        }

        return items;
    }
}

export default MarkService;