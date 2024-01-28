import {
	Root,
	Content,
	Overlay,
	Portal,
	Close,
	Trigger,
} from '@radix-ui/react-dialog'
import type { HTMLAttributes } from 'react'

import { Cross1Icon } from '@radix-ui/react-icons'

export type ModalProps = {
	trigger: React.ReactNode
} & HTMLAttributes<HTMLDivElement>

const Modal = ({
	children,
	trigger,
	className = '',
	...delegated
}: ModalProps) => {
	return (
		<Root>
			{trigger}
			<Portal>
				<Overlay className="grid place-content-center p-3 w-full h-full bg-primary-600 bg-opacity-40 fixed top-0" />
				<Content
					{...delegated}
					className={`fixed w-[calc(100%-24px)] max-h-[calc(100%-24px)] max-w-sm top-1/2 -translate-x-1/2 -translate-y-1/2  flex flex-col  left-1/2 my-0  bg-accent-500 rounded p-4 text-white ${className}`}
				>
					<Close
						className="self-end text-red-100 flex h-8 w-8 items-center justify-center"
						aria-label="Close"
					>
						<span className="sr-only">Zamknij</span>
						<Cross1Icon />
					</Close>
					<section className={`overflow-auto h-full`}>{children} </section>
				</Content>
			</Portal>
		</Root>
	)
}

Modal.Trigger = Trigger

export default Modal
