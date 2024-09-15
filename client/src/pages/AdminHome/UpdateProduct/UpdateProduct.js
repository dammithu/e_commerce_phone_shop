import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { FaDollarSign, FaBoxes, FaListAlt, FaRegEdit } from 'react-icons/fa';
import './updateproduct.css';

function UpdateProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    price: '',
    quantity: '',
    category: '',
    description: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/product/${productId}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProductData({
          price: data.price,
          quantity: data.quantity,
          category: data.category,
          description: data.description,
        });
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/product/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        navigate('/adminproduct');
      } else {
        console.error('Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  return (
    <Container className="update-product-container">
      <h2 className="animate__animated animate__fadeInDown">
        <FaRegEdit /> Update Product
      </h2>
      <Form onSubmit={handleSubmit} className="animate__animated animate__fadeInUp">
        <Form.Group as={Row} controlId="price" className="form-group">
          <Form.Label column sm={2} className="form-label">
            <FaDollarSign /> Price
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="quantity" className="form-group">
          <Form.Label column sm={2} className="form-label">
            <FaBoxes /> Quantity
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="category" className="form-group">
          <Form.Label column sm={2} className="form-label">
            <FaListAlt /> Category
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option value="phone">Mobile Phone</option>
              <option value="tablets">Tablets</option>
              <option value="cases">Phone Cases & Covers</option>
              <option value="smartwatches">Smartwatches</option>
              <option value="headphones">Headphones</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="description" className="form-group">
          <Form.Label column sm={2} className="form-label">
            <FaRegEdit /> Description
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              name="description"
              value={productData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={3}
              required
            />
          </Col>
        </Form.Group>

        <Button variant="success" type="submit" className="mt-3 update-button">
          Update Product
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateProduct;
