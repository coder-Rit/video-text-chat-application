import { Request, Response, NextFunction } from 'express';

const errorHandler = (theFunc: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await theFunc(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};

export = errorHandler;
