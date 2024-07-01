import React, { useEffect, useState } from "react";
import axios from "axios";
import { Triangle } from "react-loader-spinner";
import "../styles/Library.css";

const Library = () => {
  const [libraryItems, setLibraryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchLibrary();
  }, []);

  const fetchLibrary = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/library");
      setLibraryItems(response.data);
    } catch (error) {
      console.error("Error fetching library:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLibraryItem = (item) => {
    return (
      <div key={item.id} className="library-item" onClick={() => setSelectedItem(item)}>
        {item.title}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <Triangle visible={true} height="150" width="150" color="#e58e27" ariaLabel="triangle-loading" />
      </div>
    );
  }

  return (
    <div className="library-container row">
      <div className="library-sidebar col-4">
        <h2>Titoli</h2>
        {libraryItems.length > 0 ? (
          <div className="library-items">{libraryItems.map(renderLibraryItem)}</div>
        ) : (
          <p>La libreria è vuota</p>
        )}
      </div>
      <div className="library-details col-8">
        {selectedItem ? (
          <>
            <div className="row">
              <div className="col-12">
                {" "}
                <img
                  src={selectedItem.game_img_large}
                  alt={selectedItem.title}
                  style={{ objectFit: "cover" }}
                  width={"100%"}
                />
              </div>
              <div className="col-12">
                <div className="row my-4">
                  <div className="col-6 overflow-hidden">
                    <img src={selectedItem.game_img} alt="" style={{ objectFit: "cover", width: "100%" }} />
                  </div>
                  <div className="col-5 my-auto">
                    <h3>{selectedItem.title}</h3>

                    <p>Editor: {selectedItem.publisher}</p>
                    <button className="download-button">Download</button>
                  </div>
                  <div className="col-12 mt-5">
                    <h4>Descrizione</h4>
                    <p>{selectedItem.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Seleziona un gioco per vedere i dettagli</p>
        )}
      </div>
    </div>
  );
};

export default Library;
