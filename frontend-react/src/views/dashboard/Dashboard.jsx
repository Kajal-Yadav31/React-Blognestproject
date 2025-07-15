import React, {useEffect, useState} from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { Link } from "react-router-dom";
import useUserData from "../../utils/useUserData";
import Toast from "../../utils/Toast";


const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);

    const userId = useUserData()?.user_id;
    console.log(userId);

    const fetchDashboardData = async () => {
        const stats_res = await axiosInstance.get(`author/dashboard/stats/${userId}/`);
        setStats(stats_res.data[0]);

        const post_res = await axiosInstance.get(`author/dashboard/post-list/${userId}/`);
        setPosts(post_res.data);

        const comment_res = await axiosInstance.get(`author/dashboard/comment-list/?user_id=${userId}`);
        setComments(comment_res.data);

        const book_res = await axiosInstance.get(`author/dashboard/bookmark-list/`);
        setBookmarks(book_res.data);
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);


    return (
        <>
            <section className="py-4">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="row g-4">
                                <div className="col-sm-6 col-lg-3">
                                    <div className="card card-body border p-3">
                                        <div className="d-flex align-items-center">
                                            <div className="icon-xl fs-1 p-3 bg-success bg-opacity-10 rounded-3 text-success">
                                                <i className="bi bi-people-fill" />
                                            </div>
                                            <div className="ms-3">
                                                <h3>{stats.views}</h3>
                                                <h6 className="mb-0">Total Views</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                    <div className="card card-body border p-3">
                                        <div className="d-flex align-items-center">
                                            <div className="icon-xl fs-1 p-3 bg-primary bg-opacity-10 rounded-3 text-primary">
                                                <i className="bi bi-file-earmark-text-fill" />
                                            </div>
                                            <div className="ms-3">
                                                <h3>{stats.posts}</h3>
                                                <h6 className="mb-0">Posts</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                    <div className="card card-body border p-3">
                                        <div className="d-flex align-items-center">
                                            <div className="icon-xl fs-1 p-3 bg-danger bg-opacity-10 rounded-3 text-danger">
                                                <i className="bi bi-suit-heart-fill" />
                                            </div>
                                            <div className="ms-3">
                                                <h3>{stats.likes}</h3>
                                                <h6 className="mb-0">Likes</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                    <div className="card card-body border p-3">
                                        <div className="d-flex align-items-center">
                                            <div className="icon-xl fs-1 p-3 bg-info bg-opacity-10 rounded-3 text-info">
                                                <i className="bi bi-tag" />
                                            </div>
                                            <div className="ms-3">
                                                <h3>{stats.bookmarks}</h3>
                                                <h6 className="mb-0">Bookmarks</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-xxl-4">
                            <div className="card border h-100">
                                <div className="card-header border-bottom d-flex justify-content-between align-items-center  p-3">
                                    <h5 className="card-header-title mb-0">All Posts ({stats.posts})</h5>
                                    <div className="dropdown text-end">
                                        <a href="#" className="btn border-0 p-0 mb-0" role="button" id="dropdownShare3" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-grid-fill text-danger fa-fw" />
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body p-3">
                                    <div className="row">
                                        {posts?.map((p, index) => (
                                            <>
                                                <div  key={p.id}  className="col-12">
                                                    <div className="d-flex position-relative">
                                                        <img className="w-60 rounded" src={p.image} style={{ width: "100px", height: "110px", objectFit: "cover", borderRadius: "10px" }} alt="product" />
                                                        <div className="ms-3">
                                                            <Link to={`/${p.slug}/`} className="h6 stretched-link text-decoration-none text-dark"> 
                                                                {p.title}
                                                                                                                       
                                                            <p className="small mb-0">
                                                                <i className="fas fa-eye me-2"></i>
                                                                {p.view} Views
                                                            </p>
                                                            <p className="small mb-0">
                                                                <i className="fas fa-thumbs-up me-2"></i>
                                                                {p.likes?.length} Likes
                                                            </p>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="my-3" />
                                            </>
                                        ))}
                                    </div>
                                </div>
                                <div className="card-footer border-top text-center p-3">
                                    <Link to="/posts/" className="fw-bold text-decoration-none text-dark">
                                        View all Posts
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xxl-4">
                            <div className="card border h-100">
                                <div className="card-header border-bottom d-flex justify-content-between align-items-center  p-3">
                                    <h5 className="card-header-title mb-0">Comments ({comments?.length})</h5>
                                    <div className="dropdown text-end">
                                        <a href="#" className="btn border-0 p-0 mb-0" role="button" id="dropdownShare3" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-chat-left-quote-fill text-success fa-fw" />
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body p-3">
                                    <div className="row">
                                        {comments?.slice(0, 3).map((c, index) => (
                                            <>
                                                <div key={c.id}  className="col-12">
                                                    <div className="d-flex align-items-center position-relative">
                                                        <div className="avatar avatar-lg flex-shrink-0">
                                                            <img className="avatar-img" src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg" style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }} alt="avatar" />
                                                        </div>
                                                        <div className="ms-3">
                                                            <p className="mb-1">
                                                                <a className="h6 stretched-link text-decoration-none text-dark" href="#">
                                                                    {c.comment}
                                                                </a>
                                                            </p>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="my-3" />
                                            </>
                                        ))}
                                    </div>
                                </div>

                                <div className="card-footer border-top text-center p-3">
                                    <Link to="/comments/" className="fw-bold text-decoration-none text-dark">
                                        View all Comments
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xxl-4">
                            <div className="card border h-100">
                                <div className="card-header border-bottom d-flex justify-content-between align-items-center  p-3">
                                    <h5 className="card-header-title mb-0">Bookmarks ({stats.bookmarks})</h5>
                                    <div className="dropdown text-end">
                                        <a href="#" className="btn border-0 p-0 mb-0" role="button" id="dropdownShare3" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-tag" />
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body p-3">
                                    <div className="custom-scrollbar h-350">
                                        <div className="row">
                                            {bookmarks?.slice(0, 3)?.map((b, index) => (
                                                <>
                                                    <div  key={b.id}  className="col-12">
                                                    <div className="d-flex position-relative">
                                                        <img className="w-60 rounded" src={b.post.image} style={{ width: "100px", height: "110px", objectFit: "cover", borderRadius: "10px" }} alt="product" />
                                                        <div className="ms-3">
                                                            <Link to={`/${b.post.slug}/`} className="h6 stretched-link text-decoration-none text-dark">                                                         
                                                                {b.post.title}
                                                           
                                                            <p className="small mb-0">
                                                                <i className="fas fa-eye me-2"></i>
                                                                {b.post.view} Views
                                                            </p>
                                                            <p className="small mb-0">
                                                                <i className="fas fa-thumbs-up me-2"></i>
                                                                {b.post.likes?.length} Likes
                                                            </p>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="my-3" />
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer border-top text-center p-3">
                                    <Link to="/bookmarks/" className="fw-bold text-decoration-none text-dark">
                                        View all Bookmarks
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 ">
                            <div className="card border bg-transparent rounded-3">
                                <div className="card-header bg-transparent border-bottom p-3">
                                    <div className="d-sm-flex justify-content-between align-items-center">
                                        <h5 className="mb-2 mb-sm-0 text-light">
                                            All Blog Posts <span className="badge bg-primary bg-opacity-10 text-primary">{posts?.length}</span>
                                        </h5>
                                        <a href="/add-post/" className="btn btn-sm btn-primary text-light mb-0">
                                            Add New <i className="fas fa-plus"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {/* Search and select END */}
                                    {/* Blog list table START */}
                                    <div className="table-responsive border-0">
                                        <table className="table align-middle p-4 mb-0 table-hover table-shrink">
                                            {/* Table head */}
                                            <thead className="table-dark">
                                                <tr>
                                                    <th scope="col" className="border-0 rounded-start">
                                                        Article Name
                                                    </th>
                                                    <th scope="col" className="border-0">
                                                        Views
                                                    </th>
                                                
                                                    <th scope="col" className="border-0">
                                                        Category
                                                    </th>
                                                    <th scope="col" className="border-0">
                                                        Status
                                                    </th>
                                                    <th scope="col" className="border-0 rounded-end">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="border-top-0 text-light">
                                                {posts?.map((p, index) => (
                                                    <tr>
                                                        <td>
                                                            <h6 key={p.id} className="mt-2 mt-md-0 mb-0 ">
                                                                <a href="#" className="text-light text-decoration-none">
                                                                    {p?.title}
                                                                </a>
                                                            </h6>
                                                        </td>
                                                        <td>
                                                            <h6 className="mb-0">
                                                                <a href="#" className="text-light text-decoration-none">
                                                                    {p.view} Views
                                                                </a>
                                                            </h6>
                                                        </td>
                                                        
                                                        <td className='text-light'>{p.category?.title}</td>
                                                        <td>
                                                            <span className="badge bg-dark bg-opacity-10 text-light mb-2">{p.status}</span>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <a href="#" className="btn-round mb-0 btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                                                                    <i className="bi bi-trash" />
                                                                </a>
                                                                <Link to={`/edit-post/${p.id}/`}  className="btn btn-primary btn-round mb-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit">
                                                                    <i className="bi bi-pencil-square" />
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    ); 
}

export default Dashboard;



