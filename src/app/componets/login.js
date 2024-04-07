"use client"
import '@/app/style/form.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import GoogleAutheciation from './Buttons/LoginWithGoogle';
import { BASE_API } from '../lib/userdb';

export default function Login_com() {

    const router = useRouter();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState({});
    const [isFormValid, setisFormValid] = useState(false);
    const [type, setType] = useState('password');
    const [color_mail, setcolor_mail] = useState("#D2D2D2");
    const [color_password, setcolor_password] = useState("#D2D2D2");
    const [loading, setloading] = useState(false);

    const [email_disable, setemail_disable] = useState(false);
    const [password_disable, setpassword_disable] = useState(false);

    const showpassword = () => {
        if (type === 'password') {
            setType('text')
        } else {
            setType('password')
        }
    }

    useEffect(() => {
        uservalidation();
    }, [email, password]);

    const uservalidation = () => {

        let error = {};

        if (!email) {
            error.email = "";
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            error.email = "Invalid Email";
        }
        else {
            setcolor_mail('#D2D2D2');
        }

        if (!password) {
            error.password = "";
        }
        else if (password.length < 8) {
            let total_char = 8;
            let password_length = password.length;
            let error_password = total_char - password_length
            error.password = `Password Must Be ${error_password} Charater`;
        }
        else {
            setcolor_password('#D2D2D2');
        }

        setisFormValid(Object.keys(error).length === 0);
        seterror(error);
    }

    const register_btn = async () => {

        setemail_disable(true);
        setpassword_disable(true);

        if (!isFormValid) {
            setloading(true);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Feels Blacks Form!",
            });

            if(password.length == 0 && email.length == 0)
            {
                setcolor_mail('red');
                setcolor_password('red');
            }
            else if(password.length==0 && email.length <= 50)
            {
                setcolor_password('red');
            }
            else
            {
                setcolor_mail('red');
            }

            setemail_disable(false);
            setpassword_disable(false);
            setloading(false);
        }
        else {
            try {
                setloading(true);
                let user_exits = await fetch(`${BASE_API}/api/userexits`, {
                    method: "POST",
                    body: JSON.stringify({ email, password })
                })
                user_exits = await user_exits.json();
                if (user_exits.users) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Login in successfully"
                    });
                    localStorage.setItem('user', JSON.stringify(user_exits));
                    router.push("/");
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Incorrect Deatils Plz Again Try"
                    });
                    setloading(false);
                    setemail_disable(false);
                    setpassword_disable(false);
                    setemail(email.replace(email,""));
                    setpassword(password.replace(password,""));
                }
            }
            catch (error) {
                alert("UnSuccessfull Data insert");
            }

        }

    }

    return (
        <main>
            <div className="reigster-section" >
                <div className="container" >
                    <div className="row company" >
                        <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5" >
                            <div className='company-section' >
                                <div className="company-details" >
                                    <div className="company-logo" >
                                        <img src="/logo.png" />
                                    </div>
                                </div>
                                <div className="company-form-section" >
                                    <div>
                                        <div className="company-title" >
                                            <h1>Welcome Ruix</h1>
                                            <p>Welcome to Ruix. dashboard Community</p>
                                        </div>
                                        <GoogleAutheciation />
                                        <div className='or' >
                                            <p>Or</p>
                                        </div>
                                        <div className='fomr-elements' >
                                            <input
                                                style={{ border: `1px solid ${color_mail}` }}
                                                className='form-element-style'
                                                type='email'
                                                placeholder='Email'
                                                value={email}
                                                onChange={(e) => setemail(e.target.value)}
                                                disabled={email_disable}
                                            />
                                            {
                                                error.email &&
                                                <p className='error-message'>
                                                    {error.email}
                                                </p>
                                            }
                                            <input
                                                style={{ border: `1px solid ${color_password}` }}
                                                className='form-element-style'
                                                type={type}
                                                placeholder='Password'
                                                value={password}
                                                onChange={(e) => setpassword(e.target.value)}
                                                disabled={password_disable}
                                            />
                                            {
                                                error.password &&
                                                <p className='error-message'>
                                                    {error.password}
                                                </p>
                                            }
                                            <div className='form-checkbox' >
                                                <input type='checkbox' onClick={showpassword} />
                                                <span >Show Me</span>
                                            </div>
                                            <button type="submit" className='submit-btn' onClick={register_btn} >
                                                {loading ? "" : 'Login'}
                                                {loading && <div className="spinner-border text-light"></div>}
                                            </button>
                                            <div className='login-account'>
                                                <span>Create A New Account ? <Link className='login-link' href="/register"  >Register</Link></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7" >
                            <div className='ads' >
                                <img src='/j.avif' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )

}

