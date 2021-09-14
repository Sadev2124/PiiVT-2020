import Ajv from "ajv";

interface IEditStudent {
    email: string;
    phoneNumber: string;
    postalAddress: string;
}

const ajv = new Ajv();

const IEditStudentValidator = ajv.compile({
    type: "object",
    properties: {
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
    },
    required: [
        "email",
        "phoneNumber",
        "postalAddress",
    ],
    additionalProperties: false,
});

export { IEditStudent};
export { IEditStudentValidator };