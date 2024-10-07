import axios from "axios";
import { useState } from "react"
import { baseURL, REGISTER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import Cookie from 'cookie-universal';
import { Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


export default function Register() {

    // States
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    // Navigate
    const navigate = useNavigate();

    // Loading
    const [loading, setLoading] = useState(false);

    // Cookies
    const cookie = Cookie();

    // Err
    const [err, setErr] = useState('');

    // Handle Form Change
    function handleChange(e) {
        setForm({ ...form, [e.target.name] : e.target.value })
      }

    // Handle Submit
      async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`${baseURL}/${REGISTER}`, form); 
            setLoading(false);

            const token = res.data.token;
            cookie.set('e-commerce', token);
            navigate("/dashboard", { replace: true });
            
        } catch(err) {
            console.log(err)
            setLoading(false);
            if (err.response.status === 422) {
                setErr('Email is already been taken');
            } else {
                    setErr('Internal Server ERR');
            }
        }
      }

    return (
        <>
        { loading && <LoadingSubmit />}
        <div className="container">
            <div className="row" style={{ height: "100vh" }}>     
                <Form className="form" onSubmit={handleSubmit}>
                    <div className="custom-form">
                        <h1 className="mb-5">Register</h1>

                        <Form.Group className="form-custom" controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" name="name" placeholder="Enter Your Name.." value={form.name} onChange={handleChange} required />
                            <Form.Label>Name</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-custom" controlId="exampleForm.ControlInput2">
                            <Form.Control type="email" name="email" placeholder="Enter Your Email.." value={form.email} onChange={handleChange} required />
                            <Form.Label>Email</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-custom" controlId="exampleForm.ControlInput3">
                            <Form.Control type="password" name="password" placeholder="Enter Your Password.." value={form.password} onChange={handleChange} minLength="6" required />
                            <Form.Label>Password</Form.Label>
                        </Form.Group>

                        <button className="btn btn-primary">Sumbit</button>
                        {/* Google button */}
                        <div className="google-btn">
                            <a href={`http://127.0.0.1:8000/login-google`} >
                                <div className="google-icon-wrapper">
                                    <img className="google-icon" src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png" alt="sign in with google" />
                                </div>
                                <p className="btn-text"><b>Register with Google</b></p>
                            </a>
                        </div>

                        { err !== '' && <span className="error">{err}</span> }
                    </div>
                </Form>
            </div>
        </div>
        </>
    )
  }