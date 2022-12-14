import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { login, reset } from "../../features/auth/authSlice"
import Spinner from "../../components/Spinner/Spinner"
import Button from "../../components/Button/Button"
import FormGroup from "../../components/FormGroup/FormGroup"
import "./login.css"

function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})

	const { email, password } = formData

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	)

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		if (isSuccess || user) {
			if (user.name !== "Admin") {
				navigate("/")
			} else if (user.name === "Admin") {
				navigate("/admin")
			}
		}

		dispatch(reset())
	}, [user, isError, isSuccess, message, navigate, dispatch])

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}

	const onSubmit = (e) => {
		e.preventDefault()

		const userData = {
			email,
			password,
		}

		dispatch(login(userData))
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div className="login">
			<section className="heading">
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p className="">Login and start setting goals</p>
			</section>

			<section className="form">
				<form onSubmit={onSubmit}>
					<FormGroup
						type="email"
						id="email"
						name="email"
						value={email}
						placeholder="Enter your email"
						onChange={onChange}
					/>
					<FormGroup
						type="password"
						id="password"
						name="password"
						value={password}
						placeholder="Enter password"
						onChange={onChange}
					/>
					<div className="form-group">
						<Button type="submit" btnText="Submit" />
					</div>
				</form>
			</section>
		</div>
	)
}

export default Login
