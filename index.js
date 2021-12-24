const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./util/database');
const cors = require('./middleware/cors');
const path = require('path');
const multer = require('multer');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
}); 

app.use(bodyParser.json());
app.use(multer({ storage: fileStorage }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors);

app.use('/orders', require('./routes/orders'))
app.use('/products', require('./routes/products'))
app.use('/', require('./routes/auth'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    connectDB();
    console.log(`Listening on port ${port}..`);
});