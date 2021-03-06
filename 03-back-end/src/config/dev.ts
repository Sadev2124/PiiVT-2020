import IConfig from "../common/IConfig.interface";
import { readFileSync } from "fs";

const Config: IConfig = {
    server: {
        port: 40080,
        static: {
            route: "/static",
            path: "./static/",
            cacheControl: false,
            dotfiles: "deny",
            etag: false,
            index: false,
            maxAge: 360000,
        },
    },
    database: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "elektronski_dnevnik",
        charset: "utf8",
        timezone: "+01:00",
    },
    auth: {
        user: {
            algorithm: "RS256",
            issuer: "localhost",
            auth: {
                duration: 60 * 2,
                public: readFileSync("keystore/user-auth.public", "utf-8"),
                private: readFileSync("keystore/user-auth.private", "utf-8"),
            },
            refresh: {
                duration: 60 * 60 * 24 * 365,
                public: readFileSync("keystore/user-refresh.public", "utf-8"),
                private: readFileSync("keystore/user-refresh.private", "utf-8"),
            },
        },
        allowRequestsEvenWithoutValidTokens: false,
    },
};

export default Config;