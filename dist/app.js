"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./src/routes/index"));
const connection_1 = __importDefault(require("./src/database/connection"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.authenticate();
        console.log('connection established.');
        // console.log(chalk.rgb(249, 50, 44).bold(`DB`) + " "+ chalk.green('connection established.'))
    }
    catch (error) {
        console.log(`unable to connect to database ${error}`);
        // console.log(chalk.red(`unable to connect to database ${error}`))
    }
});
// call a function
testConnection();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.static("./uploads"));
app.use('/api', index_1.default);
app.listen(PORT, () => {
    console.log(`app running at port ${PORT}`);
});
