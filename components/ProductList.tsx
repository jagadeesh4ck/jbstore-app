import React from "react";
const ProductList: React.FC = () => {
  const products = [
    { id: 1, name: "Product A", price: "$25" },
    { id: 2, name: "Product B", price: "$40" },
    { id: 3, name: "Product C", price: "$30" },
  ];
  return (
    <div style={{ padding: "20px" }}>
      <h2>Product List</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} — {p.price}</li>
        ))}
      </ul>
    </div>
  );
};
export default ProductList;
