export default function Input({label, id}) {
	return (
		<p className="control">
			<label htmlFor={id}>{label}</label>
			<input name={id} id={id} required/>
		</p>
	);
}