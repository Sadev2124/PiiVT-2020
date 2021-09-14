import Ajv from "ajv";

interface IAddProfessor {
    name: string;
    surname: string;
    userId: number;
}

const ajv = new Ajv();

const IAddProfessorValidator = ajv.compile({
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 3,
            maxLength: 64,
        },
        surname: {
            type: "string",
            minLength: 3,
            maxLength: 64,
        },
        userId: {
            type: "number",
            minimum: 1,
        }
    },
    required: [
        "name",
        "surname",
        "userId",
    ],
    additionalProperties: false,
});

export { IAddProfessor};
export { IAddProfessorValidator };