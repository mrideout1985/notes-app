import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { BrowserRouter as Router } from 'react-router-dom';
import { server } from '../../../mocks/server';
import AuthForm from './AuthForm';
describe('AuthForm Component', () => {
    it('displays form validation message if the field is empty when form is submitted', async () => {
        render(<Router>
				<AuthForm action="login"/>
			</Router>);
        userEvent.click(screen.getByRole('button', { name: /Sign in/i }));
        expect(await screen.findByText('email is a required field')).toBeInTheDocument();
        expect(await screen.findByText('password is a required field')).toBeInTheDocument();
    });
    it('should display validation errors if the email input field does not have a valid email address', async () => {
        render(<Router>
				<AuthForm action="register"/>
			</Router>);
        userEvent.type(screen.getByLabelText('Email'), 'test');
        userEvent.click(screen.getByRole('button', { name: /Sign up/i }));
        expect(await screen.findByText('email must be a valid email')).toBeInTheDocument();
    });
    it("should display a validation error if the password input field's value is less than 8 characters and the form action is register", async () => {
        render(<Router>
				<AuthForm action="register"/>
			</Router>);
        userEvent.type(screen.getByLabelText('Password'), '123');
        userEvent.click(screen.getByRole('button', { name: /Sign up/i }));
        expect(await screen.findByText('password must be at least 8 characters')).toBeInTheDocument();
    });
    it('navigation links have the correct attributes', () => {
        render(<Router>
				<AuthForm action="register"/>
			</Router>);
        expect(screen.getByText('Already have an account?')).toBeInTheDocument();
        expect(screen.getByText('Sign in')).toHaveAttribute('href', '/login');
    });
    it("renders the correct title if the action prop is 'register'", () => {
        render(<Router>
				<AuthForm action="register"/>
			</Router>);
        expect(screen.getByRole('link')).toHaveTextContent('Sign in');
        expect(screen.getByRole('button', {
            name: 'Sign up',
        }));
    });
    it("renders the correct title  if the action prop is 'login'", () => {
        render(<Router>
				<AuthForm action="login"/>
			</Router>);
        expect(screen.getByRole('link')).toHaveTextContent('Sign up');
        expect(screen.getByRole('button', {
            name: 'Sign in',
        }));
    });
    it("should login successfully if the users details are correct and the action prop is 'login'", async () => {
        render(<Router>
				<AuthForm action="login"/>
			</Router>);
        userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
        userEvent.type(screen.getByLabelText('Password'), 'bigtestypassword');
        userEvent.click(screen.getByRole('button', { name: /Sign in/i }));
        await waitFor(() => {
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
    });
    it("should display an alert dialog if the users details are incorrect and the action prop is 'login'", async () => {
        server.use(rest.post('http://localhost:3000/auth/login', (req, res, ctx) => {
            return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }));
        }));
        render(<Router>
				<AuthForm action="login"/>
			</Router>);
        userEvent.type(screen.getByLabelText('Email'), 'dogs@dogs.com');
        userEvent.type(screen.getByLabelText('Password'), 'dogs1235666');
        userEvent.click(screen.getByRole('button', { name: /Sign in/i }));
        await waitFor(() => {
            expect(screen.getByRole('dialog')).toHaveTextContent('Invalid credentials');
        });
    });
});
