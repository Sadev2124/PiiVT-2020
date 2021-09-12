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
}

export default SubjectController;