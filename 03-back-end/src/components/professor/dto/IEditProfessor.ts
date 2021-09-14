import Ajv from "ajv";

interface IEditProfessor {
    name: string;
    surname: string;
}

const ajv = new Ajv();

const IEditProfessorValidator = ajv.compile({
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        surname: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
    },
    required: [
        "name",
        "surname",
    ],
    additionalProperties: false,
});

export { IEditProfessor};
export { IEditProfessorValidator };