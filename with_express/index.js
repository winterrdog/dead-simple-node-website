const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

// set handlebars as the view engine
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// static files -- better to use a reverse proxy like nginx
app.use(express.static("public"));

app.get("/", handleIndexPg); // /
app.get("/about", handleAboutPg); // /about
app.get("/contact-me", handleContactMePg); // /contact-me
app.use(handle404Pg); // 404 page

// route handler functions
function handleIndexPg(req, res) {
    res.render("index", { title: "Home" });
}

function handleAboutPg(req, res) {
    res.render("about", { title: "About me" });
}

function handleContactMePg(req, res) {
    res.render("contact-me", { title: "Need me!" });
}

function handle404Pg(req, res, next) {
    res.status(404).render("404", { title: "Page absent" });
}

const PORT = 9090;
app.listen(PORT, function () {
    console.log(`-- server listening at http://localhost:${PORT}...`);
});
