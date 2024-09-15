const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/myshop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Define port
const port = 3001;

// Setup multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Define models
const UserModel = require("./model/Users");
const AdminModel = require("./model/Admin");
const ProductModel = require("./model/Product");
const Order = require("./model/Order")



// Admin login route
app.post("/adminlogin", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const admin = await AdminModel.findOne({ userName });
    if (admin) {
      if (admin.password === password) {
        return res.status(200).json("Success");
      } else {
        return res.status(400).json("Password is incorrect");
      }
    } else {
      return res.status(404).json("No record existed");
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// User login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      if (user.password === password) {
        return res.status(200).json({ message: "Success", user });
      } else {
        return res.status(400).json("The password is incorrect");
      }
    } else {
      return res.status(404).json("No record existed");
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// User signup route
app.post("/signup", async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const user = await UserModel.create(req.body);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Get user by ID route
app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user name and password route
app.put("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, password } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (user) {
      user.name = name || user.name;
      if (password) {
        user.password = password;
      }
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get admin by username
app.get("/admin/:userName", async (req, res) => {
  const { userName } = req.params;
  try {
    const admin = await AdminModel.findOne({ userName });
    if (!admin) {
      return res.status(404).send("Admin not found");
    }
    res.json(admin);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Update admin username and password
app.put("/admin/:userName", async (req, res) => {
  const { userName } = req.params;
  const { newUserName, password } = req.body;
  try {
    const admin = await AdminModel.findOne({ userName });
    if (!admin) {
      return res.status(404).send("Admin not found");
    }
    admin.userName = newUserName || admin.userName;
    if (password) {
      admin.password = password; // Ensure to hash the password before saving
    }
    await admin.save();
    res.json(admin);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Add product route
app.post("/addproduct", upload.single("image"), async (req, res) => {
  try {
    const { productName, price, quantity, category, description } = req.body;

    // Create a new product with the uploaded image
    const product = await ProductModel.create({
      productName,
      price,
      quantity,
      category,
      description,
      image: req.file ? req.file.filename : undefined, // Save the image filename
    });

    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Get all products route
app.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get all users route
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Delete user route
app.delete("/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await UserModel.deleteOne({ _id: userId });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product route
app.delete("/product/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await ProductModel.deleteOne({ _id: productId });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product route
app.put("/product/:id", upload.single("image"), async (req, res) => {
  try {
    const { productName, price, quantity, category, description } = req.body;
    const updatedData = {
      productName,
      price,
      quantity,
      category,
      description,
    };

    // If a new image is uploaded, add it to the updated data
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const product = await ProductModel.findByIdAndUpdate(req.params.id, updatedData, {
      new: true, // Return the updated document
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch single product by ID route
app.get("/product/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/addorder', async (req, res) => {
  try {
    const { productName, totalPrice, quantity, userId, userName } = req.body;

    // Basic validation
    if (!productName || !totalPrice || !quantity || !userId || !userName) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the product exists and validate quantity
    const product = await ProductModel.findOne({ productName });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (quantity > product.quantity) {
      return res.status(400).json({ error: 'Quantity exceeds available stock' });
    }

    // Create the order
    const order = await Order.create({
      productName,
      totalPrice,
      quantity,
      userId,     // Include the userId from the request
      userName,   // Include the userName from the request
    });

    // Reduce the product quantity
    product.quantity -= quantity;
    await product.save(); // Update the product quantity in the database

    res.status(201).json({ orderId: order._id });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the order' });
  }
});




app.put('/updatepayment/:id', async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const { id } = req.params;

    console.log(`Updating payment status for order ID: ${id}`);
    console.log(`Requested payment status: ${paymentStatus}`);

    // Validate payment status input
    if (!['pending', 'successful'].includes(paymentStatus)) {
      console.log('Invalid payment status provided');
      return res.status(400).json({ message: "Invalid payment status" });
    }

    // Update the payment status
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { paymentStatus },
      { new: true } // Return the updated order document
    );

    if (!updatedOrder) {
      console.log('Order not found');
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log('Payment status updated successfully', updatedOrder);
    res.json({ message: 'Payment status updated successfully', updatedOrder });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/myorders', async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const orders = await Order.find({ userId }).sort({ orderDate: -1 }); // Sort by orderDate for latest orders first
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching orders' });
  }
});


app.get('/orderlist', async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching orders' });
  }
});

// app.get("/users", async (req, res) => {
//   try {
//     const users = await UserModel.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// });








// Serve static files (product images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
