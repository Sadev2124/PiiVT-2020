import IModel from "../common/IModel.interface";
import * as mysql2 from 'mysql2/promise';
import IErrorResponse from '../common/IErrorResponse.interface';
import IApplicationResources from "./IApplicationResources.interface";
import IServices from "./IServices.interface";

export default abstract class BaseService<ReturnModel extends IModel> {
    private resources: IApplicationResources;

    constructor(resources: IApplicationResources) {
        this.resources = resources;
    }

    protected get db(): mysql2.Connection {
        return this.resources.databaseConnection;
    }

    protected get services(): IServices {
        return this.resources.services;
    }

    protected abstract adaptModel(
        data: any,
    ): Promise<ReturnModel>;

    protected async getAllFromTable(tableName: string): Promise<ReturnModel[]|IErrorResponse> {
        return new Promise<ReturnModel[]|IErrorResponse>(async (resolve) => {

            const sql: string = `SELECT * FROM ${tableName};`;
            this.db.execute(sql)
                .then(async result => {
                    const rows = result[0];
                    const lista: ReturnModel[] = [];

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

    protected async getByIdFromTable(tableName: string, id: number): Promise<ReturnModel|null|IErrorResponse> {
        return new Promise<ReturnModel|null|IErrorResponse>(async resolve => {
            const sql: string = `SELECT * FROM ${tableName} WHERE ${tableName}_id = ?;`;
            this.db.execute(sql, [id])
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

    protected async getAllByFieldNameFromTable(tableName: string, fieldName: string, fieldValue: any): Promise<ReturnModel[]|IErrorResponse> {
        return new Promise<ReturnModel[]|IErrorResponse>(async (resolve) => {

            const sql: string = `SELECT * FROM ${tableName} WHERE ${fieldName} = ?;`;
            this.db.execute(sql, [fieldValue])
                .then(async result => {
                    const rows = result[0];
                    const lista: ReturnModel[] = [];

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
}