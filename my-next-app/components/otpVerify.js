import { Modal, Button, Container, Form } from 'react-bootstrap';
import { useState } from "react";
import { setToken, setEmailLocal } from '../lib/storingUser';
import { useAtom } from 'jotai';
import { emailAtom, passwordAtom, nameAtom } from '../lib/atom';
import { useRouter } from 'next/router';
import style from '../styles/verfiyModal.module.css';

const OtpVerify = ({ show, onHide }) => {
    const router = useRouter();
    const [otp, setOtp] = useState('');
    const [name, setName] = useAtom(nameAtom);
    const [password, setPassword] = useAtom(passwordAtom);
    const [email, setEmail] = useAtom(emailAtom);
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKENDURL+'/verify/otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, email, otp, password})
            });

            const data = await response.json();
            if (response.status == 200) {
                setToken(data.token);
                const res = await fetch(process.env.NEXT_PUBLIC_BACKENDURL+'/getUser', {
                    method: 'GET',
                    headers: {
                        Authorization: `JWT ${data.token}`,
                    },
                });
                const authData = await res.json();
                console.log(authData);
                setEmailLocal(authData.email);
                localStorage.setItem('userId', data.user._id);
                if(data.exists) {
                    setMessage('Authentication successful. You can now log in.');
                }
                else {
                    console.log("Invalid OTP code.");
                }
            } else {
                alert(data.error);
            }

        } catch (err) {
            console.error('An error occurred', err);
            alert("An error occurred Please try again");
        }
    }

    return (
        <Modal show={show} onHide={onHide} className={style['modal-background']}>
            <Container className={style['modal-content']}>
                <Container className={style.header}>
                    <Button onClick={onHide} className={style['closeButton']}>X</Button>
                </Container>
            <Modal.Body>
                <p className={style.p}>Please enter the OTP sent to your email.</p>
                {message && <p className={style.message}>{message}</p>}
                <Form className={style.form} onSubmit={handleSubmit}>
                    <Form.Control className={style.input} placeholder='Type OTP code sent to your email' value={otp} onChange={(e) => setOtp(e.target.value)}/>
                    <Button type="submit" className={style.button}>Submit</Button> 
                </Form>                
            </Modal.Body>
            </Container>
        </Modal>
    )
}

export default OtpVerify;
