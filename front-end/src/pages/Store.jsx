import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import "../styles/Store.css";

const Store = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [headerImage, setHeaderImage] = useState(null);

  useEffect(() => {
    fetchGames();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (activeCategory !== null) {
      fetchGamesByCategory(activeCategory);
    } else {
      fetchGames();
    }
  }, [activeCategory]);

  const fetchGames = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/games");
      setGames(response.data);
      if (response.data.length > 0) {
        const randomGame = response.data[Math.floor(Math.random() * response.data.length)];
        setHeaderImage(randomGame.game_img_large);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
  };

  const fetchGamesByCategory = async (categoryName) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/games/category/${categoryName}`);
      setGames(response.data);
    } catch (error) {
      console.error("Error fetching games by category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = async () => {
    setIsLoading(true);
    try {
      let params = {
        min_price: minPrice,
        max_price: maxPrice,
      };

      if (activeCategory) {
        params.category_name = activeCategory;
      }

      const response = await axios.get("http://localhost:8000/api/games", { params });
      setGames(response.data);
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterByPrice = (game) => {
    if (minPrice && maxPrice) {
      return game.price >= parseFloat(minPrice) && game.price <= parseFloat(maxPrice);
    } else if (minPrice) {
      return game.price >= parseFloat(minPrice);
    } else if (maxPrice) {
      return game.price <= parseFloat(maxPrice);
    }
    return true;
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
    <Container>
      <Row>
        <Col md={3}>
          <div className="SideBar">
            <aside className="sidebar">
              <div className="filter">
                <h4>Categories</h4>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-button ${activeCategory === category.name ? "active" : ""}`}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              <div className="filter">
                <h4>Price Range</h4>
                <div className="price-range-inputs row align-items-center justify-content-center mt-3">
                  <div className="col-5 position-relative">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="input-price"
                    />
                  </div>
                  <div className="col-1">
                    <span> - </span>
                  </div>
                  <div className="col-5 position-relative">
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="input-price"
                    />
                  </div>
                </div>
              </div>
            </aside>
          </div>
          <div className="social-icons mt-4">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-discord"></i>
            <i className="bi bi-paypal"></i>
            <i className="bi bi-instagram"></i>
          </div>
        </Col>
        <Col md={9} className="p-0">
          <Row>
            <Col md={12} className="header ">
              {headerImage && (
                <img
                  src={headerImage}
                  alt=""
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    borderRadius: "35px",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              )}
            </Col>
            <Col md={12}>
              <Row className="mt-1 gy-4 mb-5 align-items-center">
                {games.filter(filterByPrice).map((game) => (
                  <Col md={4} key={game.id} className="cardHeight">
                    <Card className="mycard rounded-4 overflow-hidden">
                      <div className="p-3">
                        <img
                          src={game.game_img}
                          style={{ width: "100%", height: "200px", objectFit: "cover" }}
                          alt={game.title}
                        />
                      </div>
                      <Card.Body className="p-4">
                        <Card.Title className="text-start mt-2 text-white">{game.title}</Card.Title>
                        <Card.Text className="text-white">Publisher: {game.publisher}</Card.Text>
                        <div className="d-flex justify-content-between align-items-center">
                          <span style={{ fontSize: "25px", fontWeight: "bold", color: "#e58e27" }}>${game.price}</span>
                          <Link to={`/games/${game.id}`} className="card-button">
                            Details
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Store;
