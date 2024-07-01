import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Carousel1 from "../components/Carousel1";
import { Triangle } from "react-loader-spinner";
import "../styles/home.css";

const Home = () => {
  const [games, setGames] = useState([]);
  const [topRatedGames, setTopRatedGames] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = () => {
    axios.get("http://localhost:8000/api/games").then((res) => {
      const gamesWithRatings = res.data.map((game) => {
        const totalRating = game.reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = game.reviews.length ? totalRating / game.reviews.length : 0;
        return { ...game, averageRating };
      });
      setGames(gamesWithRatings);
      const sortedGames = [...gamesWithRatings].sort((a, b) => b.averageRating - a.averageRating);
      setTopRatedGames(sortedGames.slice(0, 4));
      setLoading(false); // Set loading to false once data is fetched
    });
  };

  const handleDeleteGame = (gameId) => {
    axios
      .delete(`http://localhost:8000/api/games/${gameId}`)
      .then(() => fetchGames())
      .catch((error) => console.error("Error deleting game:", error));
  };

  if (loading) {
    return (
      <div
        className="loading-spinner"
        style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Triangle visible={true} height="150" width="150" color="#e58e27" ariaLabel="triangle-loading" />
      </div>
    );
  }

  return (
    <Container className="my-3 p-5 fs-5">
      <div className="title-home-container">
        <h1>
          BENVENUTI SU <span>GOJO GAMES</span>
        </h1>
      </div>
      <h2 className="text-center text-white mb-4">LE NOVITA`</h2>
      <Carousel1 games={games} />

      {/* Giochi più votati */}
      <Container className="my-3 p-5 fs-5">
        <h2 className="text-center text-white mb-4">I giochi più votati dagli utenti</h2>
        <div className="row mt-1 gy-4 mb-5">
          {topRatedGames.map((game) => (
            <div className="col-12 col-md-3 mt-1" key={game.id}>
              <div className="myhomecard">
                <div className="p-3 pt-3" style={{ maxHeight: "200px", overflow: "hidden", maxWidth: "100%" }}>
                  <img
                    src={game.game_img}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                    alt={game.title}
                  />
                </div>
                <div className="p-4 text-white d-flex flex-column justify-content-between h-100">
                  <div className="text-start mt-2">
                    <h4>{game.title}</h4>
                  </div>
                  <div>
                    <p className="p-0">{game.publisher}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span style={{ fontSize: "25px", fontWeight: "bold", color: "#e58e27" }}>
                      {game.averageRating.toFixed(1)} <i className="bi bi-star-fill"></i>
                    </span>
                    <Link to={`/games/${game.id}`} className="text-white text-decoration-none">
                      <button className="card-buttonhome">Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
      {/* Giochi più votati */}

      {/* News */}
      <Container>
        <h2 className="text-center text-white">IN ARRIVO</h2>

        <div className="row news mt-5 align-items-center">
          <div className="col-12 col-md-4" style={{ maxHeight: "300px", overflow: "hidden", maxWidth: "100%" }}>
            <img
              src="/newsImage/elden-ring-Cover.jpg"
              alt=""
              width={"100%"}
              height={"100%"}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="col-12 col-md-5 text-white">
            <h3>ELDEN RING</h3>
            <p>In arrivo il 28/09/2024</p>
          </div>
          <div className="col-12 col-md-3 text-white">
            <p>Publisher: CAPCOM</p>
            <p>Editor: From Software Games</p>
          </div>
        </div>

        <div className="row news mt-5 align-items-center">
          <div className="col-12 col-md-4" style={{ maxHeight: "300px", overflow: "hidden", maxWidth: "100%" }}>
            <img
              src="/newsImage/grand-theft-auto-cover.jpg"
              alt=""
              width={"100%"}
              height={"100%"}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="col-12 col-md-5 text-white">
            <h3>Grand Theft Auto VI</h3>
            <p>In arrivo il 31/02/2026</p>
          </div>
          <div className="col-12 col-md-3 text-white">
            <p>Publisher: RockstarGames</p>
            <p>Editor: Rockstar</p>
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default Home;
