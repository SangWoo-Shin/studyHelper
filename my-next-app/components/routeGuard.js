import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import LoginPage from '../pages/user/login'; 

const PUBLIC_PATH = ['/user/login', '/user/otp', '/_error'];

const RouteGuard = (props) => {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        const authCheck = (url) => {
            const path = url.split('?')[0];
            if (status === 'authenticated') {
                if (path === '/user/login') {
                    router.push('/');
                }
            } else if (status === 'unauthenticated' && !PUBLIC_PATH.includes(path)) {
                router.push('/user/login');
            }
        };

        // Run auth check on initial load
        if (status !== 'loading') {
            authCheck(router.pathname);
        }

        // Subscribe to route changes
        router.events.on('routeChangeComplete', authCheck);

        // Clean up on unmount
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        };
    }, [router, status]);

    // Render loading state
    if (status === 'loading') return <p>Loading...</p>;

    // Render children only if authorized
    if (status === 'unauthenticated') {
        return <LoginPage />;
    }

    return <>{props.children}</>;
};

export default RouteGuard;
