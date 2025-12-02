import React from "react";

function Footer() {
  return (
    <footer>
      <style>{`
        .custom-footer {
          background: #fafafa;
          padding: 60px 0;
          margin-top: 40px;
        }

        .footer-title {
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 14px;
        }

        .footer-text {
          color: #555;
          font-size: 14px;
          margin-bottom: 6px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          color: #555;
          font-size: 14px;
          margin-bottom: 8px;
          cursor: pointer;
        }

        .footer-links li:hover {
          color: #000;
        }

        .footer-social i {
          font-size: 20px;
          margin-right: 15px;
          cursor: pointer;
          color: #666;
        }

        .footer-social i:hover {
          color: #000;
        }

        .footer-bottom {
          padding-top: 25px;
          text-align: center;
          color: #777;
          border-top: 1px solid #e5e5e5;
          margin-top: 40px;
          font-size: 14px;
        }
      `}</style>

      <div className="custom-footer">
        <div className="container">
          <div className="row gy-4">

            {/* Column 1 */}
            <div className="col-md-3">
              <h6 className="footer-title">AR-SHAKIR</h6>
              <p className="footer-text">arshakir123@gmail.com</p>
              <p className="footer-text">+458 483 5846</p>

              <div className="footer-social mt-3">
                <i>📸</i>
                <i>🔗</i>
                <i>📘</i>
                <i>🐦</i>
              </div>
            </div>

            {/* Column 2 */}
            <div className="col-md-2">
              <h6 className="footer-title">Blog</h6>
              <ul className="footer-links">
                <li>Company</li>
                <li>Career</li>
                <li>Mobile</li>
                <li>How it works</li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="col-md-2">
              <h6 className="footer-title">About</h6>
              <ul className="footer-links">
                <li>Contacts</li>
                <li>About Us</li>
                <li>FAQ</li>
                <li>Our Team</li>
              </ul>
            </div>

            {/* Column 4 */}
            <div className="col-md-2">
              <h6 className="footer-title">Product</h6>
              <ul className="footer-links">
                <li>Terms of Use</li>
                <li>Privacy Policy</li>
                <li>Login</li>
              </ul>
            </div>

            {/* Column 5 */}
            <div className="col-md-3">
              <h6 className="footer-title">Download App</h6>
              <ul className="footer-links">
                <li>Google Play</li>
                <li>App Store</li>
                <li>Desktop</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="footer-bottom">
          © 2025 Hotel Booking App
        </div>
      </div>
    </footer>
  );
}

export default Footer;
