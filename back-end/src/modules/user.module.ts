import { userProviders } from "./../providers/user.providers"
import { DatabaseModule } from "src/modules/database.module"
import { Module } from "@nestjs/common"
import { UserController } from "src/controllers/user.controller"
import { UserService } from "src/services/user.service"
import { JwtModule } from "@nestjs/jwt"

@Module({
	imports: [
		DatabaseModule,
		JwtModule.register({
			secret: "secret",
			signOptions: { expiresIn: "1d" },
		}),
	],
	controllers: [UserController],
	providers: [UserService, ...userProviders],
})
export class UserModule {}
