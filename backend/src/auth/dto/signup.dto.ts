import { IsNotEmpty, IsString, MinLength, IsEmail, Matches } from "class-validator";

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  displayName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/[A-Za-z]/, { message: 'Must contain at least one letter' })
  @Matches(/\d/, { message: 'Must contain at least one number' })
  @Matches(/[^A-Za-z0-9]/, { message: 'Must contain at least one special character' })
  password: string;
}