import { Request } from "express"
export interface ModifyRequest extends Request {
    user?: any
    role?: any,
    ownerId?: any
}


