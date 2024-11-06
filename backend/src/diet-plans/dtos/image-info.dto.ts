import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class ImageInfoDto {
  @ApiProperty({ example: 'http://example.com/image.jpg' })
  @IsString()
  url: string

  constructor(url: string) {
    this.url = url
  }
}
