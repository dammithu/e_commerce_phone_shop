import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './addproduct.css';

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!productName) newErrors.productName = "Product name is required";
    if (!price || isNaN(price) || Number(price) <= 0) newErrors.price = "Please enter a valid price";
    if (!quantity || isNaN(quantity) || Number(quantity) <= 0) newErrors.quantity = "Please enter a valid quantity";
    if (!category) newErrors.category = "Please select a category";
    if (!image) newErrors.image = "Product image is required";
    if (!description) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("description", description);

    try {
      const response = await fetch('http://localhost:3001/addproduct', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage("Product added successfully!");
        setTimeout(() => navigate('/addproduct'), 2000); 
      } else {
        const result = await response.json();
        setErrors({ submit: result.error });
      }
    } catch (err) {
      setErrors({ submit: err.message });
    }
  };

  return (
    <Container className="add-product-container-compact">
      <Row className="justify-content-center">
        <Col md={5}>
          <h4 className="text-center mb-3">Add Product</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="productName" className="mb-2">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                isInvalid={!!errors.productName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.productName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="price" className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="quantity" className="mb-2">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                isInvalid={!!errors.quantity}
              />
              <Form.Control.Feedback type="invalid">
                {errors.quantity}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="category" className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                isInvalid={!!errors.category}
              >
                <option value="">Select Category</option>
                <option value="phone">Mobile Phone</option>
              <option value="tablets">Tablets</option>
              <option value="cases">Phone Cases & Covers</option>
              <option value="smartwatches">Smartwatches</option>
              <option value="headphones">Headphones</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="description" className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {errors.image}
              </Form.Control.Feedback>
            </Form.Group>

            {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Button variant="primary" type="submit" className="w-100">
              Add Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddProduct;
