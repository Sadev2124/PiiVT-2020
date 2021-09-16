import api from '../api/api';
import EventRegister from '../api/EventRegister';
import { ApiRole } from '../api/api';

export default class StudentService {
    public static getStudentIdByUsername(username: string, role: ApiRole = "user"): Promise<number> {
        return new Promise<number>(resolve => {
            api("get", "/user/IdByUsername/" + username, role)
            .then(res => {
                if (res?.status !== "ok") {
                    if (res.status === "login") {
                        EventRegister.emit("AUTH_EVENT", "force_login");
                    }
                    
                }
                resolve(res.data.users);
            });
        });
    }

    public static getStudentIdByUserId(userId: number, role: ApiRole = "user"): Promise<number> {
        return new Promise<number>(resolve => {
            api("get", "/student/getStudentIdByUserId/" + userId, role)
            .then(res => {
                if (res?.status !== "ok") {
                    if (res.status === "login") {
                        EventRegister.emit("AUTH_EVENT", "force_login");
                    }
                    
                }
                resolve(res.data);
            });
        });
    }
}
