const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect('mongodb+srv://jaypals840:ITengineer12@cluster1.z5hsk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  image: String,
});

const User = mongoose.model('User', userSchema);

// API Endpoint to save user data
app.post('/api/users', async (req, res) => {
  try {
    const { id, name, email, image } = req.body;
    const existingUser = await User.findOne({ id });

    if (existingUser) {
      res.status(200).json({ message: 'User already exists', user: existingUser });
    } else {
      const newUser = new User({ id, name, email, image });
      await newUser.save();
      res.status(201).json({ message: 'User saved', user: newUser });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


