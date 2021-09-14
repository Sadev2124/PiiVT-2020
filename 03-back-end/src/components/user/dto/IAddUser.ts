import Ajv from "ajv";

interface IAddUser {
    username: string;
    password: string;
}

const ajv = new Ajv();

const IAddUserValidator = ajv.compile({
    type: "object",
    properties: {
        username: {
            type: "string",
            minLength: 6,
            maxLength: 64,
        },
        password: {
            type: "string",
            minLength: 6,
            maxLength: 255,
        },
    },
    required: [
        "username",
        "password",
    ],
    additionalProperties: false,
});

export { IAddUser};
export { IAddUserValidator };