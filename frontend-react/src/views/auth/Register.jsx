import React, {useState} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
import Button from './Button'


const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
      e.preventDefault(); 
      setLoading(true)
    
      const userData = {
        username, email, password, password2
      }

      try{
        const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData)
        console.log('response.data==>', response.data)
        console.log('Registeration successful')
        setErrors({})
        setSuccess(true)
        navigate('/login')
      }catch(error){
        setErrors(error.response.data)
        console.error('Registeration error: ', error.response.data)
      }finally{
        setLoading(false)
      }
  }
  return (
    <>
     <section className="container d-flex flex-column vh-100" style={{ marginTop: "150px" }}>
                <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
                    <div className="col-lg-5 col-md-8 py-8 py-xl-0">
                        <div className="card shadow">
                            <div className="card-body p-6">
                                <div className="mb-4">
                                    <h1 className="mb-1 fw-bold">Sign up</h1>
                                    <span>
                                        Already have an account?
                                        <Link to="/login" className="ms-1">
                                            Sign In
                                        </Link>
                                    </span>
                                </div>
                                {/* Form */}
                                <form className="needs-validation" onSubmit={handleRegistration}>
                                    {/* Username */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Full Name
                                        </label>
                                        <input type="text" className='form-control' placeholder='Username' value={username} onChange={(e)=> setUsername(e.target.value)}/>
                                        <small>{errors.username && <div className='text-danger'>{errors.username}</div>}</small>
                                    </div>
                                    {/* Email */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email Address
                                        </label>
                                        <input type="email" className='form-control' placeholder='Email address' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                                    </div>

                                    {/* Password */}
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Password
                                        </label>
                                        <input type="password" className='form-control ' placeholder='Set password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                                        <small>{errors.password && <div className='text-danger'>{errors.password}</div>}</small>
                                    </div>
                                    {/* Password */}
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Confirm Password
                                        </label>
                                        <input type="password" className='form-control ' placeholder='confirm password' value={password2} onChange={(e)=> setPassword2(e.target.value)}/>
                                        <small>{errors.password2 && <div className='text-danger'>{errors.password2}</div>}</small>
                                    </div>
                                    <div>
                                        <div className="d-grid">
                                           {success && <div className='alert alert-success'>Registration Successful</div>}
                                            {loading ? (
                                            <button type='submit' className='btn btn-info d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin ></FontAwesomeIcon> Please wait...</button>                 
                                            ) : (
                                            <button type='submit' className='btn btn-info d-block mx-auto'>Register</button>  
                                          )}       
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}

export default Register
