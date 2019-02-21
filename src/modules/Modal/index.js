import template from './template/index';
import { onceTransitionEnd } from 'web-animation-club';
import s from './template/index.scss';
import { createDom, removeDom } from '~/utils/htmlFactory.js';

class Modal {
	/**
	 *Creates an instance of Modal.
	 * @param { Object } data
	 * @memberof Modal
	 */
	constructor(data) {
		const stamp = (new Date()).getTime();
		const {
			id,
			shouldCloseOnOverlayClick,
			zIndex,
			closable,
			style,
			Animation
		} = data || {};

		this.state = {
			id: id || `modal${stamp}-${window.Math.floor(window.Math.random()*100)}`, // modalId 不传自动生成 modal + 时间戳 + 100以内的随机数
			shouldCloseOnOverlayClick: shouldCloseOnOverlayClick === true, // 点击背景层关闭弹窗
			zIndex: zIndex || 100, // 层级
			closable: closable === false ? false : true, // 是否自带关闭按钮
			style: style || null, // 基础样式
			Animation: Animation === false ? false : true // 是否开启弹窗动画
		};
	}
	/**
	 * @description 创建弹窗
	 * @param {Object} elements {head: htmlDom, main: htmlDom, footer: htmlDom}
	 * @param {Boolean} noRemoval 是否移除弹窗，noRemoval=true时点击关闭按钮仅隐藏当前弹窗而不移除当前弹窗Dom
	 * @memberof Modal
	 */
	create = (elements, noRemoval) => {
		const {id, shouldCloseOnOverlayClick, ...other} = this.state;
		let modalElement = document.getElementById(id);
		if (modalElement) {
			this.show();
			console.warn('已创建modal时 modal.create === modal.show');
			return Promise.resolve();
		}
		return createDom(template(elements, other), id)
			.then(() => {
				modalElement = document.getElementById(id);
				const elementClose = modalElement.querySelector(`.${s.close}`);
				const wrapElement = modalElement.querySelector(`.${s.cove}`);
				if (shouldCloseOnOverlayClick === true) {
					// element.onclick = e => e.stopPropagation(); 是否阻止事件冒泡（待定）
					wrapElement.onclick = () => {
						this.hide(noRemoval);
					};
				}
				if (elementClose) {
					elementClose.onclick = () => this.hide(noRemoval);
				}
				return new Promise(resolve => {
					window.setTimeout(() => {
						wrapElement.classList.add(s.coveshow);
						resolve(wrapElement);
					}, 10);
				});
			})
			.then(wrapElement => onceTransitionEnd(wrapElement));
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

export default Modal;