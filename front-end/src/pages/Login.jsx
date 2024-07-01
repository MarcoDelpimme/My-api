import { Container } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";
import { Link } from "react-router-dom";
import { Triangle } from "react-loader-spinner"; // Importa il componente Triangle
import "../styles/LoginRegister.css";

const Login = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // Stato per gestire il caricamento
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const updateInputValue = (ev) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [ev.target.name]: ev.target.value,
    }));
  };

  const submitLogin = (ev) => {
    ev.preventDefault();
    setIsLoading(true); // Imposta isLoading a true durante il login

    axios
      .get("/sanctum/csrf-cookie")
      .then(() => axios.post("/login", formData))
      .then(() => axios.get("http://localhost:8000/api/user"))
      .then((res) => {
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.error("Errore durante il login:", error);
        setErrorMessage(error.response.data.message);
        // Gestire qui eventuali errori di login, ad esempio mostrando un messaggio all'utente
      })
      .finally(() => {
        setIsLoading(false); // Imposta isLoading a false dopo il completamento del login (successo o fallimento)
      });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <form onSubmit={(ev) => submitLogin(ev)} noValidate className="myFormLogin">
        <h1 className="text-center">LOG IN</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={(ev) => updateInputValue(ev)}
            value={formData.email}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={(ev) => updateInputValue(ev)}
            value={formData.password}
            required
          />
        </div>
        {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>} {/* Mostra l'errore */}
        <button type="submit" className="card-button w-100">
          Login
        </button>
        <p className="mt-5">
          Non sei registrato?{" "}
          <Link to="/register" className="ms-3 generalAnchor">
            Registrati ora <i className="bi bi-arrow-right" style={{ verticalAlign: "middle" }}></i>
          </Link>
        </p>
      </form>

      {isLoading && (
        <div
          className="loading-spinner"
          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <Triangle visible={true} height={100} width={100} color="#e58e27" ariaLabel="triangle-loading" />
        </div>
      )}
    </Container>
  );
};

export default Login;
