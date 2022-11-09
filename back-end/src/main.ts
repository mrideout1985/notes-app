import { NestFactory } from "@nestjs/core"
import * as cookieParser from "cookie-parser"
import { AppModule } from "./modules/app.module"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.use(cookieParser())
	app.enableCors({ origin: "http://localhost:3001", credentials: true, allowedHeaders: ["Content-Type", "Allow", "Acess-Control-Allow-Origin", "Access-Control-Allow-Credentials"], })
	await app.listen(3000)
}
bootstrap()
