import { Application } from "express";
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";
import AuthMiddleware from "../../middleware/auth.middleware";
import StudentController from "./controller";

export default class StudentRouter implements IRouter {
    public setupRoutes(application: Application, resources: IApplicationResources) {
        const studentController = new StudentController(resources);

        application.get("/student", AuthMiddleware.getVerifier("user", "fakeAdmin"), studentController.getAll.bind(studentController));
        application.get("/student/:id", AuthMiddleware.getVerifier("user", "fakeAdmin"), studentController.getById.bind(studentController));
        application.get("/student/getAllStudentsBySubjectId/:id", AuthMiddleware.getVerifier("user", "fakeAdmin"), studentController.getAllStudentsBySubjectId.bind(studentController));
        application.post("/student", AuthMiddleware.getVerifier("fakeAdmin"), studentController.add.bind(studentController));
        application.put("/student/:id", AuthMiddleware.getVerifier("fakeAdmin"), studentController.edit.bind(studentController));
        application.delete("/student/:id", AuthMiddleware.getVerifier("fakeAdmin"), studentController.deleteById.bind(studentController));
    }
}