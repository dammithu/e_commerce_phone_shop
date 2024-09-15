import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Orderlist() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
    

    

      try {
        const response = await fetch(`http://localhost:3001/orderlist`);
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
      <h2 className="text-center my-4">Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Payment Status</th>
            <th>User Name</th>
            <th>User ID</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr>
              <td>{order.productName}</td>
              <td>{order.quantity}</td>
              <td>{order.totalPrice}</td>
              <td>{order.paymentStatus}</td>
              <td>{order.userName}</td>
              <td>{order.userId}</td>
              <td>{order.orderDate}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Orderlist;
