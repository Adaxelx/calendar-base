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

export function getRandomInt(min: number, max: number) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export const passInputEventAsValue =
	(callback: (value: string) => void) =>
	(event: React.ChangeEvent<HTMLInputElement>) => {
		callback(event.target.value)
	}
