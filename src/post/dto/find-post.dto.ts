import { IsNumber, IsString } from 'class-validator';

export class findPostDto {
  @IsNumber()
  id: number;

  @IsString()
  content: string;

  @IsString()
  title: string;
}
