import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

import { SignupDto } from 'src/auth/dto/signup.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ){}

    async findOne(email: string){
        return this.userModel.findOne({ email }).exec();
    }

    async create(data: SignupDto){
        return this.userModel.create(data);
    }
}
