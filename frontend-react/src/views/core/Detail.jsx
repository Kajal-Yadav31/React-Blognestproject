import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import axiosInstance from '../../utils/axiosInstance'
import Toast from "../../utils/Toast";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Button from "../auth/Button";



function Detail() {
    const [post, setPost] = useState([]);
    const [tags, setTags] = useState([]);
    const [createComment, setCreateComment] = useState({ full_name: "", email: "", comment: "" });

    const param = useParams();

    const fetchPost = async () => {
        const response = await axiosInstance.get(`post/detail/${param.slug}`);
        setPost(response.data);

        const tagArray = response.data?.tags?.split(",");
        setTags(tagArray);
    };

    useEffect(() => {
        fetchPost();
    }, []);

    const handleCreateCommentChange = (event) => {
        setCreateComment({
            ...createComment,
            [event.target.name]: event.target.value,
        });
    };

    const handleCreateCommentSubmit = async (e) => {
        e.preventDefault();

        console.log(post.id);
        console.log(createComment.full_name);
        console.log(createComment.email);
        console.log(createComment.comment);

        const jsonData = {
            post_id: post?.id,
            name: createComment.full_name,
            email: createComment.email,
            comment: createComment.comment,
        };

        

        const response = await axiosInstance.post(`post/comment-post/`, jsonData);
        console.log(response);
        fetchPost();
        Toast("success", "Comment Posted.", "");
        setCreateComment({
            full_name: "",
            email: "",
            comment: "",
        });
    };

    const handleLikePost = async() => {
        const json = {
            user_id: 1,
            post_id: post?.id,
        };

        const response = await axiosInstance.post(`post/like-post/`, json);
        console.log(response.data);
        Toast("success", response.data.message);
        fetchPost();
    };

    const handleBookmarkPost = async() => {
        const json = {
            user_id: 1,
            post_id: post?.id,
        };

        const response = await axiosInstance.post(`post/bookmark-post/`, json);
        console.log(response.data);
        Toast("success", response.data.message);
        fetchPost();
    }


    return (
        <>
            <section className=" mt-5 text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <a href="#" className="badge bg-danger mb-2 text-decoration-none">
                                <i className="small fw-bold " />
                                {post.category?.title}
                            </a>
                            <h1 className="text-center">{post.title}</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-0 ">
                <div className="container position-relative" data-sticky-container="">
                    <div className="row">
                        <div className="col-lg-2 text-light">
                            <div className="text-start text-lg-center mb-5" data-sticky="" data-margin-top={80} data-sticky-for={991}>
                                <div className="position-relative">
                                    <div className="avatar avatar-xl">
                                        <Link to={`/profile/${post?.profile?.id}`} className="text-dark text-decoration-none" >
                                        <img className="avatar-img" style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }} src={post?.profile?.image}alt="avatar" />
                                    
                                    <span className="h5 fw-bold text-light text-decoration-none mt-2 mb-0 d-block">
                                        {post.profile?.full_name}
                                    </span>
                                    </Link>
                                    </div>
                                    <p>{post.profile?.bio}</p>
                                </div>

                                <hr className="d-none d-lg-block " />

                                <ul className="list-inline list-unstyled">
                                    
                                 
                                    <li className="list-inline-item d-lg-block my-lg-2 text-start">
                                        <a href="#" className="text-body">
                                            <i className="fas fa-heart" />
                                        </a>
                                        {post.likes?.length} Likes
                                    </li>
                                    <li className="list-inline-item d-lg-block my-lg-2 text-start">
                                        <i className="fas fa-eye me-1" />
                                        {post.view} Views
                                    </li>
                                </ul>
                                {/* Tags */}
                                <ul className="list-inline text-primary-hover mt-0 mt-lg-3 text-start text-light">
                                    {tags?.map((tag, index) => (
                                        <li key={index} className="list-inline-item text-light">
                                            <a className="text-body text-decoration-none fw-bold text-light" href="#">
                                                <h6 className="text-light">#{tag}</h6>
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <Link onClick={handleLikePost} className="btn btn-primary me-3">
                                    <i className="fas fa-thumbs-up me-2"></i>
                                    {post?.likes?.length}
                                </Link>
                                
                                        &nbsp;

                                <Link onClick={handleBookmarkPost} className="btn btn-danger">
                                    <i className="fas fa-bookmark"></i>
                                </Link>
                            </div>
                           
                        </div>
                        {/* Left sidebar END */}
                        {/* Main Content START */}
                        <div className="col-lg-10 mb-5">
                             <img style={{ width: "1000px", height: "500px", objectFit: "cover" }} src={post?.image} className="mt-5" alt="postimage" />
                            <p className="text-light" dangerouslySetInnerHTML={{ __html: post.description }}></p>

                           

                            <hr />
                            <div className="d-flex py-4 text-light">
                                <Link to={`/profile/${post?.profile?.id}`}>
                                    <div className="avatar avatar-xxl me-4">
                                        <img className="avatar-img rounded-circle" src={post?.profile?.image} style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }} alt="avatar" />
                                    </div>
                                </Link>
                                <div >
                                    <div className="d-sm-flex align-items-center justify-content-between">
                                        <div>
                                            <h4 className="m-0">
                                                <span className=" text-decoration-none">
                                                    {post.profile?.full_name}
                                                </span>
                                            </h4>
                                            <small>{post.profile?.bio}</small>
                                        </div>
                                    </div>
                                    <p className="my-2">{post.profile?.about}</p>
                                    {/* Social icons */}
                                    <ul className="nav ">
                                        {post.profile?.facebook !== null && (
                                            <li className="nav-item">
                                                <a className="nav-link ps-0 pe-2 fs-5" target="_blank" href={post.facebook}>
                                                    <i className="fab fa-facebook-square" />
                                                </a>
                                            </li>
                                        )}
                                        {post.profile?.twitter !== null && (
                                            <a className="nav-link px-2 fs-5" target="_blank" href={post.twitter}>
                                                <li className="nav-item">
                                                    <i className="fab fa-twitter-square" />
                                                </li>
                                            </a>
                                        )}
                                    </ul>
                                </div>
                            </div>

                            <div className="text-dark">
                                <h3 className="text-light">{post.comments?.length} comments</h3>
                                {post.comments?.map((c, index) => (
                                    <div key={index} className="my-4 d-flex bg-light  p-3 mb-3 rounded">
                                        <img
                                            className="avatar avatar-md rounded-circle float-start me-3"
                                            src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                                            style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "50%" }}
                                            alt="avatar"
                                        />
                                        <div>
                                            <div className="mb-2">
                                                <h5 className="m-0">{c.name}</h5>
                                                
                                            </div>
                                            <p className="fw-bold">{c.comment}</p>
                                            {c.reply !== null && <p className="">Reply: {c.reply}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Comments END */}
                            {/* Reply START */}
                            <div className="bg-light p-3 rounded">
                                <h3 className="fw-bold">Leave a reply</h3>
                                <small>Your email address will not be published. Required fields are marked *</small>
                                <form className="row g-3 mt-2" onSubmit={handleCreateCommentSubmit}>
                                    <div className="col-md-6 ">
                                        <label className="form-label">Name *</label>
                                        <input onChange={handleCreateCommentChange} name="full_name" value={createComment.full_name} type="text" className="form-control" aria-label="First name" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Email *</label>
                                        <input onChange={handleCreateCommentChange} name="email" value={createComment.email} type="email" className="form-control" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Write Comment *</label>
                                        <textarea onChange={handleCreateCommentChange} name="comment" value={createComment.comment} className="form-control" rows={4} />
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary">
                                            Post comment <i className="fas fa-paper-plane"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
           
        </>
    );
}

export default Detail;
