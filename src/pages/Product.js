import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const json = await res.json();
      setProduct(json);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { title, price, description, image } = product;

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6">
          <img src={image} className="img-fluid" alt={title} />
        </div>
        <div className="col-md-6">
          <h2>{title}</h2>
          <p>{description}</p>
          <p className="font-weight-bold">
            <span style={{ fontWeight: "bold", fontSize: "1.4rem" }}>
              Price:
            </span>{" "}
            ${price}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
