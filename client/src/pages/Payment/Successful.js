import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './successful.css';

function Successful() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/'); // Navigate back to the home page or another relevant page
  };

  return (
    <Container className="successful-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="successful-card shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4 title-animate">Payment Successful</Card.Title>
              <div className="text-center mb-4 message-animate">
                <p>Your payment has been processed successfully.</p>
                <p>Thank you for your purchase!</p>
              </div>
              <Button className="w-100 mt-4 back-btn btn-animate" onClick={handleBackToHome}>
                Back to Home
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Successful;
