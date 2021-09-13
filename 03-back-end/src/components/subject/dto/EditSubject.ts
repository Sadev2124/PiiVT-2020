import Ajv from "ajv";

interface IEditSubject {
    name: string;
}

const ajv = new Ajv();

const IEditSubjectValidator = ajv.compile({
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

export { IEditSubject };
export { IEditSubjectValidator };