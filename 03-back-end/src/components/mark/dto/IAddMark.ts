import Ajv from "ajv";

interface IAddMark {
    mark: number;
    markType: 'first_trimester' | 'second_trimester' | 'semester_mark' | 'final_mark';
    description: string | null;
    professorId: number;
    studentId: number;
    subjectId: number;
}

const ajv = new Ajv();

const IAddMarkValidator = ajv.compile({
    type: "object",
    properties: {
        mark: {
            type: "integer",
            minimum: 1,
        },
        markType: {
            type: "string",
            pattern: "^(first_trimester|second_trimester|semester_mark|final_mark)$",
        },
        description: {
            type: "string",
            minLength: 2,
            maxLength: 64 * 1024,
        },
        professorId: {
            type: "integer",
            minimum: 1,
        },
        studentId: {
            type: "integer",
            minimum: 1,
        },
        subjectId: {
            type: "integer",
            minimum: 1,
        }
    },
    required: [
        "mark",
        "markType",
        "professorId",
        "studentId",
        "subjectId",
    ],
    additionalProperties: false,
});

export { IAddMark };
export { IAddMarkValidator };