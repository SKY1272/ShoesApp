import React, { useState } from "react";
import "./styles.css";

const ShoesApp = () => {
  const [shoesData, setShoesData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedShoe({
      ...selectedShoe,
      [name]: value,
    });
  };

  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setSelectedShoe({
      ...selectedShoe,
      sizes: {
        ...selectedShoe.sizes,
        [name]: parseInt(value),
      },
    });
  };

  const addShoe = () => {
    setShoesData([...shoesData, selectedShoe]);
    setSelectedShoe(null);
  };

  const addToCart = (shoe) => {
    setCartItems([...cartItems, shoe]);
    const price = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(parseInt(price + shoe.price));
  };

  const placeOrder = () => {
    console.log("Order placed for:", cartItems);
    setCartItems([]);
    setTotalPrice(0);
  };

  const cancelOrder = () => {
    setCartItems([]);
    setTotalPrice(0);
  };

  return (
    <div className="App">
      <h1>Shoes Shop</h1>
      <div className="shoe-form">
        <h2>Add New Shoe</h2>
        <input
          type="text"
          placeholder="Shoe Name"
          name="name"
          value={selectedShoe?.name || ""}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={selectedShoe?.description || ""}
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={selectedShoe?.price || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="sizes">Available Sizes:</label>
        <select
          id="sizes"
          name="sizes"
          onChange={handleSizeChange}
          value={selectedShoe?.sizes || ""}
        >
          <option value="">Select size...</option>
          <option value="S">Size S</option>
          <option value="M">Size M</option>
          <option value="L">Size L</option>
        </select>
        <button onClick={addShoe}>Add Shoe</button>
      </div>
      <div className="shoes-container">
        {shoesData.map((shoe, index) => (
          <div key={index} className="shoe-item">
            <h3>{shoe.name}</h3>
            <p>Description: {shoe.description}</p>
            <p>Price: ${shoe.price}</p>
            <p>Sizes available:</p>
            <ul>
              <li>Size S: {shoe.sizes.S}</li>
              <li>Size M: {shoe.sizes.M}</li>
              <li>Size L: {shoe.sizes.L}</li>
            </ul>
            <button onClick={() => addToCart(shoe)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="cart-container">
        <h2>Cart Details</h2>
        <div id="cart-details">
          {cartItems.map((item, index) => (
            <div key={index}>
              {item.name} - ${item.price}
            </div>
          ))}
          <div>Total Price: ${totalPrice}</div>
          <div>
            <button onClick={placeOrder}>Place Order</button>
            <button onClick={cancelOrder}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoesApp 
