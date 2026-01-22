import { Body, Controller, Post, BadRequestException, UnauthorizedException, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginDTO } from './dto/login.dto';
import { UserLoggedInInterface } from 'src/users/interfaces/UserLoggedIn.interface';
import { User } from 'src/users/schemas/user.schema';
import { AuthGuard } from './auth.guard';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Get("user")
    @UseGuards(AuthGuard)
    async getUser(@Request() req){
        return req.user
    }



    @Post("login")
    async login(@Body() userLogin: LoginDTO): Promise<{access_token: string}>{
        return await this.authService.login(userLogin.email, userLogin.password)
    }



    @Post("signup")
    async signup(@Body() signUpDto: SignupDto): Promise<{ message: string }>{
        await this.authService.register(signUpDto)
        return { message: 'User created successfully' };
    }
}
