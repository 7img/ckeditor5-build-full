/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module font/fontcommand
 */

import Command from '@ckeditor/ckeditor5-core/src/command';
import { LETTER_SPACING } from './utils';

/**
 * The base font command.
 *
 * @extends module:core/command~Command
 */
class LetterSpacingCommand extends Command {
	/**
	 * Creates an instance of the command.
	 */
	constructor(editor) {
		super(editor);

		this.attributeKey = LETTER_SPACING;
	}

	/**
	 * @inheritDoc
	 */
	refresh() {
		const model = this.editor.model;
		const doc = model.document;

		this.value = doc.selection.getAttribute(this.attributeKey);
		this.isEnabled = model.schema.checkAttributeInSelection(doc.selection, this.attributeKey);
	}

	/**
	 * Executes the command. Applies the `value` of the {@link #attributeKey} to the selection.
	 * If no `value` is passed, it removes the attribute from the selection.
	 */
	execute(options = {}) {
		const model = this.editor.model;
		const document = model.document;
		const selection = document.selection;
		const value = options.value;

		model.change(writer => {
			if (selection.isCollapsed) {
				if (value) {
					writer.setSelectionAttribute(this.attributeKey, value);
				} else {
					writer.removeSelectionAttribute(this.attributeKey);
				}
			} else {
				const ranges = model.schema.getValidRanges(
					selection.getRanges(),
					this.attributeKey
				);

				for (const range of ranges) {
					if (value) {
						writer.setAttribute(this.attributeKey, value, range);
					} else {
						writer.removeAttribute(this.attributeKey, range);
					}
				}
			}
		});
	}
}

export default LetterSpacingCommand;
