const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url);
  const extension = req.url.split("/").slice(-1)[0].split(".").slice(-1)[0];
  let contentType;
  switch (extension) {
    case "css":
      contentType = "text/css";
      break;
    case "html":
      contentType = "text/html";
      break;
    case "js":
      contentType = "text/javascript";
      break;
    default:
      contentType = "text/html";
      break;
  }
  let content = "";
  fs.readFile(__dirname + "/public" + req.url, (_, data) => {
    try {
      res.writeHead(200, {
        "Content-Type": contentType,
      });
      content = data.toString();
    } catch (e) {
      res.writeHead(404, {
        "Content-Type": contentType,
      });
      content = "Resource not found";
    }
    res.end(content);
  });
});

server.listen(8000);
