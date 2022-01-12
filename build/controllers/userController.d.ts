import { Request, Response } from "express";
export declare const isTokenValid: (request: Request, response: Response) => Promise<void>;
export declare const isTokenValidGoogle: (request: Request, response: Response) => Promise<void>;
export declare const registerUser: (request: Request, response: Response) => Promise<void>;
export declare const loginUser: (request: Request, response: Response) => Promise<Response>;
export declare const approveMaster: (request: Request, response: Response) => Promise<void>;
export declare const approveUser: (request: Request, response: Response) => Promise<void>;
export declare const approveOrder: (request: Request, response: Response) => Promise<void>;
export declare const setMarkOrder: (request: Request, response: Response) => Promise<void>;
//# sourceMappingURL=userController.d.ts.map