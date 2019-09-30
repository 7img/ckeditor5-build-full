/**
 * The list of supported alignment options:
 *
 * * `'left'`,
 * * `'right'`,
 * * `'center'`,
 * * `'justify'`
 */
export const supportedOptions = [
	'default',
	'0.2em',
	'0.4em',
	'0.6em',
	'0.8em',
	'1em',
	'1.2em',
	'1.4em',
	'1.6em',
	'1.8em',
	'2em',
	'2.2em',
	'2.4em',
	'2.6em',
	'2.8em',
	'3em'
];

export const PLUGIN_NAME = 'lineHeight';

/**
 * Checks whether the passed option is supported by {@link module:alignment/alignmentediting~AlignmentEditing}.
 *
 * @param {String} option The option value to check.
 * @returns {Boolean}
 */
export function isSupported(option) {
	return supportedOptions.includes(option);
}

/**
 * Checks whether alignment is the default one considering the direction
 * of the editor content.
 *
 * @param {String} alignment The name of the alignment to check.
 * @param {module:utils/locale~Locale} locale The {@link module:core/editor/editor~Editor#locale} instance.
 * @returns {Boolean}
 */
export function isDefault(value) {
	return value === 'default';
}
