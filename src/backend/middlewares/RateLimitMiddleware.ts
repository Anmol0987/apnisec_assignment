import { AppError } from "../errors/AppError";
import { RateLimiter } from "../rate-limit/RateLimiter";

export class RateLimitMiddleWare{
    static enforce(req:Request){
        const ip = req.headers.get('x-forwarded-for')??
        req.headers.get("x-real-ip") ??"unknown";
        try{
            return RateLimiter.check(ip);
        }
        catch(error){
            throw new AppError("Too many requests", 429);
        }
    }
}