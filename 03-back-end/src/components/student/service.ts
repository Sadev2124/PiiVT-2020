import BaseService from "../../common/BaseService";
import IErrorResponse from "../../common/IErrorResponse.interface";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import { IAddStudent } from "./dto/IAddStudent";
import { IEditStudent } from "./dto/IEditStudent";
import StudentModel from "./model";

class StudentModelAdapterOptions implements IModelAdapterOptions { }

class StudentService extends BaseService<StudentModel> {
    protected async adaptModel(
        data: any,
    ): Promise<StudentModel> {
        const item = new StudentModel();

        item.studentId = +(data?.student_id);
        item.name = data?.name;
        item.surname = data?.surname;
        item.jmbg = data?.jmbg;
        item.email = data?.email;
        item.phoneNumber = data?.phone_number;
        item.postalAddress = data?.postal_address;
        item.userId = +(data?.user_Id);

        return item;
    }

    public async getAll(): Promise<StudentModel[]> {
        return await this.getAllFromTable("student") as StudentModel[];
    }

    public async getById(studentId: number): Promise<StudentModel|null> {
        return await this.getByIdFromTable("student", studentId) as StudentModel|null;
    }

    public async add(data: IAddStudent): Promise<StudentModel|IErrorResponse> {
        return new Promise<StudentModel|IErrorResponse>(async resolve => {
            this.db.execute(
                `INSERT student SET name = ?, surname = ?, jmbg = ?, email = ?,
                 phone_number = ?, postal_address = ?, user_id = ?;`,
                [
                    data.name,
                    data.surname,
                    data.jmbg,
                    data.email,
                    data.phoneNumber,
                    data.postalAddress,
                    data.userId,
                ]
            )
            .then(async res => {
                const newStudentId: number = +((res[0] as any)?.insertId);
                resolve(await this.getById(newStudentId));
            })
            .catch(error => {
                resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage
                });
            })
        });
    }

    public async edit(studentId: number, data: IEditStudent): Promise<StudentModel|IErrorResponse|null> {
        const result = await this.getById(studentId);

        if (result === null) {
            return null;
        }

        if (!(result instanceof StudentModel)) {
            return result;
        }

        return new Promise<StudentModel|IErrorResponse>(async resolve => {
            const sql = `UPDATE student SET email = ?, phone_number = ?, postal_address = ?
                         WHERE student_id = ?;`;

            this.db.execute(sql, [data.email, data.phoneNumber, data.postalAddress, studentId])
                .then(async result => {
                    resolve(await this.getById(studentId));
                })
                .catch(error => {
                    resolve({
                        errorCode: error?.errno,
                        errorMessage: error?.sqlMessage
                    });
                });
        });
    }

    public async delete(studentId: number): Promise<IErrorResponse> {
        return new Promise<IErrorResponse>(async resolve => {
            this.db.execute(
                `DELETE FROM student WHERE student_id = ?;`,
                [ studentId, ]
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

    public async getAllStudentsBySubjectId(subjectId: number): Promise<StudentModel[]|IErrorResponse|null> {
        const sql = `
            SELECT
                student_id
            FROM
                student_subject
            WHERE
                subject_id = ?;`;

            const [ rows ] = await this.db.execute(sql, [ subjectId ]);

            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }
        
            const items: StudentModel[] = [];
        
            for (const row of rows as any) {
                const value: any = row;
                const item: any = await this.getByIdFromTable("student", value.student_id) as StudentModel;
                items.push(item);
            }
        
            return items;
    }
}

export default StudentService;