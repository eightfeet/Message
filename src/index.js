import './style/common';
if (window.Promise === undefined) {
	throw new Error('Promise pollyfill not found.');
}

// parseFloat polyfill
Number.parseFloat = Number.parseFloat || parseFloat;
// parseFloat polyfill
Number.parseInt = Number.parseInt || parseInt;
// isFinite Polyfill
Number.isFinite = Number.isFinite || function(value) {
	return typeof value === "number" && isFinite(value);
};

import Message from './modules/Message';

module.exports = Message;
