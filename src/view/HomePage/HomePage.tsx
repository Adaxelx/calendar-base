import { useUser } from '@/components/UserContext'
import ShowCalendarView from '../ShowCalendar/ShowCalendarView'
import LoginPageView from '../LoginPage/LoginPageView'

export default function HomePage() {
	const {
		state: { user },
	} = useUser()
	if (user) {
		return (
			<div className="p-3 flex flex-col gap-2 items-start h-full w-full">
				<ShowCalendarView />
			</div>
		)
	}
	return <LoginPageView />
}
