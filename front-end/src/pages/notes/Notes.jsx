import { Masonry } from '@mui/lab';
import { Box, CircularProgress } from '@mui/material';
import { useCallback, useState } from 'react';
import useGetUserNotes from '../../api/hooks/getUserNotes';
import useHandleArchiveNotes from '../../api/hooks/useHandleArchive';
import { createNote, deleteNote, updateNote } from '../../api/services/services';
import CreateNote from '../../components/forms/CreateNoteForm';
import NoteCard from '../../components/notecard/NoteCard';
import useUserStore from '../../stores/authstore';
import styles from './Notes.module.scss';
const Notes = () => {
    const store = useUserStore();
    const [sortBy, setSortBy] = useState('desc');
    const user = useUserStore();
    const { notes, error, isLoading, mutate } = useGetUserNotes({
        email: store.currentUser?.email,
        sortBy: sortBy,
    });
    const { handleArchiveNotes } = useHandleArchiveNotes(mutate);
    const createUserNote = useCallback((handleSubmit, isFocused, reset) => handleSubmit(async (data) => {
        if (data.title || data.description !== '') {
            createNote(data, user.currentUser?.token, user.currentUser?.email).then((res) => {
                if (res.status === 201) {
                    isFocused(false);
                    reset();
                    mutate();
                }
            });
        }
    }), []);
    const removeNote = async (id) => {
        await deleteNote(id, store.currentUser?.token).then((res) => {
            if (res.status === 200) {
                mutate();
            }
        });
    };
    const updateUserNote = useCallback((id, func, handleSubmit) => handleSubmit(async (data) => {
        if (data.title || data.description !== '') {
            await updateNote(data, store.currentUser?.token, store.currentUser?.email, id).then((res) => {
                if (res?.status === 200) {
                    func();
                    mutate();
                }
            });
        }
    }), []);
    const handleAddToArchive = (id) => {
        handleArchiveNotes(id, true).then((res) => {
            mutate();
        });
    };
    const handleRenderCard = () => {
        if (!notes) {
            return (<Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100%',
                    zIndex: 100,
                }}>
					<CircularProgress color="error"/>
				</Box>);
        }
        return (<Box className={styles['note-page-layout']}>
				<Box className={styles['create-note-container']}>
					<CreateNote createUserNote={createUserNote}/>
				</Box>
				<Masonry columns={{ sm: 1, md: 3, lg: 4, xl: 6 }} spacing={2} className={styles['notes']} children={notes &&
                notes.map((note) => (<NoteCard removeNote={removeNote} key={note.id} archiveNote={handleAddToArchive} updateNote={updateUserNote} description={note.description} title={note.title} id={note.id}/>))}/>
			</Box>);
    };
    return handleRenderCard();
};
export default Notes;
