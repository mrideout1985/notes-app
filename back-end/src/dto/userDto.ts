export interface UserDto {
	email: string
	password?: string
}

interface Note {
	title: string
	description: string
	author: []
}

export interface NoteDto extends Note {
	_id: string
	__v: number
}
