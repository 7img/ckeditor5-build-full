/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module alignment/alignmentcommand
 */

import Command from '@ckeditor/ckeditor5-core/src/command';
import first from '@ckeditor/ckeditor5-utils/src/first';

import { isDefault, PLUGIN_NAME } from './utils';

/**
 * The alignment command plugin.
 *
 * @extends module:core/command~Command
 */
export default class LineHeightCommand extends Command {
  refresh() {
    const editor = this.editor;
    const firstBlock = first(editor.model.document.selection.getSelectedBlocks());

    // As first check whether to enable or disable the command as the value will always be false if the command cannot be enabled.
    this.isEnabled = !!firstBlock && this._canBeLineHeighted(firstBlock);

    if (this.isEnabled && firstBlock.hasAttribute('lineHeight')) {
      this.value = firstBlock.getAttribute('lineHeight');
    } else {
      this.value = 'inherit';
    }
  }

  /**
   * Executes the command. Applies the alignment `value` to the selected blocks.
   * If no `value` is passed, the `value` is the default one or it is equal to the currently selected block's alignment attribute,
   * the command will remove the attribute from the selected blocks.
   *
   * @param {Object} [options] Options for the executed command.
   * @param {String} [options.value] The value to apply.
   * @fires execute
   */
  execute(options = {}) {
    const editor = this.editor;
    const locale = editor.locale;
    const model = editor.model;
    const doc = model.document;

    const value = options.value;

    model.change(writer => {
      // Get only those blocks from selected that can have alignment set
      const blocks = Array.from(doc.selection.getSelectedBlocks()).filter(block =>
        this._canBeLineHeighted(block)
      );
      const currentLineHeight = blocks[0].getAttribute('lineHeight');
      const removeLineHeight = isDefault(value, locale) || currentLineHeight === value || !value;

      if (removeLineHeight) {
        removeLineHeightFromSelection(blocks, writer);
      } else {
        setLineHeightOnSelection(blocks, writer, value);
      }
    });
  }

  /**
   * Checks whether a block can have alignment set.
   *
   * @private
   * @param {module:engine/model/element~Element} block The block to be checked.
   * @returns {Boolean}
   */
  _canBeLineHeighted(block) {
    return this.editor.model.schema.checkAttribute(block, PLUGIN_NAME);
  }
}

// Removes the alignment attribute from blocks.
// @private
function removeLineHeightFromSelection(blocks, writer) {
  for (const block of blocks) {
    writer.removeAttribute(PLUGIN_NAME, block);
  }
}

// Sets the alignment attribute on blocks.
// @private
function setLineHeightOnSelection(blocks, writer, alignment) {
  for (const block of blocks) {
    writer.setAttribute(PLUGIN_NAME, alignment, block);
  }
}
