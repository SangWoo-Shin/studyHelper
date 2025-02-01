import { SessionProvider, useSession } from 'next-auth/react'


const Provider = ({ children }) => {
    const {data: session, status} = useSession();
    if (status === 'loading') return <p>Loading...</p>;

    return <>{children}</>;
}

export default Provider;

