import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { handleModifyAnswerVotes } from '../shared/utility';

let state = undefined;

fetch("data").then(data => data.json()).then(json => {
    state = json;
    console.info('Got the state', state);

    render();
})

function handleVote(answerId, increment) {
    state.answers = handleModifyAnswerVotes(state.answers, answerId, increment);

    fetch(`vote/${answerId}?increment=${increment}`);

    render();
}

function render() {
    ReactDOM.hydrate(<App {...state} handleModifyAnswerVotes={handleVote} />, document.querySelector('#root'));
}
