import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
        <nav className='flex justify-center'>
            <ul className='flex gap-9'>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/login'}>Login</Link></li>
                <li><Link to={'/register'}>Register</Link></li>
            </ul>
        </nav>
        <Outlet />
    </>
  )
}
