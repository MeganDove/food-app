import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

export default function Modal({children, open, className=""}) {
	const dialog = useRef();

	console.log(open);

	useEffect(() => {
		if(open) {
			dialog.current.showModal();
		} else {
			dialog.current.close();
		}
	}, [open])

	return createPortal(
		<dialog ref={dialog} className={`modal ${className}`}>{children}</dialog>,
	document.getElementById("modal"));
}