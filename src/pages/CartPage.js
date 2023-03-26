import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useCart } from "../context/cart";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [count, setCount] = useState({});

  useEffect(() => {
    const newCount = {};
    cart.forEach((item) => {
      if (!newCount[item.id]) {
        newCount[item.id] = 1;
      } else {
        newCount[item.id]++;
      }
    });
    setCount(newCount);
  }, [cart]);

  const handleIncrement = (id) => {
    const abc = cart.findIndex((product) => (product.id = id));
    if (abc >= 0) {
      const newCart = JSON.parse(JSON.stringify(cart));
      newCart[abc].count = newCart[abc].count + 1;
      setCart(newCart);
    }
    console.log(abc);
  };

  const handleDecrement = (id) => {
    const abc = cart.findIndex((product) => (product.id = id));
    if (abc >= 0) {
      const newCart = JSON.parse(JSON.stringify(cart));
      if (newCart[abc].count === 1) {
        setCart((prevItems) => prevItems.filter((item) => item.id !== id));
      } else {
        newCart[abc].count = newCart[abc].count - 1;
        setCart(newCart);
      }
    }
  };
  const handleRemove = (id) => {
    setCart((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const cartTotal = (cartItems) => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  };

  return (
    <Layout>
      <div className="container my-5">
        <h1 className="mb-4">Shopping Cart</h1>
        {cart.length > 0 ? (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "50px" }}
                      />
                      {item.title}
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => handleDecrement(item.id)}
                        >
                          -
                        </button>
                        <span className="btn btn-outline-secondary">
                          {item.count}
                        </span>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => handleIncrement(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.price * item.count).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right">
              <h5>
                Total:{" "}
                <span className="text-primary">
                  ${cartTotal(cart).toFixed(2)}
                </span>
              </h5>
              <button className="btn btn-primary">Checkout</button>
            </div>
          </>
        ) : (
          <div className="alert alert-info" role="alert">
            Your cart is empty. <Link to="/">Go shopping!</Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
