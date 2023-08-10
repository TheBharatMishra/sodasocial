import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

export default function Navbar() {
	const [user] = useAuthState(auth);
	const signUserOut = async () => {
		await signOut(auth);
	};
	return (
		<>
			<main className='p-4 space-x-2  bg-yellow-400 flex flex-row items-end justify-end'>
				<Link to='/'>Home</Link>
				<Link to='/login'>Sign In</Link>

				{user && (
					<>
						<div>
							<img
								className='rounded-full '
								src={user?.photoURL || ''}
								width='100'
								height='100'
								alt=''
							/>
							<p>{user?.displayName}</p>
						</div>
						<div>
							<button
								className=''
								onClick={signUserOut}
							>
								Log Out
							</button>
						</div>
					</>
				)}
			</main>
		</>
	);
}
