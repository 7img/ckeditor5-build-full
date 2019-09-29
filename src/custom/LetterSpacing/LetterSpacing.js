import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import {
	LetterSpacingEditing
} from './';

class LetterSpacing extends Plugin {
	static get requires() {
		return [ LetterSpacingEditing ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'LetterSpacing';
	}
}

export default LetterSpacing;
