import React from 'react';
import './styles.css'
import Logo from '../../assets/bole-black-logo.png'
import {InstagramOutlined, LinkedinFilled} from '@ant-design/icons'

function Footer() {
    return (


        <footer>
            <div className="footer-container">
                <div className="left-column">
                    <img
                        src={Logo}
                        alt="Logo"
                    />
                    <span>BoLe Network LLC © 2023</span>
                </div>
                <div className="right-column">
                    <a href="/about">About</a>
                    <a href="#">User Agreement</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Cookie Policy</a>
                    <a href="#">Copyright Policy</a>
                    <a href="#">Brand Policy</a>
                    <a href="https://www.instagram.com/bolenetwork/"><InstagramOutlined /></a>
                    <a href="https://www.linkedin.com/company/bole-network/about/"><LinkedinFilled /></a>
                </div>
            </div>
        </footer>

    );
}

export default Footer;
