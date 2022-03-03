import { UserSchema } from "./../schemas/user.schema"
import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { NoteSchema } from "src/schemas/note.schema"
import { NotesController } from "../controllers/notes.controller"
import { NoteService } from "../services/notes.service"

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: "Note",
				schema: NoteSchema,
			},
			{ name: "User", schema: UserSchema },
		]),
	],
	controllers: [NotesController],
	providers: [NoteService],
})
export class NotesModule {}
