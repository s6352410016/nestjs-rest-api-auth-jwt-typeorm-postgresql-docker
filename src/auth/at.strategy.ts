import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy , ExtractJwt } from "passport-jwt";
import { TokenPayload } from "src/types/token-payload";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, "jwt-access") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        });
    }

    async validate(payload: TokenPayload): Promise<{fullname: string , username: string}>{
        return {
            fullname: payload.fullname,
            username: payload.username
        }
    }
}