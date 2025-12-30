const express = require("express")
const path = require('path')
const app = express()
const webRoutes = require('./routes/webRoutes')
const adminRoutes = require('./routes/adminRoutes')
const connectDB = require('./config/connect')


const PORT = process.env.PORT || 3000


// Templates and Static Files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/',webRoutes) //mount webRoutes on '/'
app.use('/admin',adminRoutes)


connectDB(); //connect to MongoDB
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
