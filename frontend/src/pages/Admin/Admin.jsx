import { useSelector } from "react-redux"
import CategoryForm from "../../components/CategoryForm/CategoryForm"
import "./admin.css"

export default function Admin() {
	const { user } = useSelector((state) => state.auth)

	return (
		<div className="admin">
			<div>HIer ensteht ein Adminbereich {user.name}</div>
			<div>
				Verschiedene Dinge die Man adden kann:
				<div>Kategory</div>
				<div>Punkte</div>
			</div>
		</div>
	)
}
