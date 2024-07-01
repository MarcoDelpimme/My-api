import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";

const CategoryGames = () => {
  const { categoryName } = useParams();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/games/category/${categoryName}`);
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [categoryName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container className="my-5 d-flex flex-wrap justify-content-center gap-5">
        {games.map((game) => (
          <div class="card" key={game.id}>
            <img src={game.game_img} alt="" />
            <div class="card__content">
              <div className="d-flex flex-column gap-2" onClick={() => (window.location.href = `/games/${game.id}`)}>
                {" "}
                <p className="card__title fw-400">{game.title}</p>{" "}
                <p className="card__category">
                  <p> {game.description.length > 100 ? `${game.description.slice(0, 100)}...` : game.description}</p>
                  Category: {game.categories.map((category) => category.name).join(", ")}
                </p>
              </div>

              <div class="card__price">
                {" "}
                <p class="card__description">Price: {game.price}$</p>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
};

export default CategoryGames;
