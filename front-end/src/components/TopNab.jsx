import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { LOGOUT } from "../redux/actions";
import { CiShoppingCart } from "react-icons/ci";
import "../styles/Navbar.css";

const MyNavBar = ({ updateCart }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const logout = () => {
    axios.post("/logout").then(() => dispatch({ type: LOGOUT }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const navBar = document.querySelector(".mynavbar");
      if (navBar && window.scrollY > 200) {
        navBar.classList.add("no-border-radius");
      } else {
        navBar.classList.remove("no-border-radius");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchCartItemsCount = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/orders");
        console.log(response, "response");
        setCartItemsCount(
          response.data[0] ? response.data[0].order_items.reduce((acc, item) => acc + item.quantity, 0) : 0
        );
      } catch (error) {
        setCartItemsCount(0);
        console.error(error);
      }
    };
    fetchCartItemsCount();
  }, [location.pathname, updateCart]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/games");
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filteredGames = games.filter(
        (game) => game.title && game.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredGames);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, games]);

  return (
    <div className="position-sticky top-0 p-0  container-fluid " style={{ zIndex: "100" }}>
      <div className="mynavbar d-flex gap-5 py-4 px-5 justify-content-between align-items-center container-fluid">
        <div className="d-flex gap-5">
          <Link to="/">Home</Link>
          <Link to="/store">Game Store</Link>
          <Link to="/library">Your Library</Link>
          {user && user.role === "admin" && <Link to="/admin/dashboard">Admin Dashboard</Link>}
        </div>
        <div className="search-box">
          <button className="btn-search">
            <i className="bi bi-search"></i>
          </button>
          <input
            type="text"
            className="input-search"
            placeholder="Type to Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div className="search-results position-absolute w-100 bg-white shadow-lg">
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  to={`/games/${result.id}`}
                  className=" search-result-item d-block p-2 linkSearchbar "
                  onClick={() => setSearchQuery("")}
                >
                  <div className="d-flex gap-2 align-items-center">
                    <div>
                      <img src={result.game_img} alt="" width={50} height={50} className="object-fit-cover rounded-5" />
                    </div>
                    <div>{result.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="d-flex gap-5 align-items-center">
          <Link to="/mycart" className="position-relative">
            <CiShoppingCart style={{ fontSize: "30px", color: "grey" }} />
            {cartItemsCount > 0 && (
              <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItemsCount}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <Link to="/dashboard">{user.name}</Link>
              <img
                src={user.profile_img}
                alt="Profile"
                style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}
              />
              <button className="card-button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyNavBar;
