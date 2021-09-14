import {Request, Response, NextFunction } from 'express';
import SubjectModel from './model';
import SubjectService from './service';
import IErrorResponse from '../../common/IErrorResponse.interface';
import { IAddSubject, IAddSubjectValidator } from './dto/IAddSubject';
import { IEditSubject, IEditSubjectValidator } from './dto/IEditSubject';
import BaseController from '../../common/BaseController';

class SubjectController extends BaseController{
    async getAll(req: Request, res: Response, next: NextFunction) {
        const subjects = await this.services.subjectService.getAll();

        res.send(subjects);
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;

        const subjectId: number = +id;

        if (subjectId <= 0) {
            res.sendStatus(400);
            return;
        }

        const data: SubjectModel|null|IErrorResponse = await this.services.subjectService.getById(subjectId);

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

        const result = await this.services.subjectService.add(data as IAddSubject);

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

        const result = await this.services.subjectService.edit(subjectId, data as IEditSubject);

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

        res.send(await this.services.subjectService.delete(subjectId));
    }

    async getSubjectsByProfessorId(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.professorId;

        const professorId: number = +id;

        if (professorId <= 0) {
            res.status(400).send("Invalid ID number.");
            return;
        }

        const result = await this.services.subjectService.getSubjectsByProfessorId(professorId);

        if (result == null) {
            res.sendStatus(404);
            return;
        }

        res.send(result);
    }

    async getSubjectsByStudentId(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.studentId;

        const studentId: number = +id;

        if (studentId <= 0) {
            res.status(400).send("Invalid ID number.");
            return;
        }

        const result = await this.services.subjectService.getSubjectsByProfessorId(studentId);

        if (result == null) {
            res.sendStatus(404);
            return;
        }

        res.send(result);
    }
 }

export default SubjectController;