
import s from './Message.scss';
import { onceTransitionEnd } from 'web-animation-club';
import { createDom, removeDom } from '~/utils/htmlFactory.js';

class Message {
	/**
	 *Creates an instance of Modal.
	 * @param { Object } data
	 * @memberof Modal
	 */
	constructor(data) {
		const stamp = (new Date()).getTime();
		const {
			id,
			zIndex,
			style
		} = data || {};

		this.state = {
			id: id || `modal${stamp}-${window.Math.floor(window.Math.random()*100)}`, // modalId 不传自动生成 modal + 时间戳 + 100以内的随机数
			zIndex: zIndex || 100, // 层级
			style: style || null // 基础样式
		};
	}
	/**
	 * @description 创建弹窗
	 * @param {Object} elements {head: htmlDom, main: htmlDom, footer: htmlDom}
	 * @param {Boolean} noRemoval 是否移除弹窗，noRemoval=true时点击关闭按钮仅隐藏当前弹窗而不移除当前弹窗Dom
	 * @memberof Modal
	 */
	create = (content, noRemoval, S) => {
		console.log(noRemoval);
		const { id } = this.state;
		let messageElement = document.getElementById(id);
		if (messageElement) {
			this.show();
			console.warn('已创建message时 message.create === message.show');
			return Promise.resolve();
		}
		return createDom(`<div class="${s.message}">
                ${content}
            </div>`, id)
			.then(() => {
				messageElement = document.getElementById(id);
				const boxElement = messageElement.querySelector(`.${s.message}`);
				return new Promise(resolve => {
					window.setTimeout(() => {
						boxElement.classList.add(s.messageshow);
						resolve(boxElement);
					}, 10);
				});
			})
			.then(boxElement => onceTransitionEnd(boxElement))
			.then(res => new Promise(resolve => {
				window.setTimeout(() => {
					res.target.classList.add(s.messageshow);
					resolve(res);
				}, S || 3000);
			}))
			.then(res => {
				res.target.classList.remove(s.messageshow);
			});
	}
	/**
	 *
	 * @description 移除弹窗
	 * @memberof Modal
	 */
	remove = () => new Promise((resolve) => {
		const modalElement = document.getElementById(this.state.id);
		const wrapElement = modalElement.querySelector(`.${s.cove}`);
		wrapElement.classList.remove(s.coveshow);
		resolve(wrapElement);
	})
		.then(wrapElement => onceTransitionEnd(wrapElement))
		.then(() => removeDom(this.state.id));

	/**
	 *
	 * @description 显示弹窗
	 * @memberof Modal
	 */
	show = () => {
		const {id} = this.state;
		const modalElement = document.getElementById(id);
		return new Promise((resolve, reject) => {
			const wrapElement = modalElement.querySelector(`.${s.cove}`);
			if (!modalElement) {
				reject('未创建或者已移除modal');
				return;
			}
			modalElement.style.display = 'block';
			window.setTimeout(() => {
				wrapElement.classList.add(s.coveshow);
				resolve();
			}, 10);
		});
	}
	/**
	 *
	 * @description 隐藏弹窗
	 * @memberof Modal
	 */
	unvisible = () => {
		const {id} = this.state;
		const modalElement = document.getElementById(id);
		return new Promise((resolve, reject) => {
			const wrapElement = modalElement.querySelector(`.${s.cove}`);
			if (!modalElement) {
				reject('未创建modal');
				return;
			}
			wrapElement.classList.remove(s.coveshow);
			resolve(wrapElement);
		})
			.then(wrapElement => onceTransitionEnd(wrapElement))
			.then(() => modalElement.style.display = 'none');
	}
	
	/**
	 * @description 隐藏或移除弹窗
	 * @param {Boolean} noRemoval 是否移除弹窗，noRemoval=true时仅隐藏当前弹窗而不移除当前弹窗Dom
	 * @memberof Modal
	 */
	hide = (noRemoval) => {
		if (noRemoval === true) {
			return this.unvisible();
		}
		return this.remove();
	}
    
}

export default Message;