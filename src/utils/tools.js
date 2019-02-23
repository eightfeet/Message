import jssCamelCase from 'jss-camel-case';
// 翻译js中的驼峰css
const { onProcessStyle } = new jssCamelCase();

/**
 * Prefix Browser Support
 * It supports all major browsers with the following versions. For other, unsupported browses, we automatically use a fallback.

 * Chrome: 55+
 * Android (Chrome): 55+
 * Android (Stock Browser): 5+
 * Android (UC): 11+
 * Firefox: 52+
 * Safari: 9+
 * iOS (Safari): 9+
 * Opera: 30+
 * Opera (Mini): 12+
 * IE: 11+
 * IE (Mobile): 11+
 * Edge: 12+
 * It will only add prefixes if a property still needs them in one of the above mentioned versions.
 * Therefore, e.g. border-radius will not be prefixed at all.
 */
import { prefix } from 'inline-style-prefixer';

/**
 * @export
 * @param {Object} style
 * @returns
 */
export function inlineStyle(style) {
	let oprationStyle = prefix(style || {});
	oprationStyle = onProcessStyle(oprationStyle);
	const keys = Object.keys(oprationStyle);
	let result = null;
	keys.forEach(item => {
		result = (result||'') + `${item}:${oprationStyle[item]};`;
	});
	return result;
}

export function fixpx(px) {
	// eslint-disable-next-line no-undef
	return px ? `${parseFloat(px)/parseFloat(__BASEFONT__)}em`: 0;
}

export function getMsgTopAndBottom(topPos, bottomPos) {
	let top = topPos || 'auto';
	let bottom = bottomPos || 'auto';

	const defauleOffset = '30px';

	if (top ==='auto' && bottom === 'auto' ) {
		top = defauleOffset;
	}
	return {top, bottom };
}