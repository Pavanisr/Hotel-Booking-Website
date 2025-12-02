import React from "react";

function ContactUs() {
  return (
    <div>
      <style>{`
        .contact-container {
          background: white;
          padding: 60px 40px;
          border-radius: 12px;
          margin-top: 40px;
        }

        .contact-info-icon {
          font-size: 20px;
          color: #ff7a00;
          margin-right: 10px;
        }

        .contact-form input,
        .contact-form textarea {
          border-radius: 8px;
          border: 1px solid #ddd;
          padding: 12px;
          width: 100%;
          margin-bottom: 15px;
        }

        .submit-btn {
          width: 100%;
          border: none;
          padding: 12px;
          color: white;
          border-radius: 8px;
          background: linear-gradient(to right, #9645ff, #ff4f81, #ff8a00);
        }

        .contact-title {
          font-size: 32px;
          font-weight: bold;
        }

        .left-text p {
          color: #777;
        }
      `}</style>

      <div className="container contact-container shadow-lg">
        <div className="row g-5">

          {/* LEFT SIDE */}
          <div className="col-md-6 left-text">
            <h2 className="contact-title">Contact Us</h2>
            <p className="mt-3">
              We are committed to processing the information in order to contact you and talk about your project.
            </p>

            <div className="mt-4">
              <p>
                <span className="contact-info-icon">📧</span>
                example@teamwebflow.com
              </p>

              <p className="mt-3">
                <span className="contact-info-icon">🏠</span>
                4074 Ebert Summit Suite 375<br />
                Lake Leonardchester
              </p>

              <p className="mt-3">
                <span className="contact-info-icon">📞</span>
                +44 123 654 7890
              </p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-md-6">
            <form className="contact-form">

              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <input type="text" placeholder="Website" required />

              <textarea rows="5" placeholder="Message"></textarea>

              <button className="submit-btn">Submit</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ContactUs;
