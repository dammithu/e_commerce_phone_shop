import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './payment.css'; // Updated CSS file

function Payment() {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState(null);

  const totalPrice = location.state?.totalPrice || 0;

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!cardNumber || !expiryDate || !cvv) {
      setErrors('Please fill in all payment details.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BE_BASE_URI}/updatepayment/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentStatus: 'successful',
          cardNumber,
          expiryDate,
          cvv,
        }),
      });

      if (response.ok) {
        alert('Payment successful!');
        navigate('/successful', { state: { orderId, totalPrice } });
      } else {
        const result = await response.json();
        setErrors(result.message || 'Payment failed');
      }
    } catch (error) {
      setErrors('Payment failed. Please try again.');
    }
  };

  return (
    <Container className="payment-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="payment-card shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4 title-animate">Payment Details</Card.Title>
              <p className="text-center mb-4">Order ID: <strong>{orderId}</strong></p>
              <p className="text-center mb-4">Total Price: <strong>Rs. {totalPrice}</strong></p>
              <Form onSubmit={handlePayment}>
                <Form.Group className="mb-3" controlId="formCardNumber">
                  <Form.Label className="form-label">Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter card number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="input-animate"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formExpiryDate">
                  <Form.Label className="form-label">Expiration Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="input-animate"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formCvv">
                  <Form.Label className="form-label">CVV</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="input-animate"
                  />
                </Form.Group>

                <Button type="submit" className="w-100 payment-btn btn-animate">
                  Confirm Payment
                </Button>

                {errors && (
                  <div className="text-danger mt-3">{errors}</div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Payment;
