import * as express from "express";
import SubjectService from './service';
import SubjectController from "./controller";
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from "../../common/IRouter.interface";
import AuthMiddleware from "../../middleware/auth.middleware";

export default class SubjectRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const subjectController: SubjectController = new SubjectController(resources);

        application.get("/subject", AuthMiddleware.getVerifier("user", "fakeAdmin"), subjectController.getAll.bind(subjectController));
        application.get("/subject/:id", AuthMiddleware.getVerifier("user", "fakeAdmin"), subjectController.getById.bind(subjectController));
        application.get("/subject/getSubjectsByProfessorId/:professorId", AuthMiddleware.getVerifier("user", "fakeAdmin"), subjectController.getSubjectsByProfessorId.bind(subjectController));
        application.get("/subject/getSubjectsByStudentId/:studentId", AuthMiddleware.getVerifier("user", "fakeAdmin"), subjectController.getSubjectsByStudentId.bind(subjectController));
        application.post("/subject", AuthMiddleware.getVerifier("fakeAdmin"), subjectController.add.bind(subjectController));
        application.put("/subject/:id", AuthMiddleware.getVerifier("fakeAdmin"), subjectController.edit.bind(subjectController));
        application.delete("/subject/:id", AuthMiddleware.getVerifier("fakeAdmin"), subjectController.deleteById.bind(subjectController));
    }
}