import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'The password must contain at least 6 characters.' })
  password: string;
}
