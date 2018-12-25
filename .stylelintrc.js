const trbl = (name, suffix = '') => {
	const props = [
		name,
		`${name}-top`,
		`${name}-right`,
		`${name}-bottom`,
		`${name}-left`
	]

	if (suffix.length === 0) {
		return props
	}

	return props.map(prop => `${prop}-${suffix}`)
}

const minMax = (suffix) => [
	suffix,
	`min-${suffix}`,
	`max-${suffix}`,
]

module.exports = {
	plugins: 'stylelint-order',
	extends: 'stylelint-config-standard',
	ignoreFiles: './scripts/*',
	rules: {
		'order/order': [
			['custom-properties'],
			{ unspecified: 'bottom' }
		],
		'order/properties-order': [
			[
				{
					emptyLineBefore: 'always',
					properties: [
						'all',
						'composes',
					],
				},
				{
					emptyLineBefore: 'always',
					properties: [
						'position',
						'z-index',
						'top',
						'right',
						'bottom',
						'left',
					],
				},
				{
					emptyLineBefore: 'always',
					properties: [
						'display',
						'overflow',
						'overflow-x',
						'overflow-y',
						...minMax('width'),
						...minMax('height'),
						'box-sizing',
						'flex',
						'flex-basis',
						'flex-direction',
						'flex-flow',
						'flex-grow',
						'flex-shrink',
						'flex-wrap',
						'align-content',
						'align-items',
						'align-self',
						'justify-content',
						'order',
						...trbl('padding'),
						...trbl('border'),
						...trbl('border', 'width'),
						...trbl('border', 'style'),
						...trbl('border', 'color'),
						...trbl('margin'),
					],
				},
			],
			{
				unspecified: 'bottomAlphabetical'
			},
		],
		'font-family-name-quotes': 'always-where-required',
		'function-url-quotes': 'never',
		'string-quotes': 'single',
		'custom-property-pattern': '^[a-z][a-z\\d]+(-[a-z\\d]+)*$',
		'selector-class-pattern': '^[a-z][a-zA-Z\\d]+$',
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global']
			}
		],
		'indentation': 'tab',
		'declaration-empty-line-before': [
			'never',
			{
				'ignore': ['after-declaration']
			}
		],
		'property-no-unknown': [
			true,
			{
				'ignoreProperties': ['composes']
			}
		],
		'no-descending-specificity': null,
		'declaration-block-no-redundant-longhand-properties': null,
		'font-family-no-missing-generic-family-keyword': null,
	}
}
