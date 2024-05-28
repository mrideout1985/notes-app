import { fireEvent, render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import NoteCardModal from './NoteCardModal';
const mockHandleOnClose = jest.fn();
const mockHandleOnSubmit = jest.fn();
const mockRefetch = {
    execute: jest.fn(() => Promise.resolve()),
};
const mockToggle = jest.fn();
describe('NoteCardModal', () => {
    it('should render a form with a title and description input and a submit button', () => {
        const screen = render(<NoteCardModal description="description" title="title" handleOnClose={mockHandleOnClose} handleOnSubmit={mockHandleOnSubmit} id={1} open={true} refetch={mockRefetch} toggle={mockToggle} key={1}/>);
        expect(screen.getByLabelText('title')).toBeInTheDocument();
        expect(screen.getByLabelText('description')).toBeInTheDocument();
        expect(screen.getByRole('button', {
            name: 'Complete',
        })).toBeInTheDocument();
    });
    it('should call the handleOnClose function when the submit button is clicked', async () => {
        const screen = render(<NoteCardModal description="description" title="title" handleOnClose={mockHandleOnClose} handleOnSubmit={mockHandleOnSubmit} id={1} open={true} refetch={mockRefetch} toggle={mockToggle} key={1}/>);
        const submitButton = screen.getByRole('button', {
            name: 'Complete',
        });
        act(() => {
            fireEvent.click(submitButton);
        });
        waitFor(() => expect(mockHandleOnClose).toHaveBeenCalled());
    });
    it('should call the refetch function when the submit button is clicked', async () => {
        const screen = render(<NoteCardModal description="description" title="title" handleOnClose={mockHandleOnClose} handleOnSubmit={mockHandleOnSubmit} id={1} open={true} refetch={mockRefetch} toggle={mockToggle} key={1}/>);
        const submitButton = screen.getByRole('button', {
            name: 'Complete',
        });
        act(() => {
            fireEvent.click(submitButton);
        });
        waitFor(() => expect(mockRefetch.execute).toHaveBeenCalled());
    });
    it('should allow the user to change the title and description of the note card', async () => {
        const screen = render(<NoteCardModal description="description" title="title" handleOnClose={mockHandleOnClose} handleOnSubmit={mockHandleOnSubmit} id={1} open={true} refetch={mockRefetch} toggle={mockToggle} key={1}/>);
        const titleInput = screen.getByLabelText('title');
        const descriptionInput = screen.getByLabelText('description');
        act(() => {
            fireEvent.change(titleInput, { target: { value: 'new title' } });
            fireEvent.change(descriptionInput, {
                target: { value: 'new description' },
            });
        });
        expect(titleInput).toHaveValue('new title');
        expect(descriptionInput).toHaveValue('new description');
    });
});
