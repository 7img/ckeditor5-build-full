import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import HiddenTextCommand from './HiddenTextCommand';
import { isDefault, isSupported, supportedOptions, PLUGIN_NAME } from './utils';

export default class HiddenTextEditing extends Plugin {
  constructor(editor) {
    super(editor);

    editor.config.define('hiddenText');
  }

  init() {
    const editor = this.editor;
    const locale = editor.locale;
    const schema = editor.model.schema;

    // Allow alignment attribute on all blocks.
    schema.extend('$block', { allowAttributes: 'hiddenText' });
    // editor.model.schema.setAttributeProperties('hiddenText', { allowAttributes: true });

    editor.conversion.for('upcast').attributeToAttribute({
      view: 'data-hidden-text',
      model: 'hiddenText'
    });

    editor.conversion.for('downcast').add(dispatcher => {
      dispatcher.on('attribute', (evt, data, conversionApi) => {
        if (!conversionApi.consumable.consume(data.item, evt.name)) {
          return;
        }

        const viewWriter = conversionApi.writer;
        const block = conversionApi.mapper.toViewElement(data.item);

        if (data.attributeNewValue !== null) {
          viewWriter.setAttribute('data-hidden-text', data.attributeNewValue, block);
        } else {
          viewWriter.removeAttribute('data-hidden-text', block);
        }
      });
    });

    editor.commands.add('hiddenText', new HiddenTextCommand(editor));
  }
}
