import { Application } from "express";
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";
import AuthMiddleware from "../../middleware/auth.middleware";
import MarkController from "./controller";

export default class MarkRouter implements IRouter {
    public setupRoutes(application: Application, resources: IApplicationResources) {
        const markController = new MarkController(resources);

        application.get("/mark", AuthMiddleware.getVerifier("user", "fakeAdmin"), markController.getAll.bind(markController));
        application.get("/mark/:id", AuthMiddleware.getVerifier("user", "fakeAdmin"), markController.getById.bind(markController));
        application.get("/mark/:studentId/subject/:subjectId/markType/:markType", AuthMiddleware.getVerifier("user", "fakeAdmin"), markController.getMarksByStudentBySubjectByMarkType.bind(markController));
        application.post("/mark", AuthMiddleware.getVerifier("user"), markController.add.bind(markController));
    }
}