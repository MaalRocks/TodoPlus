import { useState } from "react"
import { useDispatch } from "react-redux"
import { createGoal } from "../../features/goals/goalSlice"
import Button from "../Button/Button"
import Dropdown from "../Dropdown/Dropdown"

function GoalForm() {
	const [text, setText] = useState("")
	

	const dispatch = useDispatch()

	const onSubmit = (e) => {
		e.preventDefault()

		dispatch(createGoal({ text }))
		setText("")
	}

	return (
		<section className="form">
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="text">Task</label>
					<input
						type="text"
						name="text"
						id="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					<Dropdown categories={} />
				</div>

				<div className="form-group">
					<Button type="submit" btnText="Task hinzufügen" />
				</div>
			</form>
		</section>
	)
}

export default GoalForm
