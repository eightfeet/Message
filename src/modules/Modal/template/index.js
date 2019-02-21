import s from './index.scss';
import { inlineStyle } from '~/utils/tools';

export default function (elements, config) {
	const { style, zIndex, closable } = config || {};
	const { overlay, content, modify, close } = style || {};
	const operateElements = elements || {};
	const operateModify = modify || [];
	let doms= null;

	for (let index = 0; index < operateModify.length; index++) {
		const elementStyle = operateModify[index];
		doms = (doms || '') + `<div class="${s.modify}" style="${inlineStyle(elementStyle)} z-index: ${zIndex + index * 2}">&nbsp;</div>`;
	}

	return (
		`<div class="modal____wrap ${s.modal}" style="z-index:${zIndex}">
			<div class="${s.cove}" ${overlay && `style="${inlineStyle(overlay)}"`}>
					<div class="${s.content}">
						${doms || ''}
						<div class="${s.modules}" ${content && `style="z-index:${zIndex}; box-sizing: border-box; ${inlineStyle(content)}"`}>
							${operateElements.header ? `<div class="${s.center}">${operateElements.header}</div>` : ''}
							${operateElements.main ? `<div class="${s.left}">${operateElements.main}</div>` : ''}
							${operateElements.footer ? `<div class="${s.center}">${operateElements.footer}</div>` : ''}
						</div>
						${closable ? (close ? `<div class=${s.close} style="${inlineStyle(close)} z-index: ${zIndex + operateModify.length * 2}"></div>` : '') : ''}
					</div>
				</div>
			</div>
		</div>`
	);
}