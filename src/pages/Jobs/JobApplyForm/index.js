import React, {useEffect} from "react";
import "./styles.css";
import Navbar from "../../../components/Navbar";
import NavSidebox from "../../../components/Sidebox/NavSidebox";
import JobMidbox from "../JobMidbox";
import Footer from "../../../components/Footer";
import RecommendSidebox from "../../../components/Sidebox/RecommendSidebox";
import JobsTopMenu from "../JobsTopMenu";
import ApplyFormModal from "../JobApplyForm/ApplyFormModal";
import { Switch, Route} from "react-router-dom";

function Jobs(props) {
    useEffect(() => {
        if (props.location.state && props.location.state.refresh) {
            props.history.replace({
                ...props.history.location,
                state: { ...props.history.location.state, refresh: false },
            });
            window.location.reload();
        }
    }, [props.location.state, props.history]);

    return (
        <div >
            <ApplyFormModal info={props.location.state}/>
            <Navbar/>
            <JobsTopMenu/>
            <NavSidebox/>
            <RecommendSidebox/>
            <JobMidbox window={true}/>
            <Footer/>
        </div>
    );
}

export default Jobs;