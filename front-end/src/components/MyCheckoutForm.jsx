import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const MyCheckoutForm = ({ completeOrder, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name,
        address: {
          line1: address,
          city,
          state,
          postal_code: zip,
        },
      },
    });

    if (error) {
      // Mostra l'errore solo dopo che l'utente ha tentato di inviare il form
      if (event.type === "submit") {
        setErrorMessage(error.message);
      }
    } else {
      await completeOrder(paymentMethod.id);
    }
  };

  return (
    <div
      className="text-center"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          padding: "20px",

          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ color: "#e58e27" }}>Completa Ordine</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#e58e27" }}>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #e58e27",
                backgroundColor: "#161a1e",
                color: "#fff",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#e58e27" }}>Indirizzo</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #e58e27",
                backgroundColor: "#161a1e",
                color: "#fff",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#e58e27" }}>Città</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #e58e27",
                backgroundColor: "#161a1e",
                color: "#fff",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#e58e27" }}>Stato</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #e58e27",
                backgroundColor: "#161a1e",
                color: "#fff",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#e58e27" }}>CAP</label>
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #e58e27",
                backgroundColor: "#161a1e",
                color: "#fff",
              }}
            />
          </div>
          <div className="mt-3" style={{ marginBottom: "15px" }}>
            <h6 style={{ color: "#e58e27", marginBottom: "10px" }}>CARTA</h6>
            <div
              style={{ padding: "10px", borderRadius: "4px", border: "1px solid #e58e27", backgroundColor: "#161a1e" }}
            >
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#fff", // Testo bianco per numero e dati della carta
                      "::placeholder": {
                        color: "#9a9a9a", // Colore del placeholder
                      },
                    },
                    invalid: {
                      color: "#e58e27", // Colore per input non validi
                    },
                  },
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={!stripe}
            style={{
              width: "100%",
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#e58e27",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              marginTop: "20px",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            Paga {totalPrice} $
          </button>
          {errorMessage && <div style={{ color: "#e58e27", marginTop: "10px" }}>{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default MyCheckoutForm;
