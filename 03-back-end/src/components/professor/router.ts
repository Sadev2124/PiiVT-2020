import IApplicationResources from "../../common/IApplicationResources.interface";
import ProfessorController from "./controller";
import IRouter from '../../common/IRouter.interface';
import { Application } from 'express';
import AuthMiddleware from "../../middleware/auth.middleware";

export default class ProfessorRouter implements IRouter {
    public setupRoutes(application: Application, resources: IApplicationResources) {
        const professorController = new ProfessorController(resources);

        application.get("/professor", AuthMiddleware.getVerifier("user", "fakeAdmin"), professorController.getAll.bind(professorController));
        application.get("/professor/:id", AuthMiddleware.getVerifier("user", "fakeAdmin"), professorController.getById.bind(professorController));
        application.get("/professor/getProfessorByUserId/:userId", AuthMiddleware.getVerifier("user", "fakeAdmin"), professorController.getProfessorByUserId.bind(professorController));
        application.get("/professor/getProfessorBySubjectId/:subjectId", AuthMiddleware.getVerifier("user", "fakeAdmin"), professorController.getProfessorBySubjectId.bind(professorController));
        application.get("/professor/getProfessorsBySubjectName/:subjectName", AuthMiddleware.getVerifier("user", "fakeAdmin"), professorController.getProfessorsBySubjectName.bind(professorController));
        application.post("/professor", AuthMiddleware.getVerifier("fakeAdmin"), professorController.add.bind(professorController));
        application.put("/professor/:id", AuthMiddleware.getVerifier("fakeAdmin"), professorController.edit.bind(professorController));
        application.delete("/professor/:id", AuthMiddleware.getVerifier("fakeAdmin"), professorController.deleteById.bind(professorController));
    }
}