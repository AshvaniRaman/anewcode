const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/encrypt', (req, res) => {
  const { data, key } = req.body;

  if (!data || !key) {
    return res.status(400).json({ error: 'Missing data or key.' });
  }

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);

  let encryptedData = cipher.update(data, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');

  res.json({ iv: iv.toString('hex'), encryptedData });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
