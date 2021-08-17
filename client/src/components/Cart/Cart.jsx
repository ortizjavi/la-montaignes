import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";

// Components
import CartItem from "./CartItem.jsx";
import './Cart.css';
import Pay from '../Pay/Pay';

// Actions
import { addCartProduct, deleteCartProduct, deleteCartAll } from "../../redux/actions/types/productActions";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
      window.localStorage.setItem(`cart`, JSON.stringify(cartItems))
  }, [cartItems]);

  const qtyChangeHandler = (id, qty) => {
    dispatch(addCartProduct(id, qty));
  };

  const removeFromCartHandler = (id) => {
      swal({
        title: '¿Estás seguro que quieres eliminar este producto?',
        icon: 'warning',
        buttons: ['Cancelar', true],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal(
            'Tu producto fue eliminado con exitó',{
              icon: 'success'
            })
            dispatch(deleteCartProduct(id)); 
        }else{
          return swal('Tu producto sigue en el carrito :)')
        }
      })
  };

  const removeAllHandler = () => {
    swal({
      title: '¿Estás seguro que deseas vaciar tu carrito?',
      icon: 'warning',
      buttons: ['Cancelar', true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete && cartItems.length === 0) {
        swal(
          'Tu carrito se encuentra vacio :(', {
            icon: 'error'
          })
      }else if (willDelete) {
        swal('Tu carrito se vacio con exitó :)', {
          icon: 'success'
        })
        dispatch(deleteCartAll())
      } 
    })
  }

  const getCartCount = () => {
    return cartItems.reduce((stockSelected, item) => Number(item.stockSelected) + stockSelected, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.stockSelected, 0)
      .toFixed(2);
  };

  return (
    <>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Carrito de compras</h2>

          {cartItems.length === 0 ? (
            <div>
              Tu carrito esta vacio. <Link to="/home" className='back-btn'>Volver a la tienda</Link>
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

        <div className='cartDeleteAll_container'>
          <button className='cartDeleteAll_btn' onClick={() => removeAllHandler()}>Vaciar carrito</button>
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>${getCartSubTotal()}</p>
          </div>
          <div>
            <Pay cart={cartItems}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
