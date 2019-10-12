import Command from '@ckeditor/ckeditor5-core/src/command';
import { PLUGIN_NAME } from './utils';
import first from '@ckeditor/ckeditor5-utils/src/first';

/**
 * The base font command.
 */
class HiddenTextCommand extends Command {
  /**
   * Creates an instance of the command.
   */
  constructor(editor) {
    super(editor);

    this.attributeKey = PLUGIN_NAME;
  }

  /**
   * @inheritDoc
   */
  refresh() {
    const firstBlock = first(this.editor.model.document.selection.getSelectedBlocks());

    this.isEnabled = !!firstBlock && this._canBeSet(firstBlock);

    if (this.isEnabled && firstBlock.hasAttribute(PLUGIN_NAME)) {
      this.value = firstBlock.getAttribute(PLUGIN_NAME);
    } else {
      this.value = '';
    }
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
      // Get only those blocks from selected that can have alignment set
      const blocks = Array.from(document.selection.getSelectedBlocks()).filter(block =>
        this._canBeSet(block)
      );
      const currentValue = blocks[0].getAttribute(PLUGIN_NAME);

      if (value) {
        setOnSelection(blocks, writer, value);
      } else {
        removeFromSelection(blocks, writer);
      }
    });
  }

  _canBeSet(block) {
    return this.editor.model.schema.checkAttribute(block, PLUGIN_NAME);
  }
}

function removeFromSelection(blocks, writer) {
  for (const block of blocks) {
    writer.removeAttribute(PLUGIN_NAME, block);
  }
}

function setOnSelection(blocks, writer, value) {
  for (const block of blocks) {
    writer.setAttribute(PLUGIN_NAME, value, block);
  }
}

export default HiddenTextCommand;
