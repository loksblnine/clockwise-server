import { Request, Response } from "express";
import { MailDataRequired } from "@sendgrid/helpers/classes/mail";
export declare const generateJwt: (id: number, email: string, role: number, time: string) => string;
export declare const LINK: string | undefined;
export declare const sendMail: (message: MailDataRequired, response: Response) => void;
declare type OrderTime = {
    [key: string]: string | string[];
};
export interface IWhere {
    master_id?: number;
    city_id?: number;
    work_id?: number;
    isDone?: boolean;
    order_time?: OrderTime;
}
export declare const whereConstructor: (request: Request) => IWhere;
export declare const getDaysArray: (from: string, to: Date) => Array<string>;
export {};
//# sourceMappingURL=utils.d.ts.map