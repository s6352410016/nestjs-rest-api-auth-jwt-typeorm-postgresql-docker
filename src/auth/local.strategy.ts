import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { UnauthorizedException } from "@nestjs/common";
import { UserEntity } from "src/entity/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        });
    }

    async validate(username: string, password: string): Promise<Omit<UserEntity, "password"> | null> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException("Invalid username or password.");
        }
        return user;
    }
}