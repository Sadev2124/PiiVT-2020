import { Application } from "express";
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";
import MarkController from "./controller";

export default class MarkRouter implements IRouter {
    public setupRoutes(application: Application, resources: IApplicationResources) {
        const markController = new MarkController(resources);

        application.get("/mark", markController.getAll.bind(markController));
        application.get("/mark/:id", markController.getById.bind(markController));
        application.get("/mark/:studentId/subject/:subjectId/markType/:markType", markController.getMarksByStudentBySubjectByMarkType.bind(markController));
        application.post("/mark", markController.add.bind(markController));
    }
}