import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  isNumber,
} from 'class-validator';

export class UserDTO {
  
  @IsNotEmpty()
  @IsString()
  Username?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  Bio?: string;

  @IsOptional()
  @IsString()
  avartar?: string;
}
