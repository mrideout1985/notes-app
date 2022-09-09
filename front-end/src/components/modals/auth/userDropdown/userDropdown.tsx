import { DropdownButton, Dropdown } from "react-bootstrap"
import SvgFeedPerson from "../../../icons/FeedPerson"

interface DropdownProps {
	onClick: () => void
}

const AuthDropdown = ({ onClick }: DropdownProps): JSX.Element => {
	return (
		<DropdownButton
			title={<SvgFeedPerson size={35} />}
			menuVariant='dark'
			variant='none'
		>
			<Dropdown.Item href='/profile'>Profile</Dropdown.Item>
			<Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
			<Dropdown.Item onClick={onClick}>Logout</Dropdown.Item>
		</DropdownButton>
	)
}

export default AuthDropdown
