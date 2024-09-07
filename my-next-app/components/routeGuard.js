import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import auth from '@/lib/isAuthenticated';

const PUBLIC_PATH = ['/user/login', '/user/otp', '/_error'];

const RouteGuard = (props) => {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const authCheck = (url) => {
            const path = url.split('?')[0];
            if (!auth.isAuthenticated() && !PUBLIC_PATH.includes(path)) {
                setAuthorized(false);
                router.push('/user/login');
            } else {
                setAuthorized(true);
            }
        };

        // Initial load - run auth check
        authCheck(router.pathname);

        // On route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck);

        // Unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        };

    }, [router]);

    // Render children only if authorized
    return authorized ? <>{props.children}</> : null;
};

export default RouteGuard;