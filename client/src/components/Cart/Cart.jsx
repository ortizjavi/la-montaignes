import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

// Components
import CartItem from "./CartItem.jsx";
import "./Cart.css";

// Actions
import * as productActions from "../../redux/actions/types/productActions.js";
import HorizontalNonLinearAlternativeLabelStepper from "../Address/pasarelaDeCompra.jsx";
import { getSales } from "../../redux/actions/types/adminActions.js";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, sales } = cart;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [offers, setOffers] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    window.localStorage.setItem(`cart`, JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    dispatch(productActions.addDiscount(offers));
  }, [offers, dispatch]);

  const alert = () => {
    if (sales) {
      let offertas = [];
      for (let i = 0; i < sales.length; i++) {
        if (sales[i].price <= total) {
          offertas.push(sales[i].discount);
        }
      }
      if (offertas.length === 0 && offers > 0) {
        setOpen(false);
        setOffers(0);
      }
      if (offertas.length >= 1) {
        setOffers(offertas[offertas.length - 1]);
        setOpen(true);
      }
    } else {
      console.log("holi2");
    }
  };

  const qtyChangeHandler = (id, qty) => {
    dispatch(productActions.addCartProduct(id, qty));
  };
  const removeFromCartHandler = (id) => {
    swal({
      title: "¿Estás seguro que quieres eliminar este producto?",
      icon: "warning",
      buttons: ["Cancelar", true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Tu producto fue eliminado con exito :)", {
          icon: "success",
        });
        dispatch(productActions.deleteCartProduct(id));
      } else {
        return swal("Tu producto sigue en el carrito :)");
      }
    });
  };

  const removeAllHandler = () => {
    swal({
      title: "¿Estás seguro que quieres vaciar tu carrito?",
      icon: "warning",
      buttons: ["Cancelar", true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete && cartItems.length === 0) {
        swal("Tu carrito se encuentra vacio :(", {
          icon: "error",
        });
      } else if (willDelete) {
        swal("Tu carrito se vació con exito :)", {
          icon: "success",
        });

        dispatch(productActions.deleteCartAll());
      }
    });
  };

  const getCartCount = () => {
    return cartItems.reduce(
      (stockSelected, item) => Number(item.stockSelected) + stockSelected,
      0
    );
  };

  const subtotal = getCartCount();

  useEffect(() => {
    dispatch(productActions.addCartSubTotal(subtotal));
    getCartSubTotal();
    dispatch(getSales());
  }, [subtotal, dispatch]);

  useEffect(() => {
    alert();
  }, [total, alert]);

  const getCartSubTotal = () => {
    const resultado = cartItems
      .reduce((price, item) => price + item.price * item.stockSelected, 0)
      .toFixed(2);
    setTotal(resultado);
  };

  return (
    <>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Carrito de compras</h2>

          {cartItems.length === 0 ? (
            <div>
              Tu carrito esta vacio.{" "}
              <Link to="/home" className="back-btn">
                Volver a la tienda
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
              />
            ))
          )}
        </div>

        <div className="cartDeleteAll_container">
          <button
            className="cartDeleteAll_btn"
            onClick={() => removeAllHandler()}
          >
            Vaciar carrito
          </button>
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            {offers === 0 ? (
              <p>${total}</p>
            ) : (
              <p>
                <b>${Math.round(total - total * (offers * 0.01))} </b>
                <br />
                <span className="discount">${total}</span>
              </p>
            )}
          </div>
          {offers > 0 && open && (
            <div className={classes.root}>
              <Alert onClose={() => setOpen(false)} severity="success">
                {`Tenes un descuento de ${offers}%!`}
              </Alert>
            </div>
          )}

          <div>
            <HorizontalNonLinearAlternativeLabelStepper />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
