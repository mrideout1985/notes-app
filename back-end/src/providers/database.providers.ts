import * as mongoose from "mongoose"

export const databaseProviders = [
	{
		provide: "DATABASE_CONNECTION",
		useFactory: (): Promise<typeof mongoose> =>
			mongoose.connect(
				`mongodb+srv://mrideout123:${process.env.MONGO_PASSWORD}@cluster0.b5rlm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
			),
	},
]
