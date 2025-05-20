import { Outlet } from 'react-router-dom';
import Header from './header-app.tsx';

export default function Layout_app() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
}
