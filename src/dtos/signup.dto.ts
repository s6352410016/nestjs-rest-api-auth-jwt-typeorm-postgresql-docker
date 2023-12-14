import { IsNotEmpty , IsString , MinLength } from 'class-validator';

export class SignUpDto{
    @IsNotEmpty()
    @IsString()
    fullname: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}