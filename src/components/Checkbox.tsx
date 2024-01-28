import * as CheckboxRx from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

export default function Checkbox(props: CheckboxRx.CheckboxProps) {
	return (
		<CheckboxRx.Root
			{...props}
			className="hover:bg-violet3 flex h-6 w-6 appearance-none items-center justify-center rounded bg-background border outline-none"
		>
			<CheckboxRx.Indicator>
				<CheckIcon />
			</CheckboxRx.Indicator>
		</CheckboxRx.Root>
	)
}
