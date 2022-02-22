import { Module } from "@nestjs/common"
import { NotesController } from "../controllers/notes.controller"
import { NoteService } from "../services/notes.service"
import { noteProviders } from "src/providers/note.providers"
import { DatabaseModule } from "src/modules/database.module"

@Module({
	imports: [DatabaseModule],
	controllers: [NotesController],
	providers: [NoteService, ...noteProviders],
})
export class NotesModule {}
