import React from "react";
import './styles.css';
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import PartnerMidbox from "./PartnerMidbox";
import PartnerTopMenu from "./PartnerTopMenu";
import { PartnerProvider } from "./PartnerContext";

const Partners = () => {
    return (
        <div className="partner">
            <PartnerProvider>
            <Navbar/>
            <div className="content">
                <PartnerTopMenu/>
                <PartnerMidbox/>
            </div>
            <Footer/>
            </PartnerProvider>
        </div>
    )
}

export default Partners;
