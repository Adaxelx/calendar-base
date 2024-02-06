export const splitEventFormattedTime = (formattedTime: string) => {
	return formattedTime.replace(/\s/g, '').split('-')
}
