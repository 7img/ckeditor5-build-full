import Command from '@ckeditor/ckeditor5-core/src/command';

class LetterSpacingCommand extends Command {
	execute( {
		size
	} ) {
		const editor = this.editor;

		editor.model.change( writer => {
			// Create a <placeholder> elment with the "name" attribute...
			const placeholder = writer.createElement( 'letterSpacing', {
				view: {
					name: 'span',
					styles: {
						'font-size': `${ size }px`
					},
					priority: 7
				}
			} );

			console.warn(placeholder);
			console.warn(writer);

			// ... and insert it into the document.
			editor.model.insertContent( placeholder );

			// Put the selection on the inserted element.
			writer.setSelection( placeholder, 'on' );
		} );
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;

		const isAllowed = model.schema.checkChild( selection.focus.parent, 'letterSpacing' );

		this.isEnabled = isAllowed;
	}
}

export default LetterSpacingCommand;
