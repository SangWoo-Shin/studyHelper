import '../styles/global.css'
import RouteGuard from "../components/routeGuard";
import { Container } from "react-bootstrap";
import Layout from "../components/layout";
import { SessionProvider } from "next-auth/react";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <RouteGuard>
        <Container>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Container>
      </RouteGuard>
    </SessionProvider>
  );
};

export default App;