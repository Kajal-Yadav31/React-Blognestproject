import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance'



const ProfilePage = () => {
    const {userId} = useParams();
    const [profileData, setProfileData] = useState(null);

    const fetchprofile = async () => {
        try{
            const response = await axiosInstance.get(`/profile/public/${userId}/`);
        setProfileData(response.data);
        }catch(error) {
            console.error('Error fetching profile', error);
        }
    };


    useEffect(() => {
        fetchprofile();
    }, [userId]);


    if (!profileData) {
        return <div>Loading profile...</div>;
    }

    return (
    <div className="container mt-5">
      <h2 className="mb-4 text-light">Posts by <span className="text-primary">{profileData.full_name}</span></h2>
      
      <div className="row">
        {/* Left Column (Posts) */}
        <div className="col-lg-8">
          {profileData.posts.map(post => (
            <div key={post.id} className="card mb-4 shadow-sm border-0">
              <div className="row g-0 align-items-center">
                <div className="col-md-8 p-3">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text text-truncate" style={{ maxHeight: '3.2em', overflow: 'hidden' }}>
                    {post.description}
                  </p>
                  <Link to={`/${post.slug}/`} className="btn btn-sm btn-info mt-2">Read More</Link>
                </div>
                <div className="col-md-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="img-fluid rounded-end"
                    style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column (User Info) */}
        <div className="col-lg-4">
          <div className="card p-3 text-center shadow-sm">
            <img
              src={profileData.image}
              alt="Profile"
              className="rounded-circle mx-auto mb-3"
              style={{ width: '120px', height: '120px', objectFit: 'cover' }}
            />
            <h4>{profileData.full_name}</h4>
            <p className="text-muted mb-1"><strong>Bio:</strong> {profileData.bio || 'N/A'}</p>
            <p className="text-muted"><strong>About:</strong> {profileData.about || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );

//     return (
//         <div className="container mt-5">
//         <div className="d-flex align-items-center mb-4">
//             <img
//             src={profileData.image}
//             alt="Profile"
//             className="rounded-circle"
//             style={{ width: '100px', height: '100px' }}
//             />
//             <div className="ms-3">
//             <h3>{profileData.user}</h3>
//             <p>{profileData.bio}</p>
            
//             </div>
//         </div>

//         <h4>Posts by {profileData.user}</h4>
//         <div className="row">
//             {profileData.posts.map(post => (
//             <div className="col-md-4 mb-4" key={post.id}>
//                 <div className="card h-100">
//                 <img src={post.image} className="card-img-top" alt={post.title} />
//                 <div className="card-body">
//                     <h5 className="card-title">{post.title}</h5>
//                     <a href={`/${post.slug}/`} className="btn btn-info">Read More</a>
//                 </div>
//                 <div className="card-footer text-muted">
//                     Views: {post.view}
//                 </div>
//                 </div>
//             </div>
//             ))}
//         </div>
//         </div>
//   );
};

export default ProfilePage;