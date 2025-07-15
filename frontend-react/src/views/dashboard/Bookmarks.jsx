import React, { useState, useEffect } from "react";
import axiosInstance from '../../utils/axiosInstance'
import useUserData from "../../utils/useUserData";
import { Link } from "react-router-dom";
import Toast from "../../utils/Toast";

function Bookmarks() {
    const [bookmarks, setBookmarks] = useState([]);
    const userId = useUserData()?.user_id;

    const fetchBoookmarks = async () => {
        try{
           const response = await axiosInstance.get(`author/dashboard/bookmark-list/`);
           setBookmarks(response.data); 
        }catch (error){
            console.error('Failed to fetch bookmarks:', error);
        }

    };



    useEffect(() => {
        fetchBoookmarks();
    }, []);

    // Pagination
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const bookmarksItems = bookmarks.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(bookmarks.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);


    return (
         <div>
            <section className="p-0">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <a href="#" className="d-block card-img-flash">
                                <img src="assets/images/adv-3.png" alt="" />
                            </a>
                            <h2 className="text-start d-block mt-1 text-light">
                                Bookmarks 
                            </h2>
                            <span className="text-light m-3">Manage all your Bookmarks from here</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-4 pb-0 mt-4">
                <div className="container">
                    <div className="row">
                        {bookmarksItems?.map((b, index) => (
                            <div className="col-sm-6 col-lg-3" key={b.id}>
                                <div className="card mb-4">
                                    <div className="card-fold position-relative">
                                        <img className="card-img" style={{ width: "100%", height: "160px", objectFit: "cover" }} src={b?.post?.image} alt={b?.post?.title} />
                                    </div>
                                    <div className="card-body px-3 pt-3">
                                        <h4 className="card-title">
                                            <Link to={`/${b.post.slug}/`} className="btn-link text-reset stretched-link fw-bold text-decoration-none">
                                                {b?.post?.title?.slice(0, 32) + "..."}
                                            </Link>
                                        </h4>
                                        <ul className="mt-3 list-style-none" style={{ listStyle: "none" }}>
                                            <li>
                                                <a href="#" className="text-dark text-decoration-none">
                                                     <img className="avatar-img m-1" style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "50%" }} src={b.post?.profile?.image}alt="avatar" />
                                                    <span className="fw-bold">{b?.post?.profile?.full_name}</span>
                                                </a>
                                            </li>
                                        
                                            <li className="mt-2">
                                                <i className="fas fa-eye"></i> {b?.post?.view} Views
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
        </div>






        // <>
           
        //     <section className="pt-5 pb-5">
        //         <div className="container">
        //             <div className="row mt-0 mt-md-4">
        //                 <div className="col-lg-12 col-md-8 col-12">
        //                     <div className="card mb-4">
        //                         <div className="card-header d-lg-flex align-items-center justify-content-between">
        //                             <div className="mb-3 mb-lg-0">
        //                                 <h3 className="mb-0">Bookmarks</h3>
        //                                 <span>Manage all your Bookmarks from here</span>
        //                             </div>
        //                         </div>
        //                         {bookmarks.length === 0 ? (
        //                         <p>No bookmarks found.</p>
        //                         ) : (
        //                         <div className="card-body flex">
        //                             <ul className="list-group list-group-flush">

        //                                 {bookmarks?.map((b, index) => (
        //                                     <div className="col-sm-6 col-lg-3" key={b.id}>
        //                                         <div className="card mb-4">
        //                                             <div className="card-fold position-relative">
        //                                                 <img className="card-img" style={{ width: "100%", height: "160px", objectFit: "cover" }} src={b.post.image} alt={b.post.title} />
        //                                             </div>
        //                                             <div className="card-body px- pt-3">
        //                                                 <h5 className="card-title">{b.post.title}</h5>
        //                                                 <ul className="mt-3 list-style-none" style={{ listStyle: "none" }}>
        //                                                     <li>
        //                                                         <a href="#" className="text-dark text-decoration-none">
        //                                                             <img className="avatar-img m-1" style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "50%" }} src={b?.post?.profile?.image}alt="avatar" />
        //                                                             <span className="fw-bold">{b?.post?.profile?.full_name}</span>
        //                                                         </a>
        //                                                     </li>
                                                           
        //                                                 </ul>
        //                                                 <div className="d-flex justify-content-between align-items-center mt-2">
        //                                                     <Link to={`/${b.post.slug}/`} className="btn btn-info">
        //                                                         View Post
        //                                                     </Link>
        //                                                     <li className="mt-2 list-unstyled mb-0">
        //                                                         <i className="fas fa-eye"></i> {b.post.view} Views
        //                                                     </li>
        //                                                 </div>
        //                                             </div>
                                                     
        //                                         </div>
        //                                     </div>
        //                 ))}
        //                             </ul>
        //                         </div>
        //                         )}
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>               
        //     </section>
           
        // </>
    );
}

export default Bookmarks;

                                        