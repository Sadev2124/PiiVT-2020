import { Algorithm } from "jsonwebtoken";
interface TokenKeyOptions {
    private: string;
    public: string;
    duration: number;
}
interface TokenOptions {
    auth: TokenKeyOptions,
    refresh:TokenKeyOptions,
    issuer: string;
    algorithm: Algorithm,
}
export default interface IConfig {
    server: {
        port: number,
        static: {
            path: string,
            route: string,
            cacheControl: boolean,
            dotfiles: "deny" | "allow",
            etag: boolean,
            index: boolean,
            maxAge: number,
        }
    },
    database: {
        host: string,
        port: number,
        user: string,
        password: string,
        database: string,
        charset: string,
        timezone: string,
    },
    auth: {
        user: TokenOptions,
        allowRequestsEvenWithoutValidTokens: boolean,
    },
};