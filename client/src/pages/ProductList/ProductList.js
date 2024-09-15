import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { FaShoppingCart, FaSearch, FaTag, FaMobileAlt, FaTabletAlt, FaHeadphonesAlt, FaClock } from 'react-icons/fa';
import './productlist.css';
import { useNavigate } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
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

  const filteredProducts = products.filter(product =>
    (category === 'All' || product.category === category) &&
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBuy = (productId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate(`/buyproduct/${productId}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <Container fluid className="product-list-container">
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text className="search-icon">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="All">All Categories</option>
            <option value="phone">Mobile Phone <FaMobileAlt /></option>
            <option value="tablets">Tablets <FaTabletAlt /></option>
            <option value="cases">Phone Cases & Covers <FaTag /></option>
            <option value="smartwatches">Smartwatches <FaClock /></option>
            <option value="headphones">Headphones <FaHeadphonesAlt /></option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product._id} md={4} sm={6} className="mb-4">
            <Card className="product-card h-100">
              <Card.Img
                variant="top"
                src={`http://localhost:3001/uploads/${product.image}`}
                alt={product.productName}
                className="product-image"
              />
              <Card.Body className="product-card-body">
                <Card.Title className="product-title">{product.productName}</Card.Title>
                <Card.Text className="product-info">
                  <strong>Price:</strong> Rs.{product.price}<br />
                  <strong>Quantity:</strong> {product.quantity}<br />
                  <strong>Category:</strong> {product.category}<br />
                  <strong>Description:</strong> {product.description}
                </Card.Text>
                <div className="product-actions">
                  <Button variant="primary" className="buy-now-btn" onClick={() => handleBuy(product._id)}>
                    <FaShoppingCart /> Buy Now
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

export default ProductList;
