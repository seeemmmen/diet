import logo_header from "../img/mainpage/logo-header.svg";
import instagram from "../img/mainpage/instagram.svg";
import youtube from "../img/mainpage/youtube.svg";
import tiktok from "../img/mainpage/tiktok.svg";
import email from "../img/mainpage/email.svg";
import phone from "../img/mainpage/phone.svg";
import location from "../img/mainpage/location.svg";
import goTop from "../img/mainpage/go-top.svg";

function Footer() {
    return(
        <>
            <footer id="footer">
                <div className="footer">
                    <img src={logo_header} alt=""  style={{marginTop: "64px"}}/>
                    <p className="description" style={{marginTop: "16px"}}>Personalized nutrition plans</p>
                    <div className="social">
                        <div className="social-img">
                            <img src={instagram} alt=""/>
                        </div>
                        <div className="social-img">
                            <img src={youtube} alt=""/>
                        </div>
                        <div className="social-img">
                            <img src={tiktok} alt=""/>
                        </div>
                    </div>
                    <div className="info-footer">
                        <div className="info-footer-items">
                            <div className="items">
                                <img src={email} alt=""/>
                                <p>seed@gmail.com</p>
                            </div>
                            <div className="items">
                                <img src={phone} alt=""/>
                                <p>+48 790 817 968</p>
                            </div>
                            <div className="items">
                                <img src={location} alt=""/>
                                <p>Poland</p>
                            </div>
                        </div>
                    </div>
                    <div className="go-top">
                        <p>Got To Top</p>
                        <img
                            src={goTop}
                            alt=""
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        />
                    </div>
                    <div className="bottom-footer">
                        <p>© 2025 Seed. All rights reserved.</p>
                    </div>
                </div>



            </footer>
        </>
    );
}
export default Footer;