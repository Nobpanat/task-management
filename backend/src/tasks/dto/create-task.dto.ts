import { IsNotEmpty, IsOptional, IsString, IsIn } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(['pending', 'in_progress', 'completed'])
  status?: string;
}
