import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const query = useQuery();
  const searchTerm = query.get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      axiosInstance
        .get(`/post/search/?search=${searchTerm}`)
        .then((res) => {
          console.log("API response:", res.data);
          setResults(res.data.results || []); // support pagination style
        })
        .catch((err) => {
          console.error("Search failed", err);
          setResults([]); // fallback to empty
        });
    }
  }, [searchTerm]);


  return (
    <div className="container mt-5">
      <h3 className='text-light'>Search Results for: <span className="text-primary">"{searchTerm}"</span></h3>
      <div className="row mt-4">
        {results.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          results.map(post => (
            <div className="col-md-4 mb-4" key={post.id}>
              <div className="card h-100">
                <img src={post.image} className="card-img-top" alt={post.title} />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description?.slice(0, 100)}...</p>
                  <Link to={`/${post.slug}/`} className="btn btn-info">Read More</Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
