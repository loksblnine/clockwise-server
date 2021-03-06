import { NextFunction, Request, Response } from "express";
export declare const authMiddleware: (request: Request, response: Response, next: NextFunction) => void;
export declare const authRefreshMiddleware: (request: Request, response: Response, next: NextFunction) => void;
export declare const authCustomerMiddleware: (request: Request, response: Response, next: NextFunction) => void;
export declare const authCustomerMasterMiddleware: (request: Request, response: Response, next: NextFunction) => void;
export declare const authMasterMiddleware: (request: Request, response: Response, next: NextFunction) => void;
export declare const isLoggedInGoogle: (request: any, response: Response, next: NextFunction) => void;
//# sourceMappingURL=authMiddleware.d.ts.map