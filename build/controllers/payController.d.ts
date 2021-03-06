import { Request, Response } from "express";
export declare const pay: (req: Request, res: Response) => Promise<void>;
export declare const successPay: (req: Request, res: Response) => Promise<void>;
export declare const cancelPay: (req: Request, response: Response) => void;
export declare const getPaymentDetailsByOrderId: (req: Request, resp: Response) => Promise<void>;
export declare const getIsPaidByOrderId: (req: Request, resp: Response) => Promise<void>;
//# sourceMappingURL=payController.d.ts.map