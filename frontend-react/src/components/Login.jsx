import React, {useContext, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

  const handleLogin = async (e) =>{
    e.preventDefault();
    setLoading(true);

    const userData = {email, password}
    console.log('userData==>', userData);

    try{
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData)
      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      console.log('Login successful');
      setIsLoggedIn(true)
      navigate('/dashboard')
    }catch(error){
      console.error('Invalid credentials')
      setError('Invalid credentials')
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
                                        <h1 className="mb-1 fw-bold">Login to our Portal</h1>                                    
                                    </div>
                                    {/* Form */}
                                    <form className="needs-validation" onSubmit={handleLogin}>
                                        {/* email */}
                                        <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email Address
                                        </label>
                                        <input type="email" className='form-control' placeholder='Email address' value={email} onChange={(e)=> setEmail(e.target.value)}/></div>
                                                                
                                        {/* Password */}
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">
                                                Password
                                            </label>
                                            <input type="password" className='form-control ' placeholder='Set password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                       
                                        </div>
                                        
                                        {error && <div className='text-danger'>{error}</div> }

                                        {loading ? (
                                          <button type='submit' className='btn btn-info d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin /> Logging in...</button>
                                        ) : (
                                          <button type='submit' className='btn btn-info d-block mx-auto'>Login</button>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
    </>
  )
}

export default Login


