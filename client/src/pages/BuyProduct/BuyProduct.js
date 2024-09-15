import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './buyproduct.css'; // Updated CSS file

function BuyProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/product/${productId}`);
        const data = await response.json();
        if (response.ok) {
          setProduct(data);
          setTotalPrice(data.price);
        } else {
          setErrors({ fetch: data.message });
        }
      } catch (err) {
        setErrors({ fetch: err.message });
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleQuantityChange = (e) => {
    const qty = e.target.value;
    if (qty <= product.quantity) {
      setQuantity(qty);
      setTotalPrice(qty * (product?.price || 0));
    } else {
      setErrors({ quantity: 'Quantity exceeds available stock' });
    }
  };

  const handlePayment = async (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setErrors({ submit: 'User not logged in. Please log in first.' });
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/addorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: product.productName,
          totalPrice,
          quantity,
          userId: user._id,
          userName: user.name,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        const orderId = result.orderId;
        setTimeout(() => navigate(`/payment/${orderId}`, { state: { totalPrice } }), 2000);
      } else {
        const result = await response.json();
        setErrors({ submit: result.error });
      }
    } catch (err) {
      setErrors({ submit: err.message });
    }
  };

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <Container className="buy-product-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="buy-product-card shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4 title-animate">Buy Product</Card.Title>
              <Form>
                <Form.Group as={Row} className="mb-3" controlId="formProductName">
                  <Form.Label column sm={4}>Product Name:</Form.Label>
                  <Col sm={8}>
                    <Form.Control 
                      type="text" 
                      value={product.productName} 
                      readOnly 
                      className="input-animate"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPrice">
                  <Form.Label column sm={4}>Price (Rs.):</Form.Label>
                  <Col sm={8}>
                    <Form.Control 
                      type="text" 
                      value={product.price} 
                      readOnly 
                      className="input-animate"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formQuantity">
                  <Form.Label column sm={4}>Quantity:</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="number"
                      min="1"
                      max={product.quantity}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="input-animate"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4" controlId="formTotalPrice">
                  <Form.Label column sm={4}><strong>Total Price (Rs.):</strong></Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" value={totalPrice} readOnly className="input-animate" />
                  </Col>
                </Form.Group>

                <Button variant="info" className="w-100 payment-btn btn-animate" onClick={handlePayment}>
                  Proceed to Payment
                </Button>

                {errors && errors.submit && (
                  <div className="text-danger mt-3">{errors.submit}</div>
                )}
                {errors && errors.fetch && (
                  <div className="text-danger mt-3">{errors.fetch}</div>
                )}
                {errors && errors.quantity && (
                  <div className="text-danger mt-3">{errors.quantity}</div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default BuyProduct;
