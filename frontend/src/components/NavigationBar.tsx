import { redirect, useNavigate } from 'react-router-dom';


export default function NavigationBar() {

    const routes = ['/login', '/signup', '/members', '/favorites'];
    const navigate = useNavigate();

    function goTo(location: string) {
        navigate(location)
    }

    return (
        <div>
            <button onClick={() => goTo(routes[0])}>Login</button>
            <button onClick={() => goTo(routes[1])}>Signup</button>
            <button onClick={() => goTo(routes[2])}>Members</button>
            <button onClick={() => goTo(routes[3])}>Favorites</button>
        </div>
    )
}