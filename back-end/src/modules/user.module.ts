import { UserSchema } from "./../schemas/user.schema"
import { Module } from "@nestjs/common"
import { UserController } from "../controllers/user.controller"
import { UserService } from "../services/user.service"
import { JwtModule } from "@nestjs/jwt"
import { MongooseModule } from "@nestjs/mongoose"
import { NoteSchema } from "../schemas/note.schema"
import { NoteService } from "../services/notes.service"

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
	providers: [UserService, NoteService],
})
export class UserModule {}
