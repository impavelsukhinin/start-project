declare module '*.png'

declare module '*.svg'

declare module '*.css' {
	const content: {
		[className: string]: string;
	}

	export default content
}

declare module '*.pcss' {
	const content: {
		[className: string]: string;
	}

	export default content
}
