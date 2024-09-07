import { Button, Form } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { emailAtom } from './emailAtom';
import { useState } from 'react';
import { setToken, setEmailLocal } from '@/lib/storingUser';
import { useRouter } from 'next/router';

export default function Otp() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  
  const [email, setEmail] = useAtom(emailAtom);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(processREMOVED_SECRETS.NEXT_PUBLIC_BACKENDURL+'/verify/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email , otp }),
      });
  
      const data = await response.json();
      if(response.status === 200){
        setToken(data.token);
        const response2 = await fetch(processREMOVED_SECRETS.NEXT_PUBLIC_BACKENDURL+'/getUser', {
          method: 'GET',
          headers: {
            Authorization: `JWT ${data.token}`,
          },
        });
        const data2 = await response2.json();
        console.log(data2);
        setEmailLocal(data2.email);
        localStorage.setItem('userId', data.user._id);
        if(data.exists) {
          router.push('/');
        } else {
          router.push('/profile/create');
        }
      }
      else{
        alert(data.error);
      }
    } catch (error) {
      console.error('An error occurred', error);
     alert("An error occurred Please try again");
  }
}

  return (
    <>
    <Form className='m-5 p-5' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Otp</Form.Label>
        <Form.Control  placeholder="OTP"  value={otp} onChange={(e) => setOtp(e.target.value)} />
        <Form.Text className="text-muted">
          Enter the OTP sent to your email
        </Form.Text>
      </Form.Group>

      
      <Button variant="danger" type="submit">
        Submit
      </Button>
    </Form>
    </>
  );
}