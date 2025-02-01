import styles from "../styles/home.module.css";  // Assuming this stylesheet exists
import SideBar from '../components/sideBar';
import Menu from "../components/menu";
import DiscussionList from "../components/discussionList";
import Chat from "../components/chat";
import { Container } from 'react-bootstrap';

 const Home = () => {
  return (
    <>
      (
        <Container className={styles.Container}>
            <Menu />
            <DiscussionList />
            <Chat />
        </Container>
      )
    </>
  );
}

export default Home;
