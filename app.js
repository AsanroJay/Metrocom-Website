const express = require("express")
const path = require('path')
const app = express()

const PORT = process.env.PORT || 3000

// Templates and Static Files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",(req,res) => {
    res.render("index")
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
