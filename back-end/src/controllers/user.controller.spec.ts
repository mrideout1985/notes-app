import { UserDto } from "./../dto/userDto"
import { Response } from "express"
import { UserService } from "./../services/user.service"
import { Test, TestingModule } from "@nestjs/testing"
import { UserController } from "./user.controller"
import { JwtModule } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"

describe("user controller", () => {
	let controller: UserController
	let spyService: UserService

	const responseMock = {
		status: jest.fn((x) => x),
		send: jest.fn((x) => x),
	} as unknown as Response

	const mockBcrypt = {
		hash: jest.fn(),
	}

	beforeAll(async () => {
		const ApiServiceProvider = {
			provide: UserService,
			useFactory: () => ({
				register: jest.fn(() => []),
				loginUser: jest.fn(() => {}),
			}),
		}

		const app: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [UserService, ApiServiceProvider],
			imports: [JwtModule.register({})],
		}).compile()

		controller = app.get<UserController>(UserController)
		spyService = app.get<UserService>(UserService)
		await app.init()
	})

	it("calls the registerUser method", () => {
		let email = "user"
		let password = "password"
		expect(controller.register(email, password)).not.toEqual(null)
	})

	it("calls the register method", () => {
		controller.register("email", "password")
		expect(spyService.registerUser).toHaveBeenCalled()
		// expect(spyService.registerUser).toHaveBeenCalledWith(dto)
	})
})
