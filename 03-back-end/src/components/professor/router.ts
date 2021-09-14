import IApplicationResources from "../../common/IApplicationResources.interface";
import ProfessorController from "./controller";
import IRouter from '../../common/IRouter.interface';
import { Application } from 'express';

export default class ProfessorRouter implements IRouter {
    public setupRoutes(application: Application, resources: IApplicationResources) {
        const professorController = new ProfessorController(resources);

        application.get("/professor", professorController.getAll.bind(professorController));
        application.get("/professor/:id", professorController.getById.bind(professorController));
        application.get("/professor/getProfessorByUserId/:userId", professorController.getProfessorByUserId.bind(professorController));
        application.get("/professor/getProfessorBySubjectId/:subjectId", professorController.getProfessorBySubjectId.bind(professorController));
        application.get("/professor/getProfessorsBySubjectName/:subjectName", professorController.getProfessorsBySubjectName.bind(professorController));
        application.post("/professor", professorController.add.bind(professorController));
        application.put("/professor/:id", professorController.edit.bind(professorController));
        application.delete("/professor/:id", professorController.deleteById.bind(professorController));
    }
}