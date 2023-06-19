const express = require("express");
const qrcode = require("qrcode");

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.get("/generateqr", (req, res, next) => {
  const input_text = req.query.qr;
  qrcode.toDataURL(input_text, (err, src) => {
    const im = src.split(",")[1];

    const img = Buffer.from(im, 'base64');

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    });

    res.end(img); 
  });
});

app.listen(port, console.log(`Listening on port ${port}`));
