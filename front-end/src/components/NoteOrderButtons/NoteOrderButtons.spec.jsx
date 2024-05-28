import { screen, render } from '@testing-library/react';
import NoteOrderButtons from './NoteOrderButtons';
const setSortBy = jest.fn();
describe('NoteOrderButtons', () => {
    it('should render a toggle button', () => {
        render(<NoteOrderButtons sortBy="asc" setSortBy={() => setSortBy('desc')}/>);
        expect(screen.getAllByRole('button')).toHaveLength(1);
    });
    it('should call setSortBy when clicked', () => {
        render(<NoteOrderButtons sortBy="asc" setSortBy={() => setSortBy('desc')}/>);
        screen.getByRole('button').click();
        expect(setSortBy).toBeCalled();
    });
    it.each(['asc', 'desc'])(`should call setSortBy with %s`, (arg) => {
        render(<NoteOrderButtons sortBy={'desc'} setSortBy={() => setSortBy(arg)}/>);
        screen.getByRole('button').click();
        expect(setSortBy).toBeCalledWith(arg);
    });
});
