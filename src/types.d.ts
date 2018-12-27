declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
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
