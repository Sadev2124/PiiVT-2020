import {Request, Response, NextFunction } from 'express';
import BaseController from "../../common/BaseController";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IAddProfessor, IAddProfessorValidator } from "./dto/IAddProfessor";
import { IEditProfessor, IEditProfessorValidator } from "./dto/IEditProfessor";
import ProfessorModel from "./model";

class ProfessorController extends BaseController{
    async getAll(req: Request, res: Response, next: NextFunction) {
        const professors = await this.services.professorService.getAll();

        res.send(professors);
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;

        const professorId: number = +id;

        if (professorId <= 0) {
            res.status(400).send("Invalid ID number.");
            return;
        }

        const data: ProfessorModel|null|IErrorResponse = await this.services.professorService.getById(professorId);

        if (data === null) {
            res.sendStatus(404);
            return;
        }

        if (data instanceof ProfessorModel) {
            res.send(data);
            return;
        }

        res.status(500).send(data);
    }

    async add(req: Request, res: Response, next: NextFunction) {
        const data = req.body;

        if (!IAddProfessorValidator(data)) {
            res.status(400).send(IAddProfessorValidator.errors);
            return;
        }

        const result = await this.services.professorService.add(data as IAddProfessor);

        res.send(result);
    }

    async edit(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;

        const professorId: number = +id;

        if (professorId <= 0) {
            res.status(400).send("Invalid ID number.");
            return;
        }

        const data = req.body;

        if (!IEditProfessorValidator(data)) {
            res.status(400).send(IEditProfessorValidator.errors);
            return;
        }

        const result = await this.services.professorService.edit(professorId, data as IEditProfessor);

        if (result === null) {
            res.sendStatus(404);
            return;
        }

        res.send(result);
    }

    async deleteById(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;

        const professorId: number = +id;

        if (professorId <= 0) {
            res.status(400).send("Invalid ID number.");
            return;
        }

        res.send(await this.services.userService.delete(professorId));
    }

    async getProfessorByUserId(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.userId;

        const professorId: number = +id;

        if (professorId <= 0) {
            res.status(400).send("Invalid ID number.");
            return;
        }

        const data: ProfessorModel|null|IErrorResponse = await this.services.professorService.getProfessorByUserId(professorId);

        if (data === null) {
            res.sendStatus(404);
            return;
        }

        if (data instanceof ProfessorModel) {
            res.send(data);
            return;
        }

        res.status(500).send(data);
    }

    async getProfessorBySubjectId(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.subjectId;

        const subjectId: number = +id;

        if (subjectId <= 0) {
            res.status(400).send("Invalid ID number.");
            return;
        }

        const data: ProfessorModel|null|IErrorResponse = await this.services.professorService.getProfessorBySubjectId(subjectId);

        if (data === null) {
            res.sendStatus(404);
            return;
        }

        if (data instanceof ProfessorModel) {
            res.send(data);
            return;
        }

        res.status(500).send(data);
    }

    async getProfessorsBySubjectName(req: Request, res: Response, next: NextFunction) {
        const name: string = req.params.subjectName;

        const data: ProfessorModel|null|IErrorResponse = await this.services.professorService.getProfessorsBySubjectName(name);

        if (data === null) {
            res.status(400).send("Invalid ID number.");
            return;
        }

        if (data instanceof ProfessorModel) {
            res.send(data);
            return;
        }

        res.status(500).send(data);
    }
}

export default ProfessorController;