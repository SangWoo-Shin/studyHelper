import { SessionProvider } from "next-auth/react";
import '../styles/global.css'
import RouteGuard from "../components/routeGuard";
import { Container } from "react-bootstrap";
import Layout from "../components/layout";

const App = ({ Component, pageProps }) => {
  return (
      <RouteGuard>
        <Container>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Container>
      </RouteGuard>
  );
};

export default App;