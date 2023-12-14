import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from 'src/dtos/signup.dto';
import { UserEntity } from 'src/entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ){}

    async createToken(fullname: string , username: string): Promise<Token>{
        try{
            const [accessToken , refreshToken] = await Promise.all([
                this.jwtService.signAsync(
                    {
                        fullname,
                        username
                    },
                    {
                        secret: this.configService.get<string>("ACCESS_TOKEN_SECRET"),
                        expiresIn: "300s"
                    }
                ),
                this.jwtService.signAsync(
                    {
                        fullname,
                        username
                    },
                    {
                        secret: this.configService.get<string>("REFRESH_TOKEN_SECRET"),
                        expiresIn: "1h"
                    }
                ),
            ]);
            return {
                accessToken,
                refreshToken
            }
        }catch(err){
            console.log(`error: ${err}`);
        }
    }

    async signUp(signUpDto: SignUpDto){
        const userExist = await this.userService.findUser(signUpDto.username);
        if(userExist){
            throw new ConflictException("Username is already exist.");
        }
        const userData = await this.userService.signUp(signUpDto);
        return await this.createToken(userData.fullname , userData.username);
    }

    async validateUser(username: string , password: string): Promise<Omit<UserEntity , "password"> | null>{
        try{
            const user = await this.userService.findUser(username);
            if(user && (await bcrypt.compare(password , user.password))){
                const {password , ...data} = user;
                return data;
            }
            return null;
        }catch(err){
            console.log(`error: ${err}`);
        }
    }

    async signIn(fullname: string , username: string): Promise<Token>{
        try{
            return await this.createToken(fullname , username);
        }catch(err){
            console.log(`error: ${err}`);
        }
    }

    async refresh(fullname: string , username: string): Promise<Token>{
        try{
            return await this.createToken(fullname , username);
        }catch(err){
            console.log(`error: ${err}`);
        }
    }
}
