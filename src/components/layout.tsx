import { Outlet } from 'react-router-dom';
import Header from './header.tsx';   // выдели header отдельно, если нужно
import Footer from './footer.tsx';   // можно тоже вынести

export default function Layout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
