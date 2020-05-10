import { Middleware } from "../../middlewares/middleware";
import { HTTP_METHODS } from "./methods";

export class Route {
    url:string;
    middlewares:Array<any> = []; // TODO: Type should be Middleware
    method:HTTP_METHODS;
    controller: Function;

    constructor(data: any) {
        if (!data) {
            throw new Error('Data can\'t be empty when initializing a route.');
        } else if (!data.url || !(Object.values(HTTP_METHODS).includes(data.method)) || !data.controller) {
            throw new Error('Could not initialize route, ensure to provide \'url\', \'method\' and \'controller\'.');
        }

        this.url = data.url;
        this.middlewares = data.middlewares;
        this.method = data.method;
        this.controller = data.controller;
    }
}