import React from "react";
import ProductCard from "../components/products/ProductCard";

const HomeView = () => {
  const product = {
    name: "Blue Tshirt",
    images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
    price: "$3000",
    _id: "abhisek",
  };
  return (
    <div className="home">
      <section className="featured-products">
        <h1 className="title">Featured Products</h1>
        <ProductCard product={product}></ProductCard>
      </section>
    </div>
  );
};

export default HomeView;
