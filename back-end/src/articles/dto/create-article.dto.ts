import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty()
  title: string | undefined;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ required: false, default: false })
  published?: boolean = false;

  @ApiProperty({ required: true, default: false })
  authorEmail: string;
}
