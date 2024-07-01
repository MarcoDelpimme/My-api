// MyCart.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Triangle } from "react-loader-spinner";
import { Elements } from "@stripe/react-stripe-js";
import MyCheckoutForm from "../components/MyCheckoutForm";
import PopUp from "../components/PopUp";
import "../styles/Cart.css";

const MyCart = ({ setUpdateCart, updateCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [popUp, setPopUp] = useState(null);

  useEffect(() => {
    fetchCart();
  }, [updateCart]);

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/orders");
      const cart = response.data;
      console.log(cart);
      if (cart[0] && cart[0].order_items) {
        setCartItems(cart[0].order_items);
        setTotalPrice(cart[0].total_price);
        setOrderId(cart[0].id); // Assume there's an id field for the order
      } else {
        setCartItems([]);
        setTotalPrice(0);
        setOrderId(null);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (orderId, orderItemId) => {
    try {
      await axios.delete(`http://localhost:8000/api/orders/${orderId}/items/${orderItemId}`);
      setUpdateCart(!updateCart);
      fetchCart();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const completeOrder = async (paymentMethodId) => {
    try {
      await axios.patch(`http://localhost:8000/api/orders/${orderId}/complete`, {
        payment_method: paymentMethodId,
      });
      setPopUp("Ordine completato con successo");
      setTimeout(() => {
        setPopUp(null);
      }, 3000);
      setUpdateCart(!updateCart);
      setIsPaying(false);
      fetchCart();
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-spinner ">
        <Triangle visible={true} height="150" width="150" color="#e58e27" ariaLabel="triangle-loading" />
      </div>
    );
  }

  return (
    <div className="cart-container">
      {popUp && <PopUp popUpText={popUp} />}
      <h1 className="text-center mt-3 mb-4">Il tuo carrello</h1>
      <div className="cart-header">
        <div className="header-item fw-bold">TITOLI</div>
        <div className="header-item fw-bold">PREZZO</div>
        <div className="header-item fw-bold">ACTION</div>
      </div>
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="item-title">
                <a className="generalAnchor" href={`/games/${item.game.id}`}>
                  {item.game.title}
                </a>
              </div>
              <div className="item-price">{item.price} $</div>
              <div className="item-action">
                <button onClick={() => removeFromCart(item.order_id, item.id)}>Rimuovi</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Il carrello è vuoto</p>
      )}
      <div className="cart-footer">
        <div className="total-price fw-bold fs-5">Totale: {totalPrice} $</div>
        {cartItems.length > 0 && !isPaying && (
          <button className="complete-order" onClick={() => setIsPaying(true)}>
            Completa ordine
          </button>
        )}
      </div>
      {isPaying && <MyCheckoutForm orderId={orderId} completeOrder={completeOrder} totalPrice={totalPrice} />}
    </div>
  );
};

export default MyCart;
