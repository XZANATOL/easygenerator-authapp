import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const schema = UserSchema

          schema.set('toJSON', {
            versionKey: false
          });

          return schema;
        }
      }
    ])
  ],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
