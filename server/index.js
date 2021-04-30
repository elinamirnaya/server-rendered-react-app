import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import { readFileSync } from 'fs';

import { App } from '../client/App';

const data={
    questions: [
        {
            questionId: "Q1",
            content: "Should we use jQuery or Fetch for ajax?"
        },
        {
            questionId: "Q2",
            content: "What is the best feature of React?"
        }
    ],
    answers: [
        {
            answerId: "A1",
            questionId: "Q1",
            upvotes: 2,
            content: "jQuery"
        },
        {
            answerId: "A2",
            questionId: "Q1",
            upvotes: 1,
            content: "Fetch"
        },
        {
            answerId: "A3",
            questionId: "Q2",
            upvotes: 1,
            content: "Perfomance"
        },
        {
            answerId: "A4",
            questionId: "Q2",
            upvotes: 3,
            content: "Ease of use"
        }
    ]
};

const app = new express();

app.use(express.static("dist"));

app.get('/data', async (_req, res) => {
    res.json(data);
});

app.get('/', async (_req, res) => {
    const index = readFileSync('public/index.html', 'utf8');
    const component = renderToString(<App {...data} />);

    res.send(index.replace("{{component}}", component));
});

app.listen(7777);
console.info('Server is listening on http://localhost:7777.');