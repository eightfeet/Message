export function setCssEndEvent(element, type) {
	return new Promise((resolve) => {
		if (!element) {
			resolve(false);
			return;
		}
		let eventName = null;
		const capitalized = type.charAt(0).toUpperCase() + type.slice(1);
		function end(event) {
			const target = event.srcElement || event.target;
			if (target === element) {
				element.removeEventListener(eventName, end);
				resolve(event);
			}
		}
		if (element.style[`Webkit${capitalized}`] !== undefined) {
			eventName = `webkit${capitalized}End`;
		}
		if (element.style.OTransition !== undefined) {
			eventName = `o${type}End`;
		}
		if (element.style[type] !== undefined) {
			eventName = `${type}end`;
		}
		element.addEventListener(eventName, end);
	});
}
  
export function onceTransitionEnd(element, options = {}) {
	return new Promise((resolve) => {
		setCssEndEvent(element, 'transition', options).then(resolve);
	});
}
  