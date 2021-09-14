import * as express from "express";
import * as cors from "cors";
import Config from "./config/dev";
import SubjectRouter from './components/subject/router';
import * as mysql2 from "mysql2/promise";
import IApplicationResources from './common/IApplicationResources.interface';
import Router from "./router";
import SubjectService from './components/subject/service';
import UserService from './components/user/service';
import UserRouter from "./components/user/router";
import ProfessorService from './components/professor/service';
import ProfessorRouter from "./components/professor/router";

async function main() {
    const application: express.Application = express();

    application.use(cors());
    application.use(express.json());

    const resources: IApplicationResources = {
        databaseConnection: await mysql2.createConnection({
            host: Config.database.host,
            port: Config.database.port,
            user: Config.database.user,
            password: Config.database.password,
            database: Config.database.database,
            charset: Config.database.charset,
            timezone: Config.database.timezone,
            supportBigNumbers: true,
        }),
    }

    resources.databaseConnection.connect();

    resources.services = {
        subjectService: new SubjectService(resources),
        userService: new UserService(resources),
        professorService: new ProfessorService(resources),
    };

    application.use(
        Config.server.static.route,
        express.static(Config.server.static.path, {
            index: Config.server.static.index,
            cacheControl: Config.server.static.cacheControl,
            maxAge: Config.server.static.maxAge,
            etag: Config.server.static.etag,
            dotfiles: Config.server.static.dotfiles,
        })
    );

    Router.setupRoutes(application, resources, [
        new SubjectRouter(),
        new UserRouter(),
        new ProfessorRouter(),
    ]);

    application.use((req, res) => {
        res.sendStatus(404);
    });

    application.use((err, req, res, next) => {
        res.status(err.status).send(err.type);
    });

    application.listen(Config.server.port);
}

main();