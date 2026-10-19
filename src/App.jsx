import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/inventory.json")
      .then((response) => {
        if (!response.ok) throw new Error("Could not load inventory");
        return response.json();
      })
      .then(setProducts)
      .catch((error) => setError(error.message));
  }, []);

  function getStatus(product) {
    if (product.quantity === 0) return "Out of stock";
    if (product.quantity <= product.reorderLevel) return "Low stock";
    return "In stock";
  }

  return (
    <main>
      <h1>Smart Inventory Management System</h1>
      <p>Inventory and stock status</p>

      {error && <p>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Reorder level</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>{product.reorderLevel}</td>
              <td>{getStatus(product)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default App;