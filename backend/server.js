const app = require('./app');
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");
dotenv.config({ path: "backend/config/.env" });

connectDatabase();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`);
});
