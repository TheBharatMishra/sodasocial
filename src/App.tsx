// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './pages/main';
import { Login } from './pages/login';
import Navbar from './components/navbar';
function App() {
	return (
		<>
			<main className='bg-purple-500'>
				<Router>
					<Navbar />
					<Routes>
						<Route
							path='/'
							element={<Main />}
						/>
						<Route
							path='/login'
							element={<Login />}
						/>
					</Routes>
				</Router>
			</main>
		</>
	);
}

export default App;
