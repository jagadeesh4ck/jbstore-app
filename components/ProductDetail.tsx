import React from "react";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
}

const ProductDetail: React.FC<{ product?: Product }> = ({ product }) => {
  if (!product) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>No Product Selected</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", borderTop: "1px solid #ccc" }}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p style={{ fontWeight: "bold" }}>{product.price}</p>
    </div>
  );
};

export default ProductDetail;
