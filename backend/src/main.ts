import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('Swagger created to display backend auth endpoints')
    .setVersion('1.1')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)

  await app.listen(3001)
}
bootstrap()
