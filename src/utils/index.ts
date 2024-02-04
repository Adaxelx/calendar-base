export const range = (start: number, end: number) => {
	return Array.from(
		{
			length: end - start + 1,
		},
		(_, i) => i + start,
	)
}

export const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1)
}
