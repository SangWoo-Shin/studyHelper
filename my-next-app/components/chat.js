import styles from '../styles/chat.module.css';

const Chat = () => {
  const messages = [
    { text: 'Hi, how are you?', sender: 'Megan Leib', time: '14h58', type: 'received' },
    { text: 'What are you doing tonight? Want to go take a drink?', time: '14h59', type: 'received' },
    { text: 'Hey Megan! It\'s been a while 😃', time: '15h00', type: 'sent' },
    { text: 'When can we meet?', time: '15h02', type: 'sent' },
    { text: '9 pm at the bar if possible 😳', sender: 'Megan Leib', time: '15h09', type: 'received' },
  ];

  return (
    <section className={styles.chat}>
      {/* Chat Header */}
      <div className={styles.headerChat}>
        <i className={`fa fa-user-o ${styles.icon}`} aria-hidden="true"></i>
        <p className={styles.name}>Megan Leib</p>
        <i className={`fa fa-ellipsis-h ${styles.icon} ${styles.right}`} aria-hidden="true"></i>
      </div>

      {/* Chat Messages */}
      <div className={styles.messagesChat}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.type === 'sent' ? styles.sentMessage : styles.receivedMessage}
          >
            {message.type === 'received' && (
              <div
                className={styles.photo}
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1050&q=80)',
                }}
              ></div>
            )}
            <p className={styles.text}>{message.text}</p>
          </div>
        ))}
      </div>

      {/* Chat Footer */}
      <div className={styles.footerChat}>
        <i className={`fa fa-smile-o ${styles.icon}`} aria-hidden="true"></i>
        <input
          type="text"
          className={styles.writeMessage}
          placeholder="Type your message here"
        />
        <i className={`fa fa-paper-plane-o ${styles.icon} ${styles.send}`} aria-hidden="true"></i>
      </div>
    </section>
  );
};

export default Chat;
