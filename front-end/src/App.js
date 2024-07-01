import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import "./App.css";
import GuestRoutes from "./pages/GuestRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { LOGIN } from "./redux/actions";
import { useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import axios from "axios";
import NotFound from "./pages/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import TopNav from "./components/TopNab";
import { Container, Form } from "react-bootstrap";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import GameEdit from "./pages/GameEdit";
import AddGame from "./pages/AddGame";
import UserDashboard from "./pages/UserDashboard";
import MyFooter from "./components/MyFooter";
import MyCart from "./pages/MyCart";
import CategoryGames from "./pages/CategoryGames";
import Library from "./pages/Library";
import MyLogoHeader from "./components/MyLogoHeader";
import Store from "./pages/Store";
import AdminDashboard from "./pages/AdminDashboard";
import MyCheckoutForm from "./components/MyCheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [init, setInit] = useState(false);
  const [updateCart, setUpdateCart] = useState(false);
  const stripePromise = loadStripe(
    "pk_test_51PVYOSIt7liiXphWUPsVZqRtLztyrsK2MVD3MBpCOvUMfUKWnEO0GbSmzbjtcwAzpLq8F0l6ZpJOlPS4rrR1xrn100qHKI0N1F"
  );
  useEffect(() => {
    if (particlesEnabled) {
      initParticlesEngine(async (engine) => {
        await loadAll(engine);
      }).then(() => {
        setInit(true);
      });
    } else {
      setInit(false);
    }
  }, [particlesEnabled]);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#4e3f3b",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#000000",
        },
        links: {
          color: "#000000",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 4,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "triangle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  const options1 = {
    appearance: {
      theme: "night",
      labels: "floating",
    },
  };

  useEffect(() => {
    axios("/api/user")
      .then((res) => {
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
        setIsAdmin(res.data.role === "admin");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));
  }, [dispatch]);

  const toggleParticles = () => {
    setParticlesEnabled(!particlesEnabled);
  };

  if (loaded) {
    return (
      <>
        <BrowserRouter>
          <MyLogoHeader />
          <div className="MainContent">
            {particlesEnabled && init && (
              <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
            )}
            <TopNav updateCart={updateCart} />

            <Container>
              <Form id="buttonParticles">
                <Form.Check
                  className="text-white fw-bold"
                  type="switch"
                  id="custom-switch"
                  checked={particlesEnabled}
                  onChange={toggleParticles}
                  label="Particles"
                />
              </Form>
              <Routes>
                {isAdmin && <Route path="/games/edit/:id" element={<GameEdit />} />}
                <Route path="/add-game" element={<AddGame />} />
                <Route path="/" element={<Home />} />

                <Route element={<GuestRoutes />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/library" element={<Library />} />
                  <Route
                    path="/mycart"
                    element={
                      <Elements stripe={stripePromise} options={options1}>
                        <MyCart setUpdateCart={setUpdateCart} updateCart={updateCart} />{" "}
                      </Elements>
                    }
                  />
                  <Route
                    path="/games/:id"
                    element={<GamePage setUpdateCart={setUpdateCart} updateCart={updateCart} />}
                  />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/category/:categoryName" element={<CategoryGames />} />
                  <Route path="/store" element={<Store />} />
                </Route>
                <Route path="/404" element={<NotFound />} />
              </Routes>
            </Container>
          </div>
          <MyFooter />
        </BrowserRouter>
      </>
    );
  }

  return <></>;
}

export default App;
