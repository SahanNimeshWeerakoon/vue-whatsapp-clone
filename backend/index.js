const express = require('express');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const client = new OAuth2Client("441393468153-li4ugutm9pc4a2ika0p6vvbflrh4hp68.apps.googleusercontent.com");

app.use(cors());
app.use(express.json());

app.post('/api/google-login', async (req, res) => {
    const ticket = await client.verifyIdToken({
        idToken: req.body.token
    });

    return res.status(200).json(ticket.getPayload());
});

app.listen(4001, () => {
    console.log(`Server is ready at http://localhsot:4001`);
});