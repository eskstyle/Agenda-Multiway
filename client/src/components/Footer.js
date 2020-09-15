import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';

export const Footer = () => {

    return (
        <div className="footer">
            <div className="footer-paragrafo">Agenda Multiway 2020 - Todos os direitos reservados.</div>
            <div className="icones-sociais">
                <a href="https://www.multiwayinfra.com.br/" target="_blank" rel="noopener noreferrer"> <FaFacebook size="30" color="#fff" /></a>
                <a href="https://www.youtube.com/user/Multiway2012/videos" target="_blank" rel="noopener noreferrer"><FaYoutube size="30" color="#fff" /></a>
                <a href="https://www.linkedin.com/company/multiway/" target="_blank" rel="noopener noreferrer"><FaLinkedin size="30" color="#fff" /></a>
                <a href="https://instagram.com/multiway_tl" target="_blank" rel="noopener noreferrer"><FaInstagram size="30" color="#fff" /></a>
            </div>
        </div >
    );
};

export default Footer;
