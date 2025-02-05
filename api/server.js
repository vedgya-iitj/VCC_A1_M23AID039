const express = require('express');  
const mongoose = require('mongoose');  
const bodyParser = require('body-parser');  
const cors = require('cors');  
require('dotenv').config();  

const app = express();  
const PORT = process.env.PORT || 5005;  


app.use(cors());  
app.use(bodyParser.json());  

// Connect to MongoDB  
mongoose.connect('mongodb://192.168.1.115:27017/VMBlog', {   
    useNewUrlParser: true,   
    useUnifiedTopology: true  
})  
    .then(() => console.log("MongoDB connected successfully to Docker instance!"))  
    .catch(err => console.error("MongoDB connection error: ", err));  

// Import Routes  
const userRoutes = require('./routes/userRoutes');  
const postRoutes = require('./routes/postRoutes'); // Ensure this is included  
app.use('/api/users', userRoutes);  
app.use('/api/posts', postRoutes); // Ensure this line is present  

// Import Comment Routes  
const commentRoutes = require('./routes/commentRoutes');   
app.use('/api/comments', commentRoutes); // Add this line to use comment routes  

// Basic route  
app.get('/', (req, res) => {  
    res.send('SimpleBlog API');  
});  

app.listen(PORT, () => {  
    console.log(`Server is running on port ${PORT}`);  
});  
