/**
 * Normalizes and translates the {@link module:font/fontsize~FontSizeConfig#options configuration options}
 * to the {@link module:font/fontsize~FontSizeOption} format.
 */
export function normalizeOptions( configuredOptions ) {
	// Convert options to objects.
	return configuredOptions
		.map( getOptionDefinition )
		// Filter out undefined values that `getOptionDefinition` might return.
		.filter( option => !!option );
}

export const LETTER_SPACING = 'letterSpacing';

// Default named presets map.
const namedPresets = {
	tiny: {
		title: 'Tiny',
		model: 'tiny',
		view: {
			name: 'span',
			classes: 'text-tiny',
			priority: 7
		}
	},
	small: {
		title: 'Small',
		model: 'small',
		view: {
			name: 'span',
			classes: 'text-small',
			priority: 7
		}
	},
	big: {
		title: 'Big',
		model: 'big',
		view: {
			name: 'span',
			classes: 'text-big',
			priority: 7
		}
	},
	huge: {
		title: 'Huge',
		model: 'huge',
		view: {
			name: 'span',
			classes: 'text-huge',
			priority: 7
		}
	}
};

// Returns an option definition either from preset or creates one from number shortcut.
// If object is passed then this method will return it without alternating it. Returns undefined for item than cannot be parsed.
//
// @param {String|Number|Object} item
// @returns {undefined|module:font/fontsize~FontSizeOption}
function getOptionDefinition( option ) {
	// Treat any object as full item definition provided by user in configuration.
	if ( typeof option === 'object' ) {
		return option;
	}

	// Item is a named preset.
	if ( namedPresets[ option ] ) {
		return namedPresets[ option ];
	}

	// 'Default' font size. It will be used to remove the fontSize attribute.
	if ( option === 'default' ) {
		return {
			model: undefined,
			title: 'Default'
		};
	}

	// At this stage we probably have numerical value to generate a preset so parse it's value.
	const sizePreset = parseFloat( option );

	// Discard any faulty values.
	if ( isNaN( sizePreset ) ) {
		return;
	}

	// Return font size definition from size value.
	return generatePixelPreset( sizePreset );
}

// Creates a predefined preset for pixel size.
//
// @param {Number} size Font size in pixels.
// @returns {module:font/fontsize~FontSizeOption}
function generatePixelPreset( size ) {
	const sizeName = String( size );

	return {
		title: sizeName,
		model: size,
		view: {
			name: 'span',
			styles: {
				'letter-spacing': `${ size }px`
			},
			priority: 7
		}
	};
}

export function buildDefinition( modelAttributeKey, options ) {
	const definition = {
		model: {
			key: modelAttributeKey,
			values: []
		},
		view: {},
		upcastAlso: {}
	};

	for ( const option of options ) {
		definition.model.values.push( option.model );
		definition.view[ option.model ] = option.view;

		if ( option.upcastAlso ) {
			definition.upcastAlso[ option.model ] = option.upcastAlso;
		}
	}

	console.warn('example', definition);

	return definition;
}
