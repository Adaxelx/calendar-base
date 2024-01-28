import Button from '../Button'
import { Link } from '../Button'
import { render, screen } from '@/utils/test'

describe('Button component', () => {
	test('renders button with default props', () => {
		render(<Button>Click me</Button>)
		const buttonElement = screen.getByRole('button')
		expect(buttonElement).toBeInTheDocument()
		expect(buttonElement).toHaveTextContent('Click me')
		expect(buttonElement).toHaveClass('text-accent-900')
	})

	test('renders button with custom props', () => {
		render(
			<Button variant="secondary" size="big" colorVariant="error">
				Delete
			</Button>,
		)
		const buttonElement = screen.getByRole('button')
		expect(buttonElement).toBeInTheDocument()
		expect(buttonElement).toHaveTextContent('Delete')
		expect(buttonElement).toHaveClass('text-red-900')
		expect(buttonElement).toHaveClass('text-4xl')
	})
})

describe('Link component', () => {
	test('renders link with default props', () => {
		render(<Link href="#">Go to homepage</Link>)
		const linkElement = screen.getByRole('link')
		expect(linkElement).toBeInTheDocument()
		expect(linkElement).toHaveTextContent('Go to homepage')
		expect(linkElement).toHaveClass('text-accent-900')
	})

	test('renders disabled link', () => {
		render(
			<Link href="#" disabled>
				Disabled link
			</Link>,
		)
		const linkElement = screen.getByRole('button')
		expect(linkElement).toBeInTheDocument()
		expect(linkElement).toHaveTextContent('Disabled link')
		expect(linkElement).toHaveAttribute('disabled')
		expect(linkElement).toHaveClass('disabled:text-gray-800')
	})
})
