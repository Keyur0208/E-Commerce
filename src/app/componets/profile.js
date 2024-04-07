"use client"
import { BASE_API } from "@/app/lib/userdb";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

const User = (props) => {

  const router = useRouter();

  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [type, setType] = useState('password');
  const [gender, setgender] = useState("");
  const [error, seterror] = useState({});
  const [loading, setloading] = useState(false);
  const [isFormValid, setisFormValid] = useState(false);

  const showpassword = () => {

    if (type == "password") {
      setType("text")
    }
    else {
      setType("password")
    }
  }

  useEffect(() => {
    getuserdetails();
  }, [])


  const getuserdetails = async () => {
    let user_id = props.id;
    console.log(user_id);
    let user_data = await fetch(`${BASE_API}/api/userexits/${user_id}`);
    user_data = await user_data.json();

    if (user_data.sucess) {
      setname(user_data.users.name);
      setemail(user_data.users.email);
      setpassword(user_data.users.password);
      setphone(user_data.users.phone);
      setgender(user_data.users.gender);
    }
    else {
      console.log("Not Data Update");
    }
  }

  useEffect(() => {
    uservalidation();
  }, [name, phone, password, gender])

  const uservalidation = () => {

    let error = {};

    if (!name) {
      error.name = "";
    }

    if (!phone) {
      error.phone = "Phone No Required";
    }
    else if (isNaN(phone)) {
      error.phone = "Numerical Requried";
    }
    else if (phone.length < 10) {
      error.phone = "Must Be 10 Digit";
    }


    if (!password) {
      error.password = "Password  Required";
    }

    seterror(error);
    setisFormValid(Object.keys(error).length === 0);
  }

  const update = async () => {

    setloading(true);

    if (!isFormValid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Plz Feels Blacks",
      });
      setloading(false);
    }
    else {

      try {
        let user_id = props.id;
        let update_data = await fetch(`${BASE_API}/api/userexits/${user_id}`, {
          method: "PUT",
          body: JSON.stringify({ name, email, phone, password, gender })
        });
        update_data = await update_data.json();
        console.log(update_data);

        if (update_data.users) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Some Problem",
          });
          setloading(false);
          return;
        }
        else {
          setloading(true);
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
            title: "Update in successfully"
          });
          return;
        }
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <main>
      <div className='container' >
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mt-3">
            <li className="breadcrumb-item"><a href='/' >Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Profile</li>
          </ol>
        </nav>
        <div className="border p-3 mb-3" >
          <h1>My Account</h1>
          <div className='row mt-3 mb-3 gy-3' >
            <div className='col-12 col-sm-12 col-lg-6 col-xl-6' >
              <input type='text' className='form-control' placeholder='Name' value={name} onChange={(e) => setname(e.target.value)} />
            </div>
            <div className='col-12 col-sm-12 col-lg-6 col-xl-6' >
              <select className='form-control' value={gender} onChange={(e) => setgender(e.target.value)}  >
                <option>Gender</option>
                <option >Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className='col-12 col-sm-12 col-lg-12 col-xl-12 mt-3'>
              <input type='text' className='form-control' placeholder='Phone Number' maxLength={10} value={phone} onChange={(e) => setphone(e.target.value)} />
            </div>
            {
              error.phone &&
              <span style={{ color: 'red', marginTop: '0rem' }}>{error.phone}</span>
            }
            <div className='col-12 col-sm-12 col-lg-12 col-xl-12 mt-3'>
              <input type={type} className='form-control' placeholder='Password' value={password} onChange={(e) => setpassword(e.target.value)} />
              <div className='mt-1'>
                <input type='checkbox' onClick={showpassword} />
                <span className='px-2' >Show Password</span>
              </div>
            </div>
            <div className='col-12 col-sm-12 col-lg-12 col-xl-12 mt-3'>
              <input type='mail' className='form-control' placeholder='Email' disabled value={email} onChange={(e) => setemail(e.target.value)} />
            </div>
            <div className='col-12 col-sm-12 col-lg-12 col-xl-12 mt-3'>
              <button type='submit' className='form-control btn btn-primary' onClick={update} >
                {loading ? "" : 'Update'}
                {loading && <div className="spinner-border text-light"></div>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main >

  )
}

export default User

