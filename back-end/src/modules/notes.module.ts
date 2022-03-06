import { JwtModule } from "@nestjs/jwt"
import { UserService } from "src/services/user.service"
import { UserSchema } from "./../schemas/user.schema"
import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { NoteSchema } from "src/schemas/note.schema"
import { NotesController } from "../controllers/notes.controller"
import { NoteService } from "../services/notes.service"

@Module({
	imports: [
		JwtModule.register({
			secret: "secret",
			signOptions: { expiresIn: "1d" },
		}),
		MongooseModule.forFeature([
			{
				name: "Note",
				schema: NoteSchema,
			},
			{ name: "User", schema: UserSchema },
		]),
	],
	controllers: [NotesController],
	providers: [NoteService, UserService],
})
export class NotesModule {}
