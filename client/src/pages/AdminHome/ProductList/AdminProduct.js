import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './adminproduct.css';

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/product/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter(product => product._id !== productId));
      } else {
        console.error("Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleUpdate = (productId) => {
    navigate(`/updateproduct/${productId}`);
  };

  return (
    <Container className="admin-product-list-container">
      <Row>
        {products.map((product) => (
          <Col key={product._id} md={4} className="mb-4">
            <Card className="admin-product-card">
              <Card.Img
                variant="top"
                src={`http://localhost:3001/uploads/${product.image}`}
                alt={product.productName}
                className="product-image"
              />
              <Card.Body>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text>
                  <strong>Price:</strong> Rs.{product.price}<br />
                  <strong>Quantity:</strong> {product.quantity}<br />
                  <strong>Category:</strong> {product.category}<br />
                  <strong>Description:</strong> {product.description}
                </Card.Text>
                <div className="admin-actions">
                  <Button variant="primary" className="update-btn" onClick={() => handleUpdate(product._id)}>
                    <FaEdit /> Update
                  </Button>
                  <Button variant="danger" className="delete-btn" onClick={() => handleDelete(product._id)}>
                    <FaTrashAlt /> Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AdminProduct;
