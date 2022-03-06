import { MongooseModule } from "@nestjs/mongoose"
import { NotesModule } from "./notes.module"
import { Module } from "@nestjs/common"
import { AppController } from "../controllers/app.controller"
import { AppService } from "../services/app.service"
import { ConfigModule } from "@nestjs/config"
import { UserModule } from "./user.module"

@Module({
	imports: [
		NotesModule,
		UserModule,
		ConfigModule.forRoot(),
		MongooseModule.forRoot(
			`mongodb+srv://mrideout123:${process.env.MONGO_PASSWORD}@cluster0.b5rlm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
		),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
