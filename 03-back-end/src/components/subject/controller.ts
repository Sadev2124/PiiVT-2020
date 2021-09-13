import {Request, Response, NextFunction } from 'express';
import SubjectModel from './model';
import SubjectService from './service';
import IErrorResponse from '../../common/IErrorResponse.interface';

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

        const data: SubjectModel|null|IErrorResponse = await this.subjectService.getById(subjectId);

        if (data === null) {
            res.sendStatus(404);
            return;
        }

        if (data instanceof SubjectModel) {
            res.send(data);
            return;
        }

        res.status(500).send(data);
    }
}

export default SubjectController;