import { Transform } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  // بدون trim، عنوانی مثل "   " از IsNotEmpty رد می‌شود و بعداً در دامنه خطا می‌دهد
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title!: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsInt()
  @Min(1888)
  releaseYear!: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  rating!: number;

  @IsArray()
  @IsString({ each: true })
  genres!: string[];
}
