import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { MyChart } from "../components/MyChart";
import "../styles/Dashboard.css";

const AdminDashboard = () => {
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingGames, setLoadingGames] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState("");
  const [gameSearchTerm, setGameSearchTerm] = useState("");
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [indexGames, setIndexGames] = useState(1);
  const [indexUsers, setIndexUsers] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingGames(true);
    axios
      .get("http://localhost:8000/api/games")
      .then((response) => {
        setGames(response.data);
        setLoadingGames(false);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
        setError("Error fetching games");
        setLoadingGames(false);
      });
  }, []);

  useEffect(() => {
    setLoadingUsers(true);
    axios
      .get("http://localhost:8000/api/users")
      .then((response) => {
        setUsers(response.data);
        setLoadingUsers(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
        setLoadingUsers(false);
      });
  }, []);

  const handleAddGame = (newGame) => {
    setGames([...games, newGame]);
  };

  const handleGameDelete = (gameId) => {
    axios
      .delete(`http://localhost:8000/api/games/${gameId}`)
      .then((response) => {
        setGames(games.filter((game) => game.id !== gameId));
      })
      .catch((error) => {
        console.error("Error deleting game:", error);
        setError("Error deleting game");
      });
  };

  const handleUserDelete = (userId) => {
    axios
      .delete(`http://localhost:8000/api/users/${userId}`)
      .then((response) => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setError("Error deleting user");
      });
  };

  const openEditPage = (gameId) => {
    navigate(`/games/edit/${gameId}`);
  };

  const openAddGamePage = () => {
    navigate(`/add-game`);
  };

  const expandTableGame = () => {
    setIndexGames(indexGames + 1);
  };

  const expandTableUser = () => {
    setIndexUsers(indexUsers + 1);
  };

  const filteredGames = games.filter(
    (game) => game.title && game.title.toLowerCase().includes(gameSearchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(
    (user) => user.name && user.name.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  return (
    <div className="container text-white p-5">
      <h1 className="text-center">Admin Dashboard</h1>

      <h2>Giochi</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Cerca per titolo del gioco"
          value={gameSearchTerm}
          onChange={(e) => setGameSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive mb-5">
        <Table striped bordered hover variant="dark" className="mb-4 text-center">
          <thead>
            <tr>
              <th>Titolo</th>
              <th>Genere</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {loadingGames ? (
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="3">Error fetching games</td>
              </tr>
            ) : filteredGames.length === 0 ? (
              <tr>
                <td colSpan="3">Nessun gioco trovato</td>
              </tr>
            ) : (
              filteredGames.slice(0, 2 * indexGames).map((game) => (
                <tr key={game.id}>
                  <td>{game.title}</td>
                  <td>{game.categories.map((category) => category.name).join(", ")}</td>
                  <td style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
                    <button className="card-button1" onClick={() => handleGameDelete(game.id)}>
                      Elimina
                    </button>
                    <button className="card-button1" onClick={() => openEditPage(game.id)}>
                      Modifica
                    </button>
                  </td>
                </tr>
              ))
            )}
            <div>
              {filteredGames.length > 2 * indexGames && (
                <button onClick={() => expandTableGame()}> Espandi tabella </button>
              )}
            </div>
          </tbody>
        </Table>
        <button onClick={openAddGamePage} className="card-button1">
          Aggiungi gioco
        </button>
      </div>
      <h2>Utenti</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Cerca per nome utente"
          value={userSearchTerm}
          onChange={(e) => setUserSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <Table striped bordered hover variant="dark" className="mb-4 text-center">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Ordini completati</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {loadingUsers ? (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="4">Error fetching users</td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4">Nessun utente trovato</td>
              </tr>
            ) : (
              filteredUsers.slice(0, 2 * indexUsers).map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.orders_count}</td>
                  <td>
                    <button className="card-button1" onClick={() => handleUserDelete(user.id)}>
                      Elimina
                    </button>
                    {/* Aggiungi qui il pulsante per modificare l'utente */}
                  </td>
                </tr>
              ))
            )}
            <div>
              {filteredUsers.length > 2 * indexUsers && (
                <button onClick={() => expandTableUser()}> Espandi tabella </button>
              )}
            </div>
          </tbody>
        </Table>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <MyChart />
    </div>
  );
};

export default AdminDashboard;
