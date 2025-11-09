import React from "react";
import { CartItem } from "../types";

interface CartViewProps {
  cartItems: CartItem[];
  onCheckout: () => void;
}

const CartView: React.FC<CartViewProps> = ({ cartItems, onCheckout }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.product.id}>
              {item.product.name} — {item.quantity} × ${item.product.price}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={onCheckout}
        style={{ marginTop: "15px", padding: "10px 20px", cursor: "pointer" }}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartView;
