"use client"
import '@/app/style/form.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Login_com() {

    const router = useRouter();
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState({});
    const [isFormValid, setisFormValid] = useState(false);
    const [type, setType] = useState('password');
    const [color_name, setcolor_name] = useState("#D2D2D2");
    const [color_mail, setcolor_mail] = useState("#D2D2D2");
    const [color_password, setcolor_password] = useState("#D2D2D2");
    const [loading, setloading] = useState(false)

    const showpassword = () => {
        if (type === 'password') {
            setType('text')
        } else {
            setType('password')
        }
    }

    useEffect(() => {
        uservalidation();
    }, [name, email, password]);

    const uservalidation = () => {

        let error = {};

        if (!name) {
            error.name = "";
        }
        else {
            setcolor_name('#D2D2D2');
        }

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
            let error_password =  total_char - password_length
            error.password = `Password Must Be ${error_password} Charater`;
        }
        else {
            setcolor_password('#D2D2D2');
        }

        setisFormValid(Object.keys(error).length === 0);
        seterror(error);
    }

    const register_btn = async () => {
        if (!isFormValid) {
            setloading(true);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Feels Blacks Form!",
            });
            setcolor_name('red');
            setcolor_mail('red');
            setcolor_password('red');
            setloading(false);
        }
        else {
            try {
                const user_exits = await fetch("http://localhost:3000/api/emailexits", {
                    method: "POST",
                    body: JSON.stringify({ email })
                })
                const { user_email } = await user_exits.json();

                if (user_email) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Email Already Exits",
                    });
                    setcolor_mail('red');
                    setloading(false);
                    return;
                }

                let insert_data = await fetch("http://localhost:3000/api/userdata", {
                    method: "POST",
                    body: JSON.stringify({ name, email, password })
                })
                insert_data = await insert_data.json();
                console.log(insert_data);

                localStorage.setItem("user", JSON.stringify(insert_data));

                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                        router.push('/');
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Register in successfully"
                });
            }

            catch (error) {
                alert("UnSuccessfull Data insert");
            }

            console.log(name, email, password);
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
                                        <div className='google-login' >
                                            <img src='google.png' />
                                            <span>Continue With Google</span>
                                        </div>
                                        <div className='or' >
                                            <p>Or</p>
                                        </div>
                                        <div className='fomr-elements' >
                                            <input
                                                style={{ border: `1px solid ${color_name}` }}
                                                className='form-element-style'
                                                type='name'
                                                placeholder='Name'
                                                autoFocus={true}
                                                value={name}
                                                onChange={(e) => setname(e.target.value)}
                                            />
                                            {
                                                error.name &&
                                                <p className='error-message' >
                                                    {error.name}
                                                </p>
                                            }
                                            <input
                                                style={{ border: `1px solid ${color_mail}` }}
                                                className='form-element-style'
                                                type='email'
                                                placeholder='Email'
                                                value={email}
                                                onChange={(e) => setemail(e.target.value)}
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
                                                {loading ? "" : 'Register'}
                                                {loading && <div className="spinner-border text-light"></div>}
                                            </button>
                                            <div className='login-account'>
                                                <span>Already have an account? <Link className='login-link' href="/login"  >Log in</Link></span>
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