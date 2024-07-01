import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import "../styles/AddGame.css";
const AddGame = () => {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({
    title: "",
    description: "",
    release_date: "",
    developer: "",
    publisher: "",
    price: "",
    category_ids: [],
    game_img: null,
    game_img_large: null,
    video: "",
  });
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoadingPage, setIsLoadingPage] = useState(true); // Stato per gestire il caricamento della pagina
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false); // Stato per gestire il caricamento durante l'aggiunta del gioco
  const navigate = useNavigate();

  useEffect(() => {
    // Ottieni le informazioni dell'utente loggato
    axios
      .get("http://localhost:8000/api/user")
      .then((res) => {
        setUser(res.data);
        setIsLoadingPage(false); // Imposta isLoadingPage a false quando il caricamento è completato
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setIsLoadingPage(false); // Assicura che isLoadingPage sia false anche in caso di errore
      });

    // Ottieni i giochi
    axios.get("http://localhost:8000/api/games").then((res) => setGames(res.data));

    // Ottieni le categorie
    axios.get("http://localhost:8000/api/categories").then((res) => setCategories(res.data));
  }, []);

  const addGame = () => {
    setIsLoadingSubmit(true); // Imposta isLoadingSubmit a true durante l'aggiunta del gioco

    const formData = new FormData();
    formData.append("title", newGame.title);
    formData.append("description", newGame.description);
    formData.append("release_date", newGame.release_date);
    formData.append("developer", newGame.developer);
    formData.append("publisher", newGame.publisher);
    formData.append("price", newGame.price);
    formData.append("category_ids", JSON.stringify(newGame.category_ids));
    formData.append("game_img", newGame.game_img);
    formData.append("game_img_large", newGame.game_img_large);
    formData.append("video", newGame.video);

    axios
      .post("http://localhost:8000/api/games/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setGames([...games, res.data]);
      })
      .catch((error) => {
        console.error("There was an error adding the game!", error);
      })
      .finally(() => {
        setIsLoadingSubmit(false); // Imposta isLoadingSubmit a false dopo il completamento dell'aggiunta del gioco
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewGame({
      ...newGame,
      [name]: value,
    });
  };

  const handleCategoryChange = (event) => {
    const selectedCategories = Array.from(event.target.selectedOptions, (option) => option.value);
    setNewGame({
      ...newGame,
      category_ids: selectedCategories,
    });
  };

  const handleImageChange = (event) => {
    setNewGame({
      ...newGame,
      game_img: event.target.files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addGame();
    navigate("/");
  };

  const handleImageLargeChange = (event) => {
    setNewGame({
      ...newGame,
      game_img_large: event.target.files[0],
    });
  };

  const handleVideoChange = (event) => {
    const { name, value } = event.target;
    setNewGame({
      ...newGame,
      [name]: value,
    });
  };

  if (isLoadingPage) {
    return (
      <div
        className="loading-spinner"
        style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <Triangle visible={true} height={100} width={100} color="#e58e27" ariaLabel="triangle-loading" />
      </div>
    );
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  if (user.role !== "admin") {
    return <p>Non hai il permesso di aggiungere giochi.</p>;
  }

  return (
    <>
      {isLoadingSubmit && ( // Mostra lo spinner durante il caricamento dell'aggiunta del gioco
        <div
          className="loading-spinner"
          style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <Triangle visible={true} height={100} width={100} color="#e58e27" ariaLabel="triangle-loading" />
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="text-white myaddgameform my-5">
        <h1 className="text-center">Aggiungi un nuovo gioco</h1>

        {/* Trailer */}
        <div className="mb-4">
          <label htmlFor="video" className="form-label">
            Video Trailer (url)
          </label>
          <input
            type="text"
            className="form-control"
            id="video"
            name="video"
            value={newGame.video}
            onChange={handleVideoChange}
            required
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
            value={newGame.title}
            onChange={handleChange}
            required
          />
        </div>
        {/* Descrizione */}
        <div className="mb-4">
          <label htmlFor="description" className="form-label">
            Descrizione
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={newGame.description}
            onChange={handleChange}
            required
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
            value={newGame.release_date}
            onChange={handleChange}
            required
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
            value={newGame.developer}
            onChange={handleChange}
            required
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
            value={newGame.price}
            onChange={handleChange}
            required
          />
        </div>
        {/* publisher */}
        <div className="mb-4">
          <label htmlFor="publisher" className="form-label">
            Pubblicatore
          </label>
          <input
            type="text"
            className="form-control"
            id="publisher"
            name="publisher"
            value={newGame.publisher}
            onChange={handleChange}
            required
          />
        </div>
        {/* Immagine banner */}
        <div className="mb-4">
          <label htmlFor="game_img_large" className="form-label">
            Immagine banner di gioco (large)
          </label>
          <input
            type="file"
            className="form-control"
            id="game_img_large"
            name="game_img_large"
            onChange={handleImageLargeChange}
            required
          />
        </div>
        {/* Immagine coopertina */}
        <div className="mb-4">
          <label htmlFor="game_img" className="form-label">
            Coopertina del gioco
          </label>
          <input
            type="file"
            className="form-control"
            id="game_img"
            name="game_img"
            onChange={handleImageChange}
            required
          />
        </div>
        {/* categories */}
        <div className="mb-4">
          <label htmlFor="categories" className="form-label">
            Categoria
          </label>
          <select
            className="form-select"
            id="categories"
            name="categories"
            multiple
            value={newGame.category_ids}
            onChange={handleCategoryChange}
            style={{ height: "250px" }}
            required
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
            Aggiungi
          </button>
        </div>
      </form>
    </>
  );
};

export default AddGame;
