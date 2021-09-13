import {Request, Response, NextFunction } from 'express';
import SubjectModel from './model';
import SubjectService from './service';

class SubjectController {
    private subjectService: SubjectService;

    constructor(subjectService: SubjectService) {
        this.subjectService = subjectService;
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        const subjects = await this.subjectService.getAll();

        res.send(subjects);
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;

        const subjectId: number = +id;

        if (subjectId <= 0) {
            res.sendStatus(400);
            return;
        }

        const subject: SubjectModel|null = await this.subjectService.getById(subjectId);

        if (subject === null) {
            res.sendStatus(404);
            return;
        }

        res.send(subject);
    }
}

export default SubjectController;