import './style/common';
if (window.Promise === undefined) {
	throw new Error('Promise pollyfill not found.');
}

import Message from './modules/Message';

module.exports = Message;
