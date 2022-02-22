import { NotesModule } from "./notes.module"
import { Module } from "@nestjs/common"
import { AppController } from "../controllers/app.controller"
import { AppService } from "../services/app.service"
import { ConfigModule } from "@nestjs/config"
import { UserModule } from "./user.module"

@Module({
	imports: [NotesModule, UserModule, ConfigModule.forRoot()],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
