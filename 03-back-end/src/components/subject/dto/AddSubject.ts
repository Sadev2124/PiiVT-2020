import Ajv from "ajv";

interface IAddSubject {
    name: string;
}

const ajv = new Ajv();

const IAddSubjectValidator = ajv.compile({
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
    },
    required: [
        "name",
    ],
    additionalProperties: false,
});

export { IAddSubject };
export { IAddSubjectValidator };