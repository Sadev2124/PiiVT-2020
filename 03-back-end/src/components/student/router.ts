import { Application } from "express";
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";
import StudentController from "./controller";

export default class StudentRouter implements IRouter {
    public setupRoutes(application: Application, resources: IApplicationResources) {
        const studentController = new StudentController(resources);

        application.get("/student", studentController.getAll.bind(studentController));
        application.get("/student/:id", studentController.getById.bind(studentController));
        application.get("/student/getAllStudentsBySubjectId/:id", studentController.getAllStudentsBySubjectId.bind(studentController));
        application.post("/student", studentController.add.bind(studentController));
        application.put("/student/:id", studentController.edit.bind(studentController));
        application.delete("/student/:id", studentController.deleteById.bind(studentController));
    }
}