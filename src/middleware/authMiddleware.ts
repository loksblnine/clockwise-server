import jwt, {JwtPayload} from "jsonwebtoken"
import {Request, Response, NextFunction} from "express";

export const authMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    try {
        const token = String(request?.headers?.authorization?.split(' ')[1])
        if (!token) {
            response.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, String(process.env.SECRET_KEY)) as JwtPayload
        if (decoded?.role === 1) {
            request.body.user = decoded
            next()
        } else {
            response.status(401).json({message: "Не авторизован"})
        }
    } catch (e) {
        response.status(401).json({message: "Не авторизован"})
    }
}
export const authRefreshMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    try {
        const token = String(request?.headers?.authorization?.split(' ')[1])
        if (!token) {
            response.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, String(process.env.SECRET_KEY)) as JwtPayload
        if (decoded?.role === 1 || decoded?.role === 2 || decoded?.role === 3) {
            request.body.user = decoded
            next()
        } else {
            response.status(401).json({message: "Не авторизован"})
        }
    } catch (e) {
        response.status(401).json({message: "Не авторизован"})
    }
}
export const authCustomerMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    try {
        const token = String(request?.headers?.authorization?.split(' ')[1])
        if (!token) {
            response.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, String(process.env.SECRET_KEY)) as JwtPayload
        if (decoded?.role === 3 || decoded?.role === 1) {
            request.body.user = decoded
            next()
        } else {
            response.status(401).json({message: "Не авторизован"})
        }
    } catch (e) {
        response.status(401).json({message: "Не авторизован"})
    }
}
export const authMasterMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    try {
        const token = String(request?.headers?.authorization?.split(' ')[1])
        if (!token) {
            response.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, String(process.env.SECRET_KEY)) as JwtPayload
        if (decoded?.role === 2 || decoded?.role === 1) {
            request.body.user = decoded
            next()
        } else {
            response.status(401).json({message: "Не авторизован"})
        }
    } catch (e) {
        response.status(401).json({message: "Не авторизован"})
    }
}
