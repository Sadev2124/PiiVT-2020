import BaseController from "../../common/BaseController";
import {Request, Response, NextFunction } from 'express';
import StudentModel from "./model";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IAddStudent, IAddStudentValidator } from "./dto/IAddStudent";
import { IEditStudent, IEditStudentValidator } from "./dto/IEditStudent";

class StudentController extends BaseController{
    async getAll(req: Request, res: Response, next: NextFunction) {
        const students = await this.services.studentService.getAll();

        res.send(students);
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;

        const studentId: number = +id;

        if (studentId <= 0) {
            res.status(400).send("Invalid ID number.");
            return;
        }

        const data: StudentModel|null|IErrorResponse = await this.services.studentService.getById(studentId);

        if (data === null) {
            res.sendStatus(404);
            return;
        }

        if (data instanceof StudentModel) {
            res.send(data);
            return;
        }

        res.status(500).send(data);
    }

    async add(req: Request, res: Response, next: NextFunction) {
        const data = req.body;

        if (!IAddStudentValidator(data)) {
            res.status(400).send(IAddStudentValidator.errors);
            return;
        }

        const result = await this.services.studentService.add(data as IAddStudent);

        res.send(result);
    }

    async edit(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;

        const studentId: number = +id;

        if (studentId <= 0) {
            res.status(400).send("Invalid ID number.");
            return;
        }

        const data = req.body;

        if (!IEditStudentValidator(data)) {
            res.status(400).send(IEditStudentValidator.errors);
            return;
        }

        const result = await this.services.studentService.edit(studentId, data as IEditStudent);

        if (result === null) {
            res.sendStatus(404);
            return;
        }

        res.send(result);
    }

    async deleteById(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;

        const studentId: number = +id;

        if (studentId <= 0) {
            res.status(400).send("Invalid ID number.");
            return;
        }

        res.send(await this.services.userService.delete(studentId));
    }

    async getAllStudentsBySubjectId(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;

        const subjectId: number = +id;

        if (subjectId <= 0) {
            res.status(400).send("Invalid ID number.");
            return;
        }

        const data: StudentModel[]|null|IErrorResponse = await this.services.studentService.getAllStudentsBySubjectId(subjectId);

        if (data === null) {
            res.sendStatus(404);
            return;
        }

        if (data instanceof StudentModel) {
            res.send(data);
            return;
        }

        res.status(500).send(data);
    }

    async getStudentIdByUserId(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;

        const studentId: number = +id;

        if (studentId <= 0) {
            res.status(400).send("Invalid ID number.");
            return;
        }

        res.send(await this.services.studentService.getStudentIdByUserId(studentId));
    }
}

export default StudentController;