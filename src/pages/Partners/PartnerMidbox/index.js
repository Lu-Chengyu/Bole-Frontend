import React, {useEffect, useState} from 'react';
import './styles.css';
import {faHeart as farHeart, faStar, faComment as farComment} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {UpOutlined, DownOutlined} from '@ant-design/icons';
import api from "../../../API/BaseURL/BaseURL"
import Modal from 'react-modal';
import { useForm } from 'antd/es/form/Form';
import { usePartnerContext } from '../PartnerContext';

const PostModal = ({ isOpen, post, handleCloseModal }) => {
  return (
    <Modal isOpen={isOpen} className="modal" overlayClassName="Overlay">
      <span className="close" onClick={handleCloseModal}>
        &times;
      </span>
      <div className="post-details-modal">
        <div className="post-header">
          <img src={'https://i.pravatar.cc/150?img=2'} className="post-avatar" alt="avatar" />
          <div className="post-info">
            <h2>{post.partner.fullName}</h2>
            <p>{post.partner.headline}</p>
          </div>
        </div>
        <div className="post-box-title">
               <p>{post.partner.postTitle}</p>
            </div>
        <div className="post-box-content">
          <p>{post.partner.postContent}</p>
          <img src={post.partner.imageUrl} alt="" />
        </div>
      </div>
    </Modal>
  );
};

function Post(props) {
    const [isExpanded, setIsExpended] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isFollowed, setIsFollowed] = useState(props.isSaved);

    const toggleModal = () => {
      setModalOpen(!isModalOpen);
    };
  
    const toggleExpansion = () => {
        setIsExpended(!isExpanded);
    }

    const toggleFollow = () => {

      const action = isFollowed ? "unfollow" : "follow";

      // const updatedFollowedPosts = [...localStorage.getItem('followedPosts') || []];

      // if (action === 'follow') {
      //   updatedFollowedPosts.push(props.postId);
      // } else {
      //   const index = updatedFollowedPosts.indexOf(props.postId);
      //   if (index > -1) {
      //     updatedFollowedPosts.splice(index, 1);
      //   }
      // }
    
      // localStorage.setItem('followedPosts', JSON.stringify(updatedFollowedPosts));
      setIsFollowed(!isFollowed);
      let saveData = {postId: props.partner.id, userId: localStorage.userId};
      api.post('/api/partner-save',saveData)
        .then(response => {
          setIsFollowed(!isFollowed);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    };
    // useEffect(() => {
    //   const followedPosts = JSON.parse(localStorage.getItem('followedPosts')) || [];
    //   console.log("followedPosts:", followedPosts);
    //   setIsFollowed(followedPosts.includes(props.postId));
    // }, []); // Run this effect only once when the component mounts
    
    // const getCardContent = () => {
    //     if (isExpanded) {
    //         return (
    //             <div>
    //                 <p>{props.content}</p>
    //             </div>
    //         );
    //     } else {
    //         return (
    //             <div className="post-content-partial">
    //                 <p>{props.postContent.substring(0, 100)}</p>
    //                 {props.postContent.length > 100 && (
    //                     <span className="read-more" onClick={toggleExpansion}></span>
    //                 )}
    //             </div>
    //         );
    //     }
    // }

    return (
        <div className="post">
            <div className="post-header">
                <img src={'https://i.pravatar.cc/150?img=2'}  className="post-avatar"/>
                <div className="post-info">
                    <h2>{props.partner.fullName}</h2>
                    <p>{props.partner.headline}</p>
                </div>
                <div className="btn-container">
                    {/* <button className="btn-follow">Follow</button> */}
                    <button
                      // className={`btn-follow ${isFollowed ? 'followed' : ''}`}
                      className={`btn-follow ${isFollowed  ? 'followed' : ''}`}
                      onClick={toggleFollow}
                    >
                      {isFollowed ? 'Following' : 'Follow'}
                    </button>
                    <button className="btn-chat">Chat</button>
                    {/*Save*/}
                    {/* <button><FontAwesomeIcon icon={faStar}/> {props.comments.length}</button> */}
                </div>
            </div>
            {/* <div className="post-content">
               <p>{props.content}</p>
               <img src={'https://i.pravatar.cc/150?img=2'} alt=""/>
            </div> */}
            {/* {getCardContent()} */}
            {/* <div className="partners-dropdown" onClick={toggleExpansion}>
                {isExpanded ? <UpOutlined /> : <DownOutlined />}
            </div> */}
            <div className="post-title" onClick={toggleModal}>
               <p>{props.partner.postTitle}</p>
            </div>
            {isModalOpen && (
        <PostModal isOpen={isModalOpen} post={props} handleCloseModal={toggleModal} />
      )}
        </div>
    );
}

// function PartnerMidbox(props) {
//     const [partners, setPartners] = useState(partners_data);

//     useEffect(() => {
//         axios.get('/api/authors') // replace with your backend API endpoint
//             .then(res => {
//                 setPartners(prevPartners => (
//                     prevPartners.map(partner => ({
//                         ...partner,
//                         author: res.data.find(author => author.name === partner.author.name)
//                     }))
//                 ));
//             })
//             .catch(err => console.error(err));
//     }, []);
//     return (
//         <div>
//             <div className="post-list">
//                 {partners.map((partner) => (
//                     <Post key={partner.id} {...partner} />
//                 ))}
//             </div>
//         </div>
//     );
// }

function PartnerMidbox() {
  const PAGE_SIZE = 12; // Number of posts per page
  const [partners, setPartners] = useState([]);
  // const [currentPage, setCurrentPage] = useState(Number(localStorage.getItem('currentPage')) || 0);
  const [totalPages, setTotalPages] = useState(0);
  const { showSavedPosts, setShowSavedPosts,currentPage, setCurrentPage  } = usePartnerContext();
  console.log('currentPage:', currentPage);
  const [savedPosts, setSavedPosts] = useState([]);

  // useEffect(() => {
  //   fetchPartners(currentPage);
  //   localStorage.setItem('currentPage', currentPage);
  // }, [currentPage]);
  // const fetchPartners = (pageNumber) => {
  //   api
  //     .get('/api/partners/posts', { params: { pageNumber, userId: localStorage.userId}})
  //     .then((res) => {
  //       setPartners(res.data);
  //       // Set the total number of pages from the response headers
  //       setTotalPages(Number(res.headers['x-total-pages']) || 9);
  //     })
  //     .catch((err) => console.error(err));
  // };

  useEffect(() => {
    // fetchPartners(currentPage);
    localStorage.setItem('currentPage', currentPage);

    const storedShowSavedPosts = localStorage.getItem('partnerPostStatus') === 'true';
    setShowSavedPosts(storedShowSavedPosts);

    // if (storedShowSavedPosts) {
    //   fetchSavedPosts(currentPage);
    // }
    if (showSavedPosts) {
      fetchSavedPosts(currentPage);
    } else {
      fetchPartners(currentPage);
    }
  }, [currentPage, showSavedPosts]);

  const fetchPartners = (pageNumber) => {
    api
      .get('/api/partners/posts', { params: { pageNumber, userId: localStorage.userId } })
      .then((res) => {
        setPartners(res.data);
        // Set the total number of pages from the response headers
        setTotalPages(Number(res.headers['x-total-pages']) || 9);
      })
      .catch((err) => console.error(err));
  };

  const fetchSavedPosts = (pageNumber) => {
    api
      .get('/api/partners/saved_posts', { params: { pageNumber, userId: localStorage.userId } })
      .then((res) => {
        setSavedPosts(res.data);
      })
      .catch((err) => console.error(err));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Generate page number buttons based on the total number of pages
  const renderPageButtons = () => {
    const pageButtons = [];
    const maxPageButtons = 3; // Maximum number of page number buttons to display

    // Calculate the start and end of the range based on the current page
    let startPage = currentPage - Math.floor(maxPageButtons / 2);
    let endPage = currentPage + Math.floor(maxPageButtons / 2);

    // Adjust the range if it exceeds the total number of pages
    if (startPage < 0) {
      startPage = 0;
      endPage = maxPageButtons - 1;
    } else if (endPage >= totalPages) {
      endPage = totalPages - 1;
      startPage = totalPages - maxPageButtons;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`btn-page ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageClick(i)}
        >
          {i + 1}
        </button>
      );
    }

    return pageButtons;
  };

  const renderPosts = () => {
    // if (showSavedPosts) {
    //   // // Filter saved posts
    //   // const savedPosts = partners.filter(partner => partner.saved);
    //   // return savedPosts.map(partner => (
    //   //   <Post key={partner.id} partner={partner} isSaved={partner.saved} />
    //   // ));
    //   return savedPosts.map(partnerData => (
    //     <Post key={partnerData.partner.id} partner={partnerData.partner} isSaved={partnerData.saved} />
    //   ));
      
    // } else {
    //   // Render all posts
    //   return partners.map(partnerData => (
    //     <Post key={partnerData.partner.id} partner={partnerData.partner} isSaved={partnerData.saved} />
    //   ));
    // }
    const postsToRender = showSavedPosts ? savedPosts : partners;

    return postsToRender.map(partnerData => (
      <Post key={partnerData.partner.id} partner={partnerData.partner} isSaved={partnerData.saved} />
    ));
  };

  const resetCurrentPage = () => {
    setCurrentPage(0);
  };

  return (
    <div>
      <div className="partner-post-list">
        {/* {partners.map((partnerData) => (
          // <Post key={partner.id} {...partner} isSaved={isSaved}/>
          <Post key={partnerData.partner.id} partner={partnerData.partner} isSaved={partnerData.saved} />
        ))} */}
        {renderPosts()}
      </div>
      <div className="pagination-buttons">
      {currentPage !== 0 && (
          <button className="btn-previous" onClick={handlePrevPage}>
            &lt;
          </button>
        )}
        {renderPageButtons()}
        <button
          className="btn-next"
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1 || totalPages === 0}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default PartnerMidbox;