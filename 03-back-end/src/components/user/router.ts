import { Application } from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';
import UserController from './controller';

export default class UserRouter implements IRouter {
    public setupRoutes(application: Application, resources: IApplicationResources) {
        const userController = new UserController(resources);

        application.get("/user", userController.getAll.bind(userController));
        application.get("/user/:id", userController.getById.bind(userController));
        application.get("/user/userByUsername/:username", userController.getUserByUsername.bind(userController));
        application.get("/user/IdByUsername/:username", userController.getIdByUsername.bind(userController));
        application.get("/user/passwordById/:id", userController.getPasswordById.bind(userController));
        application.post("/user", userController.add.bind(userController));
        application.put("/user/:id", userController.edit.bind(userController));
        application.delete("/user/:id", userController.delete.bind(userController));
    }
}