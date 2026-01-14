/* eslint-disable @typescript-eslint/no-explicit-any */
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt"
import * as jwksRsa from 'jwks-rsa'

export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor() { 
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            issuer: process.env["JWT_ISSUER"] || `https://${process.env["AUTH0_DOMAIN"]}/`,
            audience: process.env["JWT_AUDIENCE"],
            algorithms: ['RS256'],
            secretOrKeyProvider: jwksRsa.passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${process.env["AUTH0_DOMAIN"]}/.well-known/jwks.json`
            })
            
        })
    }

    async validate(payload: any) {
        return { 
            userId: payload.sub, 
            tenantId: payload.tenantId,
            roles: payload.roles ?? [],
            plan: payload.plan  
        };
    }
}