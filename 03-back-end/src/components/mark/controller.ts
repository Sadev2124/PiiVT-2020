import {Request, Response, NextFunction } from 'express';
import BaseController from '../../common/BaseController';
import IErrorResponse from '../../common/IErrorResponse.interface';
import { IAddMark, IAddMarkValidator } from './dto/IAddMark';
import MarkModel from './model';

class MarkController extends BaseController{
    async getAll(req: Request, res: Response, next: NextFunction) {
        const marks = await this.services.markService.getAll();

        res.send(marks);
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;

        const markId: number = +id;

        if (markId <= 0) {
            res.status(400).send("Invalid ID number.");
            return;
        }

        const data: MarkModel|null|IErrorResponse = await this.services.markService.getById(markId);

        if (data === null) {
            res.sendStatus(404);
            return;
        }

        if (data instanceof MarkModel) {
            res.send(data);
            return;
        }

        res.status(500).send(data);
    }

    async add(req: Request, res: Response, next: NextFunction) {
        const data = req.body;

        if (!IAddMarkValidator(data)) {
            res.status(400).send(IAddMarkValidator.errors);
            return;
        }

        const result = await this.services.markService.add(data as IAddMark);

        res.send(result);
    }

    async getMarksByStudentBySubjectByMarkType(req: Request, res: Response, next: NextFunction) {
        const studentId: string = req.params.studentId;
        const subjectId: string = req.params.subjectId;
        const markType: string = req.params.markType;

        const studentIdNum: number = +studentId;
        const subjectIdNum: number = +subjectId;

        if (studentIdNum <= 0 || subjectIdNum <= 0) {
            res.status(400).send("Invalid ID number.");
            return;
        }

        const result = await this.services.markService.getMarksByStudentBySubjectByMarkType(studentIdNum, subjectIdNum, markType);

        if (result == null) {
            res.sendStatus(404);
            return;
        }

        res.send(result);
    }
}

export default MarkController;