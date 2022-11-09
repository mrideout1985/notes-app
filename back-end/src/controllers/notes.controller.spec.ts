import { Test, TestingModule } from "@nestjs/testing"
import { NoteService } from "../services/notes.service"
import { NoteDto } from "./../dto/noteDto"
import { NotesController } from "./notes.controller"

// const moduleMocker = new ModuleMocker(global)

describe("NotesController", () => {
	let controller: NotesController
	let spyService: NoteService

	beforeAll(async () => {
		const ApiServiceProvider = {
			provide: NoteService,
			useFactory: () => ({
				create: jest.fn(() => []),
				findNote: jest.fn(() => {}),
				update: jest.fn(() => {}),
				remove: jest.fn(() => {}),
			}),
		}
		const app: TestingModule = await Test.createTestingModule({
			controllers: [NotesController],
			providers: [NoteService, ApiServiceProvider],
		}).compile()
		controller = app.get<NotesController>(NotesController)
		spyService = app.get<NoteService>(NoteService)
	})

	it("calls the createNote method", () => {
		const dto = new NoteDto()
		expect(controller.create(dto)).not.toEqual(null)
	})

	it("calls the createNote method", () => {
		const dto = new NoteDto()
		controller.create(dto)
		expect(spyService.create).toHaveBeenCalled()
		expect(spyService.create).toHaveBeenCalledWith(dto)
	})

	it("calling find note by id method", () => {
		let id = "123058124FAD9"
		controller.findOne(id)
		expect(spyService.findNote).toHaveBeenCalled()
	})

	it("calling the update method", () => {
		const dto = new NoteDto()
		let id = "123058124FAD9"
		controller.update(id, dto)
		expect(spyService.update).toHaveBeenCalled()
	})

	it("calls the remove method", () => {
		let id = "123058124FAD9"
		controller.remove(id, 2)
		expect(spyService.remove).toHaveBeenCalled()
	})
})
