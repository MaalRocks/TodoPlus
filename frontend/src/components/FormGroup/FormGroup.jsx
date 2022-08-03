import "./formGroup.css";

const FormGroup = ({ type, id, name, value, placeholder, onChange }) => {
	return (
		<div className="form-group">
			<input
				className="form-control"
				type={type}
				id={id}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
};
export default FormGroup;
