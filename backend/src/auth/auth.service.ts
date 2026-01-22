import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';

import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { SignupDto } from './dto/signup.dto';

import { UserLoggedInInterface } from 'src/users/interfaces/UserLoggedIn.interface';

import bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        private userService: UsersService,
        private jwtService: JwtService
    ){}

    async login(email: string, loginPassword: string): Promise<{access_token: string}>{
        let user, match;

        try{
            user = await this.userService.findOne(email)
            match = await bcrypt.compare(loginPassword, user?.password)
        }catch(err){
            throw new UnauthorizedException({
                message: "Invalid email or password"
            })
        }
        
        const payload = { displayName: user.displayName, email: user.email }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }



    async register(userSingUpData: SignupDto): Promise<User>{
        const existingUser = await this.userService.findOne(userSingUpData.email)
        if (existingUser) throw new ConflictException({
            message: "User already exists"
        })

        const saltRounds = parseInt((this.configService.get<string>("saltRounds"))!)
        userSingUpData.password = await bcrypt.hash(userSingUpData.password, saltRounds)
        
        try{
            return this.userService.create(userSingUpData)
        }catch(err){
            console.error(err)
            throw new BadRequestException({
                message: "Failed to Create User"
            })
        }
    }



    async validateToken(token: string): Promise<UserLoggedInInterface>{
        try{
            const payload = await this.jwtService.verifyAsync(token)
            return payload
        }catch(err) {
            throw new UnauthorizedException({
                message: "Invalid Token"
            })
        }
    }

}
