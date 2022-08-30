export interface NewNote {
	email?: string | null
	title: string
	description: string
}

export type UserNotes = {
	notes: []
}
