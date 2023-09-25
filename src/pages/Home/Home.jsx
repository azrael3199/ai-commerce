import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Navbar from "../../components/Navbar";
import { dark } from "../../themes";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import api from "../../appwrite";
import config from "../../config";
import ProductCard from "../../components/ProductCard";

const Home = () => {
  const { currentUser, setLoading, setError } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  /**
   * Load all items
   */
  useEffect(() => {
    setLoading("Fetching data");
    api
      .listDocuments(config.dbProductsId, config.collectionProductsId)
      .then((res) => {
        console.log(res);
        setProducts(res?.documents);
      })
      .catch((err) => setError({ message: err.message, type: "error" }))
      .finally(() => setLoading(null));
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        maxWidth: "100vw",
        padding: 0,
      }}
    >
      <Navbar />
      <Container
        style={{
          backgroundColor: dark.background,
          flex: 1, // This will make the container fill the remaining height
          width: "100%",
          maxWidth: "100vw",
          display: "flex",
          justifyContent: products?.length > 0 ? "start" : "center",
          alignItems: products?.length > 0 ? "start" : "center",
          alignContent: "flex-start",
          flexWrap: "wrap",
          gap: "32px",
          padding: "24px 32px",
        }}
      >
        {products?.length > 0 ? (
          /* Render your products here when available */
          products.map((product) => (
            <ProductCard
              key={Math.random()}
              productName={product.name}
              description={product.description}
              currency={product.currency}
              price={product.amount}
              imageUrl={product.image}
            />
          ))
        ) : (
          /* Display "No products found" message when no products are available */
          <Typography variant="h6" align="center" color={dark.text.secondary}>
            No products found
          </Typography>
        )}
      </Container>
    </Container>
  );
};

export default Home;
