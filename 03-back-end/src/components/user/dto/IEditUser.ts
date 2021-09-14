import Ajv from "ajv";

interface IEditUser {
    password: string;
}

const ajv = new Ajv();

const IEditUserValidator = ajv.compile({
    type: "object",
    properties: {
        password: {
            type: "string",
            minLength: 6,
            maxLength: 255,
        },
    },
    required: [
        "password",
    ],
    additionalProperties: false,
});

export { IEditUser};
export { IEditUserValidator };