import { IsString, IsNotEmpty, IsEmail, MinLength, Matches } from "class-validator";

export class userDTO{
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly displayName: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(8)
    @Matches(
        /[A-Za-z]/,
        { message: 'Must contain at least one letter' }
    )
    @Matches(
        /\d/,
        { message: 'Must contain at least one number' }
    )
    @Matches(
        /[^A-Za-z0-9]/,
        { message: 'Must contain at least one special character' }
    )
    readonly password: string;
}