import { Body, Controller, Get, Post, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { SignUpDto } from 'src/dtos/signup.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { AtAuthGuard } from 'src/guard/at-auth.guard';
import { RtAuthGuard } from 'src/guard/rt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("signup")
    signUp(@Body() signUpDto: SignUpDto): Promise<Token> {
        return this.authService.signUp(signUpDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post("signin")
    @HttpCode(HttpStatus.OK)
    async signIn(@Req() req): Promise<Token> {
        return this.authService.signIn(req.user.fullname, req.user.username);
    }

    @UseGuards(AtAuthGuard)
    @Get("profile")
    authUser(@Req() req): string{
        return `Hello: ${req.user.fullname}
                User: ${req.user.username}`;
    }

    @UseGuards(RtAuthGuard)
    @Post("refresh")
    @HttpCode(HttpStatus.OK)
    async refresh(@Req() req): Promise<Token>{
        return this.authService.refresh(req.user.fullname , req.user.username);
    }
}
