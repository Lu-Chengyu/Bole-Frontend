import React, {Component} from "react";
import "./styles.css";
import bannerRight from "../../assets/bannerRight.png";
import {NavLink} from "react-router-dom";
import profilePicSrc from "../../assets/profileSample.jpg";
import banner2 from '../../assets/banner2.png';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

class LandingPage extends Component {
    render() {
        return (
            <div className="homeBody landingPage">
                <Navbar/>
                <div className="banner">
                    <div className="bannerLeft">
                        <div className="head1">Unlock You Potential</div>
                        <br/><br/><br/>
                        <div>
                            <span className="bole">Begin</span>
                            <span> your Career Story. </span>
                            {/*<br/>*/}
                            {/*<span className="bole">O</span>*/}
                            <span>Embrace the </span>
                            <span className="bole">Opportunities</span>
                            <span> for growth. </span>
                            {/*<br/>*/}
                            <span className="bole">Lead</span>
                            <span> to Success. </span>
                            {/*<br/>*/}
                            <span className="bole">Explore</span>
                            <span> new horizons.</span>
                        </div>
                        <br/><br/>
                        <NavLink to="/userSignup/register">
                            <button>Get Started.</button>
                        </NavLink>
                    </div>
                    <div className="bannerRight">
                        <img src={bannerRight} alt="bannerImage"/>
                    </div>
                </div>

                <div className="services">
                    <div className="service">
                        <i class="fas fa-bolt"></i>
                        <h6 className="serviceHead">
                            <b>Startups</b>
                        </h6>
                        <h6>
                            Job postings, applicant tracking, partner search, networking.
                        </h6>
                    </div>

                    <div className="service">
                        <i class="fas fa-scroll"></i>
                        <h6 className="serviceHead">
                            <b>Resources</b>
                        </h6>
                        <h6>
                            Talent pool, training and education, mentorship, freelance opportunities.
                        </h6>
                    </div>

                    <div className="service">
                        <i class="fas fa-headset"></i>
                        <h6 className="serviceHead">
                            <b>Students</b>
                        </h6>
                        <h6>
                            Job search, internship opportunities, resume and profile building, career advice.
                        </h6>
                    </div>
                </div>

                <h5 className="companies">Over 1000+ company posted jobs</h5>
                <div className="banner2">
                    <div className="banner2Left">
                        <h6>
                            <span>The </span>
                            Imperdiet, egestas penatibus vehicula elementum cubilia. Imperdiet
                            sociosqu tempus maecenas integer neque metus posuere sollicitudin!
                            Enim ullamcorper fermentum felis nullam.
                        </h6>
                        <br/>
                        <h6>
                            Imperdiet, egestas penatibus vehicula elementum cubilia. Imperdiet
                            sociosqu tempus maecenas integer neque metus
                        </h6>
                        <br/>
                        <h6>
                            Imperdiet, egestas penatibus vehicula elementum cubilia. Imperdiet
                            sociosqu tempus maecenas integer neque metus. Imperdiet, egestas
                            penatibus vehicula elementum cubilia. Imperdiet sociosqu tempus
                            maecenas integer neque metusImperdiet, egestas penatibus vehicula
                            elementum cubilia.
                        </h6>
                    </div>
                    <div className="banner2Right">
                        <img src={banner2} alt="bannerImage"/>
                    </div>
                </div>

                <div className="reviews">
                    <div className="reviewsHead">
                        <h5 className="companies">Customer Reviews</h5>
                    </div>
                    <div className="reviewsBody">
                        <div className="review">
                            <div className="reviewHead">
                                <div className="reviewPic">
                                    <img
                                        style={{
                                            height: "52px",
                                            borderRadius: "50%",
                                            marginRight: "12px",
                                        }}
                                        src={profilePicSrc}
                                    />
                                </div>
                                <div className="review-leftcontainer">
                                    <h6 className="name">Regina Filange</h6>
                                    <h6 className="profession">Web-Developer</h6>
                                </div>
                            </div>
                            <div className="reviewBody">
                                <p>
                                    <h6>
                                        hdfg 8rhfuf uhuizf iu uhdsuizhfiu hufhe fuh uihufhuefhu
                                        uhuishfuefh ydggfuw uihufheuwf wuhuish
                                        <br/>
                                        <br/>
                                        hdfg 8rhfuf uhuizf iu uhdsuizhfiu hufhe fuh uihufhuefhu
                                        uhuishfuefh ydggfuw uihufheuwf wuhuish
                                    </h6>
                                </p>
                            </div>
                            <div className="reviewStars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                            </div>
                        </div>

                        <div className="review">
                            <div className="reviewHead">
                                <div className="reviewPic">
                                    <img
                                        style={{
                                            height: "52px",
                                            borderRadius: "50%",
                                            marginRight: "12px",
                                        }}
                                        src={profilePicSrc}
                                    />
                                </div>
                                <div>
                                    <h6 className="name">Regina Filange</h6>
                                    <h6 className="profession">Web-Developer</h6>
                                </div>
                            </div>
                            <div className="reviewBody">
                                <p>
                                    <h6>
                                        hdfg 8rhfuf uhuizf iu uhdsuizhfiu hufhe fuh uihufhuefhu
                                        uhuishfuefh ydggfuw uihufheuwf wuhuish
                                        <br/>
                                        <br/>
                                        hdfg 8rhfuf uhuizf iu uhdsuizhfiu hufhe fuh uihufhuefhu
                                        uhuishfuefh ydggfuw uihufheuwf wuhuish
                                    </h6>
                                </p>
                            </div>
                            <div className="reviewStars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                        </div>

                        <div className="review">
                            <div className="reviewHead">
                                <div className="reviewPic">
                                    <img
                                        style={{
                                            height: "52px",
                                            borderRadius: "50%",
                                            marginRight: "12px",
                                        }}
                                        src={profilePicSrc}
                                    />
                                </div>
                                <div>
                                    <h6 className="name">Regina Filange</h6>
                                    <h6 className="profession">Web-Developer</h6>
                                </div>
                            </div>
                            <div className="reviewBody">
                                <p>
                                    <h6>
                                        hdfg 8rhfuf uhuizf iu uhdsuizhfiu hufhe fuh uihufhuefhu
                                        uhuishfuefh ydggfuw uihufheuwf wuhuish
                                        <br/>
                                        <br/>
                                        hdfg 8rhfuf uhuizf iu uhdsuizhfiu hufhe fuh uihufhuefhu
                                        uhuishfuefh ydggfuw uihufheuwf wuhuish
                                    </h6>
                                </p>
                            </div>
                            <div className="reviewStars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="addBoxPost">
                    <div className="postText">
                        <h6 className="needEmp">Great employees are the lifeblood of any successful company.</h6>
                        <h6 className="needEmpSub">Let's find the best together!</h6>
                    </div>
                    <div>
                        <NavLink to='/userSignup/register'>
                            <button className="btn btn-light">Post a Job</button>
                        </NavLink>
                    </div>
                </div>

                {/*<footer className="footer">*/}
                {/*    <div className="footer1">*/}
                {/*        <h6>About</h6>*/}
                {/*        <h6>FAQ</h6>*/}
                {/*        <h6>Policies</h6>*/}
                {/*        <h6>Help</h6>*/}
                {/*    </div>*/}
                {/*    <div className="footer2">*/}
                {/*        <i class="fab fa-linkedin-in"></i>*/}
                {/*        <i class="fab fa-twitter"></i>*/}
                {/*        <i class="fab fa-facebook-f"></i>*/}
                {/*    </div>*/}
                {/*    <div className='footer3'>*/}
                {/*        &copy;2023 by bolenetwork.com*/}
                {/*    </div>*/}
                {/*</footer>*/}
                <Footer/>
            </div>
        );
    }
}

export default LandingPage;
