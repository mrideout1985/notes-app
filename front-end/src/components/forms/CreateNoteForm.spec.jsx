import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateNoteForm from './CreateNoteForm';
const createUserNote = jest.fn();
describe('CreateNoteForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should render the component correctly', () => {
        render(<CreateNoteForm createUserNote={createUserNote}/>);
        expect(screen.getByLabelText('title')).toBeInTheDocument();
        expect(screen.getByLabelText('description')).toBeInTheDocument();
    });
    it('should call the createUserNote function on form submit', () => {
        render(<CreateNoteForm createUserNote={createUserNote}/>);
        userEvent.type(screen.getByLabelText('title'), 'test title');
        userEvent.type(screen.getByLabelText('description'), 'test description');
        fireEvent.submit(screen.getByRole('form'));
        expect(createUserNote).toHaveBeenCalledTimes(1);
    });
});
