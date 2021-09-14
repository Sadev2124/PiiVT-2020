import Ajv from "ajv";

interface IAddStudent {
    name: string;
    surname: string;
    jmbg: string;
    email: string;
    phoneNumber: string;
    postalAddress: string;
    userId: number;
}

const ajv = new Ajv();

const IAddStudentValidator = ajv.compile({
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
        jmbg: {
            type: "string",
            minLength: 13,
            maxLength: 13,
        },
        email: {
            type: "string",
            minLength: 8,
            maxLength: 255,
        },
        phoneNumber: {
            type: "string",
            minLength: 5,
            maxLength: 24,
        },
        postalAddress: {
            type: "string",
            minLength: 10,
            maxLength: 64 * 1024,
        },
        userId: {
            type: "number",
            minimum: 1,
        }
    },
    required: [
        "name",
        "surname",
        "jmbg",
        "email",
        "phoneNumber",
        "postalAddress",
        "userId",
    ],
    additionalProperties: false,
});

export { IAddStudent};
export { IAddStudentValidator };