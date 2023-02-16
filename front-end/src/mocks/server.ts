// src/mocks/server.js
import { setupServer } from 'msw/node'
import { loginHandler } from './handlers'

// This configures a request mocking server with the given request handlers.
const handlers = [loginHandler]

export const server = setupServer(...handlers)
