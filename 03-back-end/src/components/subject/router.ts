import * as express from "express";
import SubjectService from './service';
import SubjectController from "./controller";
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from "../../common/IRouter.interface";

export default class SubjectRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const subjectService: SubjectService = new SubjectService(resources.databaseConnection);
        const subjectController: SubjectController = new SubjectController(subjectService);

        application.get("/subject", subjectController.getAll.bind(subjectController));
        application.get("/subject/:id", subjectController.getById.bind(subjectController));
        application.post("/subject", subjectController.add.bind(subjectController));
    }
}