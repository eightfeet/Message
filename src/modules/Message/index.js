
import s from './Message.scss';
import { onceTransitionEnd } from '~/utils/web-animation-club.js';
import { createDom, removeDom } from '~/utils/htmlFactory.js';
import { inlineStyle, getMsgTopAndBottom } from '~/utils/tools.js';

class Message {
	/**
	 *Creates an instance of message.
	 * @param { Object } data
	 * @memberof Message
	 */
	constructor(data) {
		const stamp = (new Date()).getTime();
		const {
			id,
			zIndex,
			style,
			directionFrom,
			top,
			parentId,
			emBase
		} = data || {};

		this.state = {
			id: id || `message${stamp}-${window.Math.floor(window.Math.random()*100)}`, // messageId 不传自动生成 message + 时间戳 + 100以内的随机数
			zIndex: zIndex || 10000, // 层级
			style: style || null, // 基础样式
			directionFrom,
			parentId,
			top,
			emBase
		};
	}

	/**
	 * @description 创建message
	 * @param {Object} elements {head: htmlDom, main: htmlDom, footer: htmlDom}
	 * @param {Boolean} noRemoval 是否移除message，noRemoval=true时点击关闭按钮仅隐藏当前message而不移除当前messageDom
	 * @memberof Message
	 */
	create = (content, time, noRemoval) => {
		const { id, zIndex, parentId, style, emBase} = this.state;
		const parentIdDom = document.getElementById(parentId);
		const { wrap, main } = style || {};
		let messageElement = document.getElementById(id);
		if (messageElement) {
			this.show(content, time);
			console.warn('已创建message时 message.create === message.show');
			return Promise.resolve();
		}

		const {top, bottom, ...other} = wrap || {};

		const msgPosition = getMsgTopAndBottom(top, bottom);

		return createDom(`<div class="${s.wrap}"><div class="${s.message}"
			style="position: ${parentIdDom ? 'absolute' : 'fixed'}; ${inlineStyle(other)||''}
				top:${msgPosition.top}; bottom:${msgPosition.bottom};
				z-index: ${zIndex};
			">
				<div class="${s.messagecontent}" style="${inlineStyle(main)||''} position: static;">
					${content}
				</div>
            </div></div>`, id, parentId, emBase)
			.then(() => {
				messageElement = document.getElementById(id);
				const boxElement = messageElement.querySelector(`.${s.message}`);
				return this.animateAction(boxElement, time);
			}).then(() => this.hide(noRemoval));
	}

	animateAction = (element, time) => {
		const directionFromClass = this.state.directionFrom === 'top' ? s.messageshowbottom : s.messageshowtop;
		return new Promise(resolve => {
			window.setTimeout(() => {
				element.classList.add(directionFromClass);
				resolve(element);
			}, 10);
		})
			.then(el => onceTransitionEnd(el))
			.then(res => new Promise(resolve => {
				window.setTimeout(() => {
					resolve(res);
				}, time || 3000);
			}))
			.then(res => {
				res.target.classList.remove(directionFromClass);
				return res.target;
			})
			.then(el => onceTransitionEnd(el));
	};

	/**
	 *
	 * @description 移除message
	 * @memberof Message
	 */
	remove = () => {
		if (!document.getElementById(this.state.id)) {
			throw '未创建Message';
		}
		return removeDom(this.state.id);
	};

	/**
	 *
	 * @description 显示message
	 * @memberof Message
	 */
	show = (content, time) => {
		const {id} = this.state;
		const messageElement = document.getElementById(id);
		if (!messageElement) {
			throw '未创建Message';
		}
		const boxElement = messageElement.querySelector(`.${s.message}`);
		const contentElement = messageElement.querySelector(`.${s.messagecontent}`);
		contentElement.innerHTML = content;
		return this.animateAction(boxElement, time);
	}

	/**
	 *
	 * @description 隐藏message
	 * @memberof Message
	 */
	unvisible = () => {
		const {id, directionFrom} = this.state;
		const directionFromClass = directionFrom === 'top' ? s.messageshowbottom : s.messageshowtop;
		const messageElement = document.getElementById(id);
		return new Promise((resolve, reject) => {
			const boxElement = messageElement.querySelector(`.${s.message}`);
			if (!messageElement) {
				reject('未创建Message');
				return;
			}
			boxElement.classList.remove(directionFromClass);
			resolve(boxElement);
		})
			.then(boxElement => onceTransitionEnd(boxElement));
	}
	
	/**
	 * @description 隐藏或移除message
	 * @param {Boolean} noRemoval 是否移除message，noRemoval=true时仅隐藏当前message而不移除当前messageDom
	 * @memberof Message
	 */
	hide = (noRemoval) => {
		if (noRemoval === true) {
			return this.unvisible();
		}
		return this.remove();
	}
    
}

export default Message;