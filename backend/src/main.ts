import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  })
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())

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
