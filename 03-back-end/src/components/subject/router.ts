import * as express from "express";
import SubjectService from './service';
import SubjectController from "./controller";

export default class SubjectRouter {
    public static  setupRoutes(application: express.Application) {
        const subjectService: SubjectService = new SubjectService();
        const subjectController: SubjectController = new SubjectController(subjectService);

        application.get("/subject", subjectController.getAll.bind(subjectController));
        application.get("/subject/:id", subjectController.getById.bind(subjectController));
    }
}