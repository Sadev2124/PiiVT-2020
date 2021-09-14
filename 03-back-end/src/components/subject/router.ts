import * as express from "express";
import SubjectService from './service';
import SubjectController from "./controller";
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from "../../common/IRouter.interface";

export default class SubjectRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const subjectController: SubjectController = new SubjectController(resources);

        application.get("/subject", subjectController.getAll.bind(subjectController));
        application.get("/subject/:id", subjectController.getById.bind(subjectController));
        application.get("/subject/getSubjectsByProfessorId/:professorId", subjectController.getSubjectsByProfessorId.bind(subjectController));
        application.get("/subject/getSubjectsByStudentId/:studentId", subjectController.getSubjectsByStudentId.bind(subjectController));
        application.post("/subject", subjectController.add.bind(subjectController));
        application.put("/subject/:id", subjectController.edit.bind(subjectController));
        application.delete("/subject/:id", subjectController.deleteById.bind(subjectController));
    }
}