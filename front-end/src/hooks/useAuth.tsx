import { useContext } from "react"
import { AuthContext } from "../stores/authProvider"

const useAuth = () => {
	return useContext(AuthContext)
}

export { useAuth }
