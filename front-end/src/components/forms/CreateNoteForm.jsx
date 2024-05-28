import { Box, FormGroup, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useClickAway } from 'react-use';
import styles from './CreateNoteForm.module.scss';
const CreateNote = ({ createUserNote }) => {
    const submitRef = useRef(null);
    const form = useForm();
    const [focused, setFocused] = useState(false);
    const onSubmit = createUserNote(form.handleSubmit, setFocused, form.reset);
    const handleClickAway = () => {
        if (form.formState.touchedFields) {
            onSubmit();
            form.reset();
        }
        setFocused(false);
    };
    const handleFocus = () => {
        setFocused(true);
    };
    useClickAway(submitRef, handleClickAway);
    return (<Box className={styles.container}>
			<form ref={submitRef} onSubmit={onSubmit} className={styles.form}>
				<FormGroup className={styles.formgroup}>
					<Box className={styles.inputgroup}>
						<TextField {...form.register('title')} className={styles.title} hidden={!focused} aria-label="title of note" placeholder="Title" variant="outlined"/>
						<div className={styles.inputwithtoggle}>
							<TextField {...form.register('description')} className={styles.description} onFocus={handleFocus} placeholder="Take a note..." aria-label="description of note" variant="outlined"/>
						</div>
					</Box>
				</FormGroup>
			</form>
		</Box>);
};
export default CreateNote;
