import express from 'express';
import { readFileSync } from 'fs';

const app = new express();

app.use(express.static("dist"));

app.get('/', (_req, res) => {
    const index = readFileSync('public/index.html', 'utf8');

    res.send(index);
});

app.listen(7777);
console.info('Server is listening on http://localhost:7777.');