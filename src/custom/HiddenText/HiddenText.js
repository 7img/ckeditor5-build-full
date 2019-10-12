import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { HiddenTextEditing } from './';

class HiddenText extends Plugin {
  static get requires() {
    return [HiddenTextEditing];
  }

  static get pluginName() {
    return 'HiddenText';
  }
}

export default HiddenText;
