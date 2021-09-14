import BaseService from "../../common/BaseService";
import IErrorResponse from "../../common/IErrorResponse.interface";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import { IAddUser } from "./dto/IAddUser";
import { IEditUser } from "./dto/IEditUser";
import UserModel from "./model";
import * as bcrypt from "bcrypt";

class AdministratorModelAdapterOptions implements IModelAdapterOptions { }

class UserService extends BaseService<UserModel> {
    protected async adaptModel(
        data: any,
    ): Promise<UserModel> {
        const item = new UserModel();

        item.userId = +(data?.user_id);
        item.username = data?.username;
        item.passwordHash = data?.password_hash;

        return item;
    }

    public async getAll(): Promise<UserModel[]> {
        return await this.getAllFromTable("user") as UserModel[];
    }

    public async getById(userId: number): Promise<UserModel|null> {
        return await this.getByIdFromTable("user", userId) as UserModel|null;
    }

    public async add(data: IAddUser): Promise<UserModel|IErrorResponse> {
        return new Promise<UserModel|IErrorResponse>(async resolve => {
            const passwordHash = bcrypt.hashSync(data.password, 11);

            this.db.execute(
                `INSERT user SET username = ?, password_hash = ?;`,
                [
                    data.username,
                    passwordHash,
                ]
            )
            .then(async res => {
                const newUserId: number = +((res[0] as any)?.insertId);
                resolve(await this.getById(newUserId));
            })
            .catch(error => {
                resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage
                });
            })
        });
    }

    public async edit(userId: number, data: IEditUser): Promise<UserModel|IErrorResponse|null> {
        return new Promise<UserModel|IErrorResponse|null>(async resolve => {
            const currentUser = await this.getById(userId);

            if (currentUser === null) {
                return resolve(null);
            }

            const passwordHash = bcrypt.hashSync(data.password, 11);

            this.db.execute(
                `UPDATE user
                 SET password_hash = ?
                 WHERE user_id = ?;`,
                [
                    passwordHash,
                    userId,
                ]
            )
            .then(async () => {
                resolve(await this.getById(userId));
            })
            .catch(error => {
                resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage
                });
            })
        });
    }

    public async delete(userId: number): Promise<IErrorResponse> {
        return new Promise<IErrorResponse>(async resolve => {
            this.db.execute(
                `DELETE FROM user WHERE user_id = ?;`,
                [ userId, ]
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

    public async getUserByUsername(username: string): Promise<UserModel|null> {
        const users = await this.getAllByFieldNameFromTable("user", "username", username);

        if (!Array.isArray(users) || users.length === 0) {
            return null;
        }

        return users[0];
    }

    public async getIdByUsername(username: string): Promise<number|null> {
        const users = await this.getAllByFieldNameFromTable("user", "username", username);

        if (!Array.isArray(users) || users.length === 0) {
            return null;
        }

        return users[0].userId;
    }

    public async getPasswordById(userId: number): Promise<string|null> {
        const users = await this.getAllByFieldNameFromTable("user", "user_id", userId);

        if (!Array.isArray(users) || users.length === 0) {
            return null;
        }

        return users[0].passwordHash;
    }
}

export default UserService;