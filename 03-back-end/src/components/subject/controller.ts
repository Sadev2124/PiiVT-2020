import {Request, Response, NextFunction } from 'express';
import SubjectModel from './model';
import SubjectService from './service';
import IErrorResponse from '../../common/IErrorResponse.interface';
import { IAddSubject, IAddSubjectValidator } from './dto/AddSubject';
import { IEditSubject, IEditSubjectValidator } from './dto/EditSubject';

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

    async add(req: Request, res: Response, next: NextFunction) {
        const data = req.body;

        if (!IAddSubjectValidator(data)) {
            res.status(400).send(IAddSubjectValidator.errors);
            return;
        }

        const result = await this.subjectService.add(data as IAddSubject);

        res.send(result);
    }

    async edit(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;

        const subjectId: number = +id;

        if (subjectId <= 0) {
            res.status(400).send("Invalid ID number.");
            return;
        }

        const data = req.body;

        if (!IEditSubjectValidator(data)) {
            res.status(400).send(IEditSubjectValidator.errors);
            return;
        }

        const result = await this.subjectService.edit(subjectId, data as IEditSubject);

        if (result === null) {
            res.sendStatus(404);
            return;
        }

        res.send(result);
    }


    async deleteById(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;

        const subjectId: number = +id;

        if (subjectId <= 0) {
            res.status(400).send("Invalid ID number.");
            return;
        }

        res.send(await this.subjectService.delete(subjectId));
    }
}

export default SubjectController;