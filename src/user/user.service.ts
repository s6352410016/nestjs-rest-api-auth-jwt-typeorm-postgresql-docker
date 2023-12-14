import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/dtos/signup.dto';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}

    async findUser(username: string): Promise<UserEntity | null>{
        try{
            return await this.userRepository.findOne({
                where:{
                    username
                }
            });
        }catch(err){
            console.log(`error: ${err}`);
        }
    }

    async signUp(signUpDto: SignUpDto): Promise<UserEntity>{
        try{
            const { fullname , username , password } = signUpDto;
            const passwordHash = await bcrypt.hash(password , 10);
            const user = this.userRepository.create({
                fullname,
                username,
                password: passwordHash
            });
            return await this.userRepository.save(user);
        }catch(err){
            console.log(`error: ${err}`);
        }
    }
}
