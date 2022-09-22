import {NextFunction, Request, Response} from 'express';

export interface IAccountController {
  getAccounts: (req: Request, res: Response, next: NextFunction) => void

  createAccount: (req: Request, res: Response, next:NextFunction) => void

  deleteAccount: (req: Request, res: Response) => void

  updateAccount: (req: Request, res: Response,next:NextFunction) => void

}
