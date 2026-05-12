import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}

export default function userAuthentication(req: AuthRequest, res: Response, next: NextFunction) {

    const header = req.headers.authorization;
    const token = header?.split(' ')[1]
    console.log("token from userAuth: ", token)

    if (!token) {
        res.status(401).json({ message: 'No token provided' })
    }

    try {
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
        req.user = decoded as { id: string }

        next()
    }
    catch (err) {
        res.status(401).json({ message: 'Invalid Token' })
    }
}