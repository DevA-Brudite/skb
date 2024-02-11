import React from "react";

const CompanyDetails = () => {
  // const today = new Date();
  // const year = today.getFullYear();
  return (
    <>
      <footer>
        <div className="bg-black text-white py-3">
          <div className="flex flex-col lg:mx-2 lg:flex-row justify-evenly">
            {/* about company */}
            <div className="w-fill px-5 lg:px-0 mb-5 lg:mb-0 lg:w-2/6">
              <h3 className="text-xl underline mb-2">About Brudite</h3>
              <p className="mx-3 text-sm tracking-wide">
                At Brudite, People are extremely passionate about what they do,
                which translates into rewarding results and positive
                experiences. Their years of experience, fresh creativity, and
                unwavering dedication set them apart from the competition.
              </p>
            </div>

            {/* information */}
            <div>
              <div className="px-5 lg:px-0">
                <h2 className="text-2xl ml-2">Brudite Private Limited</h2>
              </div>
              <div className="px-5 lg:px-0 flex flex-row items-center mt-4 gap-2">
                <ion-icon name="call-outline" className="bg-white"></ion-icon>
                <h4>+(91) 907 662 4183</h4>
              </div>
              <div className=" px-5 lg:px-0 flex flex-row items-center mt-4 gap-2">
                <ion-icon name="mail-outline"></ion-icon>
                <h5 className="text-sm ">info@brudite.com</h5>
              </div>
            </div>

            {/* connect us */}
            <div>
              <div>
                <iframe
                  title="brudite"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.343055606655!2d75.81055907529066!3d26.79720327671619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2f54cda529280afb%3A0xa37586831d7d7282!2sBrudite%20Private%20Limited!5e0!3m2!1sen!2sin!4v1706181512492!5m2!1sen!2sin"
                  width="350"
                  height="170"
                  style={{ border: 0 }}
                  className="px-5 lg:px-0"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
                {/* connect option */}
                <div className=" px-5 lg:px-0 flex flex-row gap-3 text-sm  mt-5 ">
                  <div>
                    <a
                      className="hover:text-teal-400 text-2xl hover:text-xl"
                      href="https://www.instagram.com/brudite_pvt_ltd/"
                      target="__blank"
                    >
                      <ion-icon name="logo-instagram"></ion-icon>
                    </a>
                  </div>
                  <div>
                    <a
                      className="hover:text-teal-400 text-2xl hover:text-xl"
                      href="/"
                    >
                      <ion-icon name="logo-youtube"></ion-icon>
                    </a>
                  </div>
                  <div>
                    <a
                      className="hover:text-teal-400 text-2xl hover:text-xl"
                      href="/"
                    >
                      <ion-icon name="logo-linkedin"></ion-icon>
                    </a>
                  </div>
                  <div>
                    <a
                      className="hover:text-teal-400 text-2xl hover:text-xl"
                      href="/"
                    >
                      <ion-icon name="logo-facebook"></ion-icon>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* company name */}
          {/* <div className="text-center">
            <h3 className="text-xl ">Brudite Private Limited</h3>
          </div> */}

          {/* subscribe model */}
          {/* <div className="text-center flex flex-col  items-center  text-3xl mt-6 ">
            <input type="email" className="text-black w-1/3"></input>
            <button className="text-black text-xl py-1  duration-200 hover:text-white rounded-xl mt-5  bg-teal-300 hover:bg-teal-700 px-3">
              Submit
            </button>
          </div> */}

          {/* phone number */}
          {/* <div className="text-center flex flex-row justify-center items-center gap-4 mt-5">
            <ion-icon name="call-outline" className="bg-white"></ion-icon>
            <h5 className="text-sm ">+(91) 907 662 4183</h5>
          </div> */}

          {/* gmail id */}
          {/* <div className="text-center flex flex-row justify-center items-center gap-4 mt-5">
            <ion-icon name="mail-outline"></ion-icon>
            <h5 className="text-sm ">info@brudite.com</h5>
          </div> */}

          {/* connect option */}
          {/* <div className="flex flex-row gap-3 text-sm justify-center mt-3 ">
            <div>
              <a className="hover:text-teal-400 hover:text-xl" href="/">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </div>
            <div>
              <a className="hover:text-teal-400 hover:text-xl" href="/">
                <ion-icon name="logo-youtube"></ion-icon>
              </a>
            </div>
            <div>
              <a className="hover:text-teal-400 hover:text-xl" href="/">
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </div>
            <div>
              <a className="hover:text-teal-400 hover:text-xl" href="/">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </div>
          </div> */}

          {/* copyright div  */}
          {/* <div className="text-center mt-4">
            <h4></h4>
          </div> */}
        </div>
      </footer>
    </>
  );
};

export default CompanyDetails;
