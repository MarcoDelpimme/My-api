import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EditGame.css";

const GameEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState({
    title: "",
    description: "",
    release_date: "",
    developer: "",
    publisher: "",
    price: "",
    category_ids: [],
    video: "",
  });
  const [categories, setCategories] = useState([]);
  const [gameImage, setGameImage] = useState(null);
  const [gameImageLarge, setGameImageLarge] = useState(null);

  useEffect(() => {
    fetchGame();
    fetchCategories();
  }, []);

  const fetchGame = () => {
    axios.get(`http://localhost:8000/api/games/${id}`).then((res) =>
      setGame({
        title: res.data.title,
        description: res.data.description,
        release_date: res.data.release_date,
        developer: res.data.developer,
        publisher: res.data.publisher,
        price: res.data.price,
        category_ids: res.data.categories.map((category) => category.id),
        video: res.data.video || "",
      })
    );
  };

  const fetchCategories = () => {
    axios.get(`http://localhost:8000/api/categories`).then((res) => setCategories(res.data));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGame({
      ...game,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("game_img", gameImage);
    formData.append("game_img_large", gameImageLarge);
    formData.append("video", game.video);

    try {
      await axios.post(`http://localhost:8000/api/game/${id}/update-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await updateGame();
      navigate("/");
    } catch (error) {
      console.error("Error updating game image:", error);
    }
  };

  const updateGame = () => {
    const { title, description, release_date, developer, publisher, price, category_ids, video } = game;
    const categoriesArray = Array.isArray(category_ids) ? category_ids : [category_ids];
    axios
      .put(`http://localhost:8000/api/games/${id}`, {
        title,
        description,
        release_date,
        developer,
        publisher,
        price,
        category_ids: categoriesArray,
        video,
      })
      .then(() => {})
      .catch((error) => {
        console.error("Error updating game:", error);
      });
  };

  const handleImageChange = (event) => {
    setGameImage(event.target.files[0]);
  };

  const handleLargeImageChange = (event) => {
    setGameImageLarge(event.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="myeditgameform text-white">
        <h1 className="text-center">Modifica {game.title}</h1>

        {/* Trailer */}
        <div className="mb-4">
          <label htmlFor="video" className="form-label">
            URL del video
          </label>
          <input
            type="text"
            className="form-control"
            id="video"
            name="video"
            value={game.video}
            onChange={handleChange}
          />
        </div>
        {/* Titolo */}
        <div className="mb-4">
          <label htmlFor="title" className="form-label">
            Titolo
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={game.title}
            onChange={handleChange}
          />
        </div>
        {/* Descrizione */}
        <div className="mb-4">
          <label htmlFor="description" className="form-label">
            Descrizione
          </label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={game.description}
            onChange={handleChange}
          />
        </div>
        {/* data di rilascio */}
        <div className="mb-4">
          <label htmlFor="release_date" className="form-label">
            Data di rilascio
          </label>
          <input
            type="date"
            className="form-control"
            id="release_date"
            name="release_date"
            value={game.release_date}
            onChange={handleChange}
          />
        </div>
        {/* sviluppatore */}
        <div className="mb-4">
          <label htmlFor="developer" className="form-label">
            Sviluppatore
          </label>
          <input
            type="text"
            className="form-control"
            id="developer"
            name="developer"
            value={game.developer}
            onChange={handleChange}
          />
        </div>
        {/*  prezzo */}
        <div className="mb-4">
          <label htmlFor="price" className="form-label">
            Prezzo
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={game.price}
            onChange={handleChange}
          />
        </div>
        {/* publisher */}
        <div className="mb-4">
          <label htmlFor="publisher" className="form-label">
            Editore
          </label>
          <input
            type="text"
            className="form-control"
            id="publisher"
            name="publisher"
            value={game.publisher}
            onChange={handleChange}
          />
        </div>
        {/* Immagine banner */}
        <div className="mb-4">
          <label htmlFor="game_img_large" className="form-label">
            Immagine grande del gioco
          </label>
          <input
            type="file"
            className="form-control"
            id="game_img_large"
            name="game_img_large"
            onChange={handleLargeImageChange}
          />
        </div>
        {/* Immagine coopertina */}
        <div className="mb-4">
          <label htmlFor="game_img" className="form-label">
            Immagine del gioco
          </label>
          <input type="file" className="form-control" id="game_img" name="game_img" onChange={handleImageChange} />
        </div>
        {/* categories */}
        <div className="mb-4">
          <label htmlFor="category_ids" className="form-label">
            Categorie
          </label>
          <select
            className="form-select"
            id="category_ids"
            name="category_ids"
            multiple
            value={game.category_ids}
            onChange={(e) => {
              const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
              setGame({ ...game, category_ids: selectedCategories });
            }}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <button type="submit" className="card-button">
            Salva modifiche
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameEdit;
