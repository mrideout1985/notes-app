import { UserSchema } from "./../schemas/user.schema"
import { Module } from "@nestjs/common"
import { UserController } from "src/controllers/user.controller"
import { UserService } from "src/services/user.service"
import { JwtModule } from "@nestjs/jwt"
import { MongooseModule } from "@nestjs/mongoose"
import { NoteSchema } from "src/schemas/note.schema"

@Module({
	imports: [
		JwtModule.register({
			secret: "secret",
			signOptions: { expiresIn: "1d" },
		}),
		MongooseModule.forFeature([
			{ name: "User", schema: UserSchema },
			{
				name: "Note",
				schema: NoteSchema,
			},
		]),
	],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
