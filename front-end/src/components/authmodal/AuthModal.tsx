import {
	Button,
	Form,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "reactstrap"

interface AuthModalProps {
	isOpen: boolean
	closeModal: any
}

const AuthModal = ({ isOpen, closeModal }: AuthModalProps) => {
	return (
		<Modal isOpen={isOpen} backdrop={isOpen}>
			<ModalHeader>Modal title</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup>
						<Label for='exampleEmail'>Email</Label>
						<Input
							id='exampleEmail'
							name='email'
							placeholder='with a placeholder'
							type='email'
						/>
					</FormGroup>
					<FormGroup>
						<Label for='examplePassword'>Password</Label>
						<Input
							id='examplePassword'
							name='password'
							placeholder='password placeholder'
							type='password'
						/>
					</FormGroup>
					<Button>Submit</Button>
					<Button onClick={closeModal}>Cancel</Button>
				</Form>
			</ModalBody>
			<ModalFooter></ModalFooter>
		</Modal>
	)
}

export default AuthModal
