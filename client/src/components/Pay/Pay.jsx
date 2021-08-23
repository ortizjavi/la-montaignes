import "date-fns";
import { createOrder } from "../../redux/actions/types/productActions";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";

export default function Pay({ cart, medio }) {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.session.user);
  const address = useSelector((state) => state.cart.address);

  const handlePay = (e) => {
    e.preventDefault();
    console.log(cart);
    console.log(usuario._id);

    if (medio === "efectivo") {
      swal({
        title: "Gracias por tu compra!",
        icon: "success",
      });
      dispatch(createOrder(cart, usuario._id, address));
    } else {
      dispatch(createOrder(cart, usuario._id, address, true));
    }
  };
  return (
    <div>
      <form>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handlePay}
        >
          Ir a pagar
        </Button>
      </form>
    </div>
  );
}
