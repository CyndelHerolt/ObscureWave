const express = require('express');
const axios = require('axios');
const qs = require('qs');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors({
    origin: 'http://localhost:5173', // Autorise seulement cette origine
}));

app.get('/spotify-token', async (req, res) => {
    const authOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        params: {
            grant_type: 'client_credentials'
        },
        headers: {
            'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    try {
        const response = await axios(authOptions);
        res.send(response.data);
    } catch (error) {
        console.error('Something went wrong when retrieving the access token', error);
        res.send('An error occurred');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});