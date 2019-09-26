import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

class LetterSpacingUI extends Plugin {
	init() {
		const editor = this.editor;
		const t = editor.t;
		const placeholderNames = editor.config.get( 'placeholderConfig.types' );

		// The "placeholder" dropdown must be registered among the UI components of the editor
		// to be displayed in the toolbar.
		editor.ui.componentFactory.add( 'placeholder', locale => {
			const dropdownView = createDropdown( locale );

			// Populate the list in the dropdown with items.
			addListToDropdown( dropdownView, getDropdownItemsDefinitions( placeholderNames ) );

			dropdownView.buttonView.set( {
				// The t() function helps localize the editor. All strings enclosed in t() can be
				// translated and change when the language of the editor changes.
				label: t( 'Placeholder' ),
				tooltip: true,
				withText: true
			} );

			// Execute the command when the dropdown item is clicked (executed).
			this.listenTo( dropdownView, 'execute', evt => {
				editor.execute( 'placeholder', {
					value: evt.source.commandParam
				} );
				editor.editing.view.focus();
			} );

			return dropdownView;
		} );
	}
}

export default LetterSpacingUI;
