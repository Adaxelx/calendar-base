import { useUser } from '@/components/UserContext'
import ShowCalendarView from '../ShowCalendar/ShowCalendarView'
import LoginPageView from '../LoginPage/LoginPageView'
import DeleteAccount from '../DeleteAccount/DeleteAccount'
import EditAccount from '../EditAccount/EditAccount'

export default function HomePage() {
	const {
		state: { user },
	} = useUser()
	if (user) {
		return (
			<div className="p-3 flex flex-col gap-2 items-start h-full w-full">
				<nav className="flex-1 w-full">
					<div className="flex justify-between items-center">
						<p className=" font-medium text-accent-600 text-lg">{`Witaj ${user.username}!`}</p>
						<div className="flex justify-end items-start gap-3">
							<EditAccount />
							<DeleteAccount />
						</div>
					</div>
				</nav>
				<ShowCalendarView />
				<div className="flex-1" />
			</div>
		)
	}
	return <LoginPageView />
}
