import { useState, useEffect } from "react";
import axiosInstance from '../../utils/axiosInstance'
import { Link } from "react-router-dom";
import Toast from "../../utils/Toast";
import useUserData from "../../utils/useUserData";

const Main = () => {
    const [posts, setPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [category, setCategory] = useState([]);

    const fetchPosts = async () => {
        const response = await axiosInstance.get(`post/lists/`);
        setPosts(response.data);
    };

    const fetchPopularPost = () => {
        const sortedPopularPost = posts?.sort((a, b) => b.view - a.view);
        setPopularPosts(sortedPopularPost);
    };

    const fetchCategory = async () => {
        const response = await axiosInstance.get(`post/category/list/`);
        setCategory(response.data);
    };

    useEffect(() => {
        fetchPosts();
        fetchCategory();
    }, []);

    useEffect(() => {
        fetchPopularPost();
    }, [posts]);

    // Pagination
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const postItems = posts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handleLikePost = async (postId) => {
        const jsonData = {
            user_id: useUserData()?.user_id,
            post_id: postId,
        };
        const response = await axiosInstance.post(`post/like-post/`, jsonData);
        console.log(response.data);
        fetchPosts();

        Toast("success", response.data.message, "");
    };

    const handleBookmarkPost = async (postId) => {
        const jsonData = {
            user_id: useUserData()?.user_id,
            post_id: postId,
        };
        const response = await axiosInstance.post(`post/bookmark-post/`, jsonData);
        console.log(response.data);
        fetchPosts();

        Toast("success", response.data.message, "");
    };

  return (
    <>
          <div>
           
            <section className="p-0 mt-4">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2 className="text-start text-light d-block mt-1">Trending Articles 🔥</h2>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-4 pb-0">
                <div className="container">
                    <div className="row">
                        {postItems?.map((p, index) => (
                            <div className="col-sm-6 col-lg-3" key={index}>
                                <div className="card mb-4">
                                    <div className="card-fold position-relative">
                                        <img className="card-img" style={{ width: "100%", height: "160px", objectFit: "cover" }} src={p.image} alt={p.title} />

                                        <h4 className="card-title m-2">
                                            <Link to={`/${p.slug}`} className="btn-link text-reset stretched-link fw-bold text-decoration-none">
                                                {p.title?.slice(0, 32) + "..."}
                                            </Link>
                                        </h4>
                                    </div>
                                    <div className="card-body px-3 pt-3">
                                        <Link onClick={handleBookmarkPost} className="text-danger me-2">
                                            <i className="fas fa-bookmark"></i>
                                        </Link>
                                          &nbsp;
                                        <Link onClick={handleLikePost} className="text-primary text-decoration-none me-2">
                                            <i className="fas fa-thumbs-up">  </i>
                                                <span className="text-dark fs-bold " >{p?.likes?.length}</span>
                                        </Link>
                                          
                                        
                                        <ul className="mt-3 list-style-none" style={{ listStyle: "none" }}>
                                            <li>
                                                <Link to={`/profile/${p.profile.id}`} className="text-dark text-decoration-none" >
                                              
                                                    <img className="avatar-img m-1" style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "50%" }} src={p?.profile?.image}alt="avatar" />
                                                    <span className="fw-bold">{p.profile?.full_name}</span>
                                                </Link>
                                            </li>
                                            
                                            <li className="mt-2">
                                                <i className="fas fa-eye"></i> {p.view} Views
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <nav className="d-flex mt-5">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button className="page-link me-1" onClick={() => setCurrentPage(currentPage - 1)}>
                                    <i className="ci-arrow-left me-2" />
                                    Previous
                                </button>
                            </li>
                        </ul>
                        <ul className="pagination">
                            {pageNumbers.map((number) => (
                                <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(number)}>
                                        {number}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <ul className="pagination">
                            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                <button className="page-link ms-1" onClick={() => setCurrentPage(currentPage + 1)}>
                                    Next
                                    <i className="ci-arrow-right ms-3" />
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>

            <section className="bg-dark pt-5 pb-5 mb-3 mt-3">
                <div className="container">
                    <div className="row g-0">
                        <div className="col-12 ">
                            <div className="mb-4">
                                <h2 className="text-light">Categories</h2>
                            </div>
                            <div className="d-flex flex-wrap justify-content-between">
                                {category?.map((c, index) => (
                                    <div className="mt-2" key={index}>
                                        <Link to={`/category/${c.slug}/`}>
                                            <div className="card bg-transparent">
                                                <img className="card-img" src={c.image} style={{ width: "150px", height: "80px", objectFit: "cover" }} alt="card image" />
                                                <div className="d-flex flex-column align-items-center mt-3 pb-2">
                                                    <h5 className="mb-0 text-light">{c.title}</h5>
                                                    <small className="text-light">{c.post_count} Articles</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="p-0">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <a href="#" className="d-block card-img-flash">
                                <img src="assets/images/adv-3.png" alt="" />
                            </a>
                            <h2 className="text-start text-light d-block mt-1">Popular Articles 🕒</h2>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-4 pb-0">
                <div className="container">
                    <div className="row">
                        {popularPosts?.map((p, index) => (
                            <div className="col-sm-6 col-lg-3" key={index}>
                                <div className="card mb-4">
                                    <div className="card-fold position-relative">
                                        <img className="card-img" style={{ width: "100%", height: "160px", objectFit: "cover" }} src={p.image} alt={p.title} />
                                    
                                        <h4 className="card-title m-2">
                                            <Link to={`${p.slug}`} className="btn-link text-reset stretched-link fw-bold text-decoration-none">
                                                {p.title?.slice(0, 32) + "..."}
                                            </Link>
                                        </h4>
                                    </div>
                                    <div className="card-body px-3 pt-3">
                                        <ul className="mt-3 list-style-none" style={{ listStyle: "none" }}>
                                            <li>
                                                <Link to={`/profile/${p.profile.id}`} className="text-dark text-decoration-none" >
                                              
                                                    <img className="avatar-img m-1" style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "50%" }} src={p?.profile?.image}alt="avatar" />
                                                    <span className="fw-bold">{p.profile?.full_name}</span>
                                                </Link>
                                            </li>
                                            
                                            <li className="mt-2">
                                                <i className="fas fa-eye"></i> {p.view} Views
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </section>

           
        </div>
    </>
  )
}

export default Main;



