import { useContext } from 'react';
import { AuthContext } from '../App';


interface Props {
    children: any
}

export default function ProtectedRoute({ children }: Props) {

    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
        return (
            <div>You are not logged in</div>
        )
    } else {
        return children;
    }
}
