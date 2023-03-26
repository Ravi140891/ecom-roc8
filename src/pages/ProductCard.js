import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";

const ProductCard = ({ product }) => {
  const { id, title, price, description, image } = product;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useCart();

  const handleClick = () => {
    setSelectedProduct(id);
  };

  const handleAddToCart = () => {
    const cartItem = cart.findIndex((product) => product.id === id);
    if (cartItem >= 0) {
      const newCart = JSON.parse(JSON.stringify(cart));
      newCart[cartItem].count = newCart[cartItem].count + 1;
      setCart(newCart);
    } else {
      const item = { id, title, price, image, count: 1 };
      setCart((prevCart) => [...prevCart, item]);
    }
  };

  return (
    <div className="card">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title.slice(0, 30)}</h5>
        <p className="card-text">{description.slice(0, 50)}</p>
        <p className="card-text">${price}</p>
        <Link
          to={{
            pathname: `/products/${id}`,
            state: { selectedProduct },
          }}
          className="btn btn-primary m-3"
          onClick={handleClick}
        >
          More Details
        </Link>
        <button className="btn btn-primary ml-2" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
