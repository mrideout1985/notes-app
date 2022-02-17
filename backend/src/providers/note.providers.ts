import { Connection } from "mongoose"
import { NoteSchema } from "src/schemas/note.schema"

export const noteProviders = [
	{
		provide: "NOTE",
		useFactory: (connection: Connection) =>
			connection.model("Note", NoteSchema),
		inject: ["DATABASE_CONNECTION"],
	},
]
