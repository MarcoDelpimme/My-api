import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Row } from "react-bootstrap";
import { Triangle } from "react-loader-spinner";
import ReviewComponent from "../components/ReviewComponent";
import { RelatedCarousel } from "../components/RelatedCarousel";
import "../styles/GamePage.css";

const GamePage = ({ setUpdateCart, updateCart, userId }) => {
  const [game, setGame] = useState(null);
  const [relatedGames, setRelatedGames] = useState([]);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetchGame();
  }, [id]);

  useEffect(() => {
    checkCartAndLibrary();
  }, [game, updateCart]);

  const fetchGame = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/games/${id}`);
      setGame(response.data);
      fetchRelatedGames(response.data.categories);
    } catch (error) {
      console.error("Error fetching game:", error);
    } finally {
      setIsLoading(false); // Stop loading once data is fetched
    }
  };

  const checkCartAndLibrary = async () => {
    if (!game) return;

    try {
      // Check if game is in the cart
      const cartResponse = await axios.get("http://localhost:8000/api/orders");
      const cart = cartResponse.data;
      if (cart[0] && cart[0].order_items.some((item) => item.game.id === game.id)) {
        setIsAddedToCart(true);
      }

      // Check if game is in the library
      const libraryResponse = await axios.get("http://localhost:8000/api/user/library");
      const library = libraryResponse.data;
      if (library.some((item) => item.id === game.id)) {
        setIsPurchased(true);
      }
    } catch (error) {
      console.error("Error checking cart and library:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/orders/add-to-cart", {
        game_id: id,
        quantity: 1,
      });
      if (response.status === 201) {
        console.log("Game successfully added to cart!");
        setIsAddedToCart(true);
        setUpdateCart(!updateCart);
      } else {
        console.error("Error adding game to cart");
      }
    } catch (error) {
      console.error("Error making request to server:", error);
    }
  };

  const fetchRelatedGames = async (categories) => {
    if (categories.length === 0) return;

    const categoryNames = categories.map((category) => category.name).join(",");
    try {
      const response = await axios.get(`http://localhost:8000/api/games/category/${categoryNames}`);
      let games = response.data;

      // Mescola i giochi e seleziona un massimo di 4
      games = shuffleArray(games).slice(0, 4);

      setRelatedGames(games);
    } catch (error) {
      console.error("Error fetching related games:", error);
    }
  };

  // Funzione per mescolare un array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderDescription = () => {
    const maxLength = 150; // Numero massimo di caratteri da mostrare
    if (showFullDescription || game.description.length <= maxLength) {
      return game.description;
    }
    return game.description.slice(0, maxLength) + "...";
  };

  if (isLoading) {
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
    game && (
      <div className="game-page overflow-hidden my-5">
        <Row className="text-white">
          <div className="col-12 mb-3">
            <img src={game.game_img_large} alt="Large game" className="w-100" />
          </div>
          <div className="row p-5 mt-4">
            <div className="col-6 mb-3">
              <img src={game.game_img} alt="Game" className="w-100" />
            </div>
            <div className="col-6 mb-3">
              <h1>{game.title}</h1>
              <h5>Publisher: {game.publisher}</h5>
              <h5>Game Developer: {game.developer}</h5>
              <p>Release Date: {game.release_date}</p>
              <p>Category: {game.categories.map((category) => category.name).join(", ")}</p>
              <p>
                {renderDescription()}
                {game.description.length > 150 && (
                  <a className="link-description" onClick={toggleDescription} href="#2">
                    {showFullDescription ? "Leggi meno" : "Leggi di più"}
                  </a>
                )}
              </p>
              <div className="d-flex justify-content-between align-items-center ">
                <p className="m-0 text-white fs-5">Price: {game.price} $</p>
                <button
                  className={`card-button ${isAddedToCart || isPurchased ? "disabled" : ""}`}
                  onClick={handleAddToCart}
                  disabled={isAddedToCart || isPurchased}
                >
                  {isPurchased ? "Acquistato" : isAddedToCart ? "Nel carrello" : "Aggiungi al carrello"}
                </button>
              </div>
            </div>
            <div className="p-3 w-100">
              <h2 className="text-white">Trailer</h2>
              <iframe
                className="w-100 rounded-4"
                width="560"
                height="315"
                src={game.video}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </Row>

        <Row className="my-3 justify-content-center p-4">
          <div className="col-12 text-center" id="container-related">
            <h2 className="text-white">Giochi Correlati</h2>
            <section className="page mt-3 mb-5">
              <RelatedCarousel items={relatedGames} currentGameId={game.id} />
            </section>
          </div>
          <div className="col-12">
            <ReviewComponent gameId={id} />
          </div>
        </Row>
      </div>
    )
  );
};

export default GamePage;
