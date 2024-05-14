import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 50)
  public readonly password: string;
}
