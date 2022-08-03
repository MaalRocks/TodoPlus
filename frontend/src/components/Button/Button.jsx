import "./button.css";

const Button = ({ type, btnText }) => {
	return (
		<button type={type} className="btn btn-block">
			{btnText}
		</button>
	);
};

export default Button;
