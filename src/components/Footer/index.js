import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <>
    <div className="footer-container">
      <div className="responsive-footer">
        <div className="social-accounts">
          <button type="button" className="icon-button">
            <a href="https://www.netflix.com/in/">
              <FaGoogle size={18} color="ffffff" />
            </a>
          </button>
          <button type="button" className="icon-button">
            <a href="https://twitter.com/netflix/">
              <FaTwitter size={18} color="ffffff" />
            </a>
          </button>
          <button type="button" className="icon-button">
            <a href="https://www.instagram.com/netflix/">
              <FaInstagram size={18} color="ffffff" />
            </a>
          </button>
          <button type="button" className="icon-button">
            <a href="https://www.youtube.com/@Netflix">
              <FaYoutube size={18} color="ffffff" />
            </a>
          </button>
        </div>
        <p className="contact-us-footer">Contact us</p>
      </div>
    </div>
  </>
)
export default Footer
