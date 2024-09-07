import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { Button, Form } from "react-bootstrap";
import { emailAtom } from "./emailAtom";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useAtom(emailAtom);

    async function handleSubmit(e) {
        e.preventDefault();
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)) {
            alert("Please enter a valid email address");
        }
        else {
            try {
                const response = await fetch(processREMOVED_SECRETS.NEXT_PUBLIC_BACKENDURL+'/generate/otp', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
                router.push('/user/otp');
            } catch (error) {
            console.error('An error occurred', error);
            }
        }
    }

    return (
        <Form className='m-5 p-5' onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"  value={email} onChange={(e) => setEmail(e.target.value)} />
            <Form.Text className="text-muted">
              Enter you email address
            </Form.Text>
          </Form.Group>
                
          <Button variant="danger" type="submit">
            Submit
          </Button>
        </Form>
    )
  }

export default Login;