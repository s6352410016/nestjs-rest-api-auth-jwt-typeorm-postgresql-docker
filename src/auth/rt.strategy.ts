import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { TokenPayload } from "src/types/token-payload";

export class RtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.REFRESH_TOKEN_SECRET,
        });
    }

    async validate(payload: TokenPayload): Promise<{ fullname: string, username: string }> {
        return {
            fullname: payload.fullname,
            username: payload.username
        }
    }
}   