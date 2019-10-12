/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module font/fontsize/fontsizeediting
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { LetterSpacingCommand } from './';
import { normalizeOptions, buildDefinition, LETTER_SPACING } from './utils';

/**
 * The letter spacing editing feature.
 */
class LetterSpacingEditing extends Plugin {
  /**
   * @inheritDoc
   */
  constructor(editor) {
    super(editor);

    // Define default configuration using named presets.
    editor.config.define(LETTER_SPACING, {
      options: ['tiny', 'small', 'default', 'big', 'huge']
    });

    // Define view to model conversion.
    const options = normalizeOptions(this.editor.config.get('letterSpacing.options')).filter(
      item => item.model
    );
    const definition = buildDefinition(LETTER_SPACING, options);

    // Set-up the two-way conversion.
    editor.conversion.attributeToElement(definition);
    editor.commands.add(LETTER_SPACING, new LetterSpacingCommand(editor));
  }

  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor;

    // Allow fontSize attribute on text nodes.
    editor.model.schema.extend('$text', { allowAttributes: LETTER_SPACING });
    editor.model.schema.setAttributeProperties(LETTER_SPACING, {
      isFormatting: true,
      copyOnEnter: true
    });
  }
}

export default LetterSpacingEditing;
