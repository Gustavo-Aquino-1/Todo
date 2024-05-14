import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export default class CreateNoteDto {
  @IsString()
  @Length(2, 50)
  @IsNotEmpty()
  public readonly title: string;

  @IsString()
  @IsNotEmpty()
  public readonly description: string;

  @IsBoolean()
  @IsOptional()
  public readonly lock?: boolean;

  @IsString()
  @Length(8, 50)
  @IsOptional()
  public readonly password?: string;

  @IsBoolean()
  @IsOptional()
  public readonly important?: boolean;
}
