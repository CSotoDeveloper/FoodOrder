import React, { useContext } from "react";
import useHttp from "../hooks/useHttp";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import ErrorPage from "./ErrorPage";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Modal from "./UI/Modal";

const requestConfig = {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
};

const Checkout = () => {
	const cartCtx = useContext(CartContext);
	const userProgresCtx = useContext(UserProgressContext);
	const cartTotal = cartCtx.items.reduce(
		(totalPrice, item) => totalPrice + item.quantity * item.price,
		0,
	);

	const {
		data,
		error,
		isLoading: isSending,
		sendRequest,
        clearData
	} = useHttp("http://localhost:4000/orders", requestConfig);

	function handleClose() {
		userProgresCtx.hideCheckout();
	}

    function handleFinish(){
        userProgresCtx.hideCheckout()
        cartCtx.clearCart()
        clearData()
    }

	function handleSubmit(event) {
		event.preventDefault();
		const fd = new FormData(event.target);
		const customerData = Object.fromEntries(fd.entries()); //{email: ...@.com}

		sendRequest(
			JSON.stringify({
				order: {
					items: cartCtx.items,
					customer: customerData,
				},
			}),
		);
	}

	let actions = (
		<>
			<Button onClick={handleClose} type="button" textOnly>
				Close
			</Button>
			<Button>Submit Order</Button>
		</>
	);

    if (isSending) {
        actions = <span>Sending order data...</span>
    }

    if (data && !error) {
        return <Modal open={userProgresCtx.progress === "checkout"} onClose={handleClose}>
            <h2>Success!</h2>
            <p>Your order was submitted succesfully</p>
            <p>We will get back to you with more details via email within the next few minutes</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
    }

	return (
		<Modal open={userProgresCtx.progress === "checkout"} onClose={handleClose}>
			<form onSubmit={handleSubmit}>
				<h2>Checkout</h2>
				<p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

				<Input id="name" label="Full Name" type="text" />
				<Input id="email" label="E-Mail Address" type="email" />
				<Input id="street" label="Street" type="text" />
				<div className="control-row">
					<Input label="Postal Code" type="text" id="postal-code" />
					<Input label="City" type="text" id="city" />
				</div>

                {error && <ErrorPage title={"Failed to submit order"} message={error}/> } 

				<p className="modal-actions">{actions}</p>
			</form>
		</Modal>
	);
};

export default Checkout;
