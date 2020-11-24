import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export default function main(portletElementId) {
	ReactDOM.render(<App />, document.getElementById(portletElementId));
}