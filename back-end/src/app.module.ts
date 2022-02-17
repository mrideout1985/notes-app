import { NotesModule } from "./notes/notes.module"
import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ConfigModule } from "@nestjs/config"

@Module({
	imports: [
		NotesModule,
		ConfigModule.forRoot({ envFilePath: ".development.env" }),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
