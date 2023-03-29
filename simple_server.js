const http = require("http");
const fs = require("fs");
const path = require("path");

class SimpleServer {
    constructor(port) {
        this.port = port;
    }

    handleReq(req, res) {
        const rootPath = "./public";
        this.contType = "text/html";

        // routing
        let route = rootPath;
        let isRedirect = false;
        switch (req.url) {
            case "/":
                route += "/index.html";
                break;
            case "/about":
                route += "/about.html";
                break;
            case "/about-me":
                isRedirect = true;
                res.end();
                break;
            case "/contact-me":
                route += "/contact-me.html";
                break;
            default:
                route += req.url;
                switch (path.extname(route)) {
                    case ".css":
                        this.contType = "text/css";
                        break;
                    default:
                        break;
                }
                break;
        }

        // serve pages
        fs.readFile(route, { encoding: "utf8" }, (err, data) => {
            if (err) {
                if (err.code === "ENOENT") {
                    // when file is absent on server
                    res.writeHead(404, {
                        "Content-Type": this.contType,
                    });
                    fs.readFile(
                        `${rootPath}/404.html`,
                        (err, data) => {
                            if (err) throw err;
                            res.end(data);
                        }
                    );
                } else {
                    // any other server-side error
                    res.writeHead(500, {
                        "Content-Type": this.contType,
                    });
                    res.end(
                        "<h1>Internal server error occurred. Please wait...</h1>"
                    );

                    console.error(`-- error: ${err}`);
                }
            } else {
                // send back file since reading was successful
                if (isRedirect) {
                    res.writeHead(301, { Location: "/about" });
                } else {
                    res.writeHead(200, {
                        "Content-Type": this.contType,
                    });
                    res.end(data);
                }
            }
        });
    }

    run() {
        http.createServer(this.handleReq).listen(this.port, () => {
            console.log(
                `-- server listening on http://localhost:${this.port}`
            );
        });
    }
}

module.exports = {
    SimpleServer,
};
