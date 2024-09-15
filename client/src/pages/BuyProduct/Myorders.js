import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        navigate('/login'); // Redirect to login if user is not logged in
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/myorders?userId=${user._id}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          const result = await response.json();
          setError(result.error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return <div>Loading your orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <h2 className="text-center my-4">My Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Payment Status</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.productName}</td>
              <td>{order.quantity}</td>
              <td>{order.totalPrice}</td>
              <td>{order.paymentStatus}</td>
              <td>{order.orderDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default MyOrders;
