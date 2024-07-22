import React from "react";
import "./styles.css";
import Navbar from "../../components/Navbar";
import NavSidebox from "../../components/Sidebox/NavSidebox";
import JobMidbox from "./JobMidbox";
import Footer from "../../components/Footer";
import RecommendSidebox from "../../components/Sidebox/RecommendSidebox";
import JobsTopMenu from "./JobsTopMenu";

function Jobs() {

    return (
        <div className="jobs">
            <Navbar/>
            <JobsTopMenu/>
            <NavSidebox/>
            <RecommendSidebox/>
            <JobMidbox window={false}/>
            <Footer/>
        </div>
    );
}

export default Jobs;