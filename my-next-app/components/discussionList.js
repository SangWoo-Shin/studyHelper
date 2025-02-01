
import styles from '../styles/chat.module.css';

const discussions = [
  {
    name: "Megan Leib",
    time: "12 sec",
    active: true,
  },
  {
    name: "Dave Corlew",
    time: "3 min",
    active: false,
  },
];

const DiscussionList = () => {
  return (
    <section className={styles.discussions}>
      {discussions.map((discussion, index) => (
        <div
          key={index}
          className={`${styles.discussion} ${
            discussion.active ? styles.active : ''
          }`}
        >
          <div
            className={styles.photo}
            style={{ backgroundImage: `url(${discussion.image})` }}
          >
            {discussion.online && <div className={styles.online}></div>}
          </div>
          <div className={styles.descContact}>
            <p className={styles.name}>{discussion.name}</p>
            <p className={styles.message}>{discussion.message}</p>
          </div>
          <div className={styles.timer}>{discussion.time}</div>
        </div>
      ))}
    </section>
  );
};

export default DiscussionList;
