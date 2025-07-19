import {useContext, useState, useEffect} from 'react'
import Button from '../auth/Button'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../utils/AuthProvider'
import Logo from '../../assets/image/logo.png'
import axiosInstance from '../../utils/axiosInstance';


const Header = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    console.log('Logged out');
    navigate('/login')
  }

  useEffect(() => {
  const fetchProfile = async () => {
    const res = await axiosInstance.get('/profile/me/');
    setProfile(res.data);
    };
  fetchProfile();
}, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const query = e.target.search.value;
        if (query.trim() !== ""){
            navigate(`/search?q=${query}`)
        }
    }

  return (
    <>
       <header className="navbar-light bg-light navbar-sticky header-static shadow-lg bg-body rounded">
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img className="navbar-brand-item dark-mode-item" src={Logo} style={{ width: "190px" , height:"55px"}} alt="logo" />
                    </Link>
                    <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="h6 d-none d-sm-inline-block text-white">Menu</span>
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="nav mt-3 mt-lg-0 px-4 flex-nowrap align-items-center">
                            <div className="nav-item w-100">
                                <form className="rounded position-relative" onSubmit={handleSearchSubmit}>
                                    <input name="search" className="form-control pe-5 border-4 text-info "  type="search" placeholder="Search Articles" aria-label="Search" />
                                    <button className="btn bg-transparent border-0 px-2 py-0 text-info position-absolute top-50 end-0 translate-middle-y" type="submit">
                                        <i className="bi bi-search p-2 fs-5"> </i>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <ul className="navbar-nav navbar-nav-scroll ms-auto">
                            <li className="nav-item dropdown">
                                <Link className="nav-link active" to="/">
                                    Home
                                </Link>
                            </li>
                           
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle active" href="#" id="pagesMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Setting
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="pagesMenu">
                                    
                                    <li>
                                        <Link className="dropdown-item" to="/posts/">
                                            <i className="bi bi-grid-fill"></i> Posts
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/add-post/">
                                            <i className="fas fa-plus-circle"></i> Add Post
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/comments/">
                                            <i className="bi bi-chat-left-quote-fill"></i> Comments
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/bookmarks/">
                                            <i className="fas fa-tag"></i> Bookmarks  
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/profile/">
                                            <i className="fas fa-user-gear"></i> Profile
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                            {isLoggedIn ? (
                                <div className="d-flex align-items-center gap-2">
                                <Link to="/dashboard" className="btn btn-info d-flex align-items-center gap-2">
                                    Dashboard
                                    <img
                                    src={profile?.image}
                                    alt="Profile"
                                    style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                                    />
                                </Link>

                                <button onClick={handleLogout} className="btn btn-outline-danger">
                                    Logout
                                </button>
                                </div>
                            ) : (
                                <div className="d-flex align-items-center gap-2">
                                <Button text="Login" className="btn-outline-info" url="/login" />
                                <Button text="Register" className="btn-info" url="/register" />
                                </div>
                            )}
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
     
    </>
  )
}

export default Header



