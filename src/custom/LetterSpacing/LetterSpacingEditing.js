import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import LetterSpacingCommand from './';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';

const name = 'letterSpacing';

class LetterSpacingEditing extends Plugin {
	static get requires() {
		return [ Widget ];
	}

	init() {
		console.warn( 'LetterSpacingEditing#init() got called' );

		this._defineSchema();
		this._defineConverters();

		this.editor.commands.add( name, new LetterSpacingCommand( this.editor ) );

		// this.editor.editing.mapper.on(
		// 	'viewToModelPosition',
		// 	viewToModelPositionOutsideModelElement(this.editor.model, viewElement => viewElement.hasClass( name ) )
		// )
		//

		this.editor.config.define( 'placeholderConfig', {
			types: [ 'date', 'first name', 'surname' ]
		} );
	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register( name, {
			// Allow wherever text is allowed:
			allowWhere: '$text',

			// The placeholder will act as an inline node:
			isInline: true,

			// The inline widget is self-contained so it cannot be split by the caret and it can be selected:
			isObject: true,

			// The placeholder can have many types, like date, name, surname, etc:
			allowAttributes: [ 'name' ]
		} );
	}

	_defineConverters() {
		const conversion = this.editor.conversion;

		conversion.for( 'upcast' ).elementToElement( {
			view: {
				name: 'span',
				classes: [ name ]
			},
			model: ( viewElement, modelWriter ) => {
				// Extract the "name" from "{name}".
				const name = viewElement.getChild( 0 ).data.slice( 1, -1 );

				return modelWriter.createElement( name, {
					name
				} );
			}
		} );

		conversion.for( 'editingDowncast' ).elementToElement( {
			model: name,
			view: ( modelItem, viewWriter ) => {
				const widgetElement = createPlaceholderView( modelItem, viewWriter );

				// Enable widget handling on a placeholder element inside the editing view.
				return toWidget( widgetElement, viewWriter );
			}
		} );

		conversion.for( 'dataDowncast' ).elementToElement( {
			model: name,
			view: createPlaceholderView
		} );

		// Helper method for both downcast converters.
		function createPlaceholderView( modelItem, viewWriter ) {
			const name = modelItem.getAttribute( 'name' );

			const placeholderView = viewWriter.createContainerElement( 'span', {
				class: name
			} );

			// Insert the placeholder name (as a text).
			const innerText = viewWriter.createText( '{' + name + '}' );
			viewWriter.insert( viewWriter.createPositionAt( placeholderView, 0 ), innerText );

			return placeholderView;
		}
	}
}

export default LetterSpacingEditing;
