import * as express from "express";
import * as cors from "cors";
import Config from "./config/dev";
import SubjectService from './components/subject/service';
import SubjectController from "./components/subject/controller";

const application: express.Application = express();

application.use(cors());
application.use(express.json());

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

const subjectService: SubjectService = new SubjectService();
const subjectController: SubjectController = new SubjectController(subjectService);

application.get("/subject", subjectController.getAll.bind(subjectController));
application.get("/subject/:id", subjectController.getById.bind(subjectController));

application.use((req, res) => {
    res.sendStatus(404);
});

application.listen(Config.server.port);