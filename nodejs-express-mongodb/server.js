const express = require("express");
const cors = require("cors");
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-from-urle
app.use(express.urlencoded({ extended: true}));

// simple route
app.get("/",(req, res) => {
    res.json({ message: "Welcome to bezkoder applications."});
});

require("./routes/post.routes")(app);

// Define authentication routes
app.use('/api/auth', authRoutes);

// Define user routes
app.use('/api/user', userRoutes);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=>{
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });