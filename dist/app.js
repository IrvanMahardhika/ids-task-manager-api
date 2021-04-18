"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_1 = __importDefault(require("@infras/routers/user"));
const task_1 = __importDefault(require("@infras/routers/task"));
const note_1 = __importDefault(require("@infras/routers/note"));
class App {
    constructor() {
        this.app = express_1.default();
        this.environment = process.env.NODE_ENV || 'development';
        this.port = process.env.PORT || 7070;
    }
    setExpressConfig() {
        this.app.use(cors_1.default());
        this.app.use(body_parser_1.default.json({ limit: '500mb' }));
        this.app.use(body_parser_1.default.urlencoded({ limit: '500mb', extended: true }));
        this.app.use(express_1.default.json({ limit: '500mb' }));
        this.app.use((req, res, next) => {
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Authorization, Content-Length, Cache-Control, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token');
            next();
        });
    }
    setRouters() {
        this.app.use('/user', user_1.default);
        this.app.use('/task', task_1.default);
        this.app.use('/note', note_1.default);
    }
    initialize() {
        this.setExpressConfig();
        this.setRouters();
        this.app.get('/', (req, res) => {
            const environment = process.env.NODE_ENV || 'development';
            res
                .status(200)
                .send(`Welcome to IDS API || Running in ${environment} mode`);
        });
        this.app.listen(this.port, () => console.log(`App listening on port ${this.port}! Running in ${this.environment} mode`));
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map