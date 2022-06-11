import React, { useState } from "react";
import axios from "axios";
import { SearchBar, ImageList } from "./components/index";
import pixabayLogo from "./pixabayLogo.png";

const App = () => {
  const [images, setImages] = useState([]);
  const ApiKey = process.env.REACT_APP_PIXABAY_APIKEY;
  const onSearchSubmit = async (term) => {
    try {
      const params = {
        key: ApiKey,
        q: term,
        per_page: 40,
      };
      const response = await axios.get("https://pixabay.com/api/", { params });
      setImages(response.data.hits);
      if (response.data.total === 0) {
        window.alert("お探しの画像はありません。");
      }
    } catch (error) {
      window.alert("画像の取得に失敗しました。");
    }
  };
  return (
    <div className="ui container" style={{ marginTop: "20px" }}>
      <img src={pixabayLogo} alt="pixabay-logo" className="pixabay-logo" />
      <SearchBar onSubmit={onSearchSubmit} />
      <ImageList images={images} />
    </div>
  );
};

export default App;
