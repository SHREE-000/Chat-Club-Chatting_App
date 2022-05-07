import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import  '../App.css'

const AboutPage = () => {
  return (
    <>

<section className="about">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img src="https://bit.ly/36ytS2L"
                        className='w-75 mt-5' alt="" />
                        </div>
                        <div className="col-md-6">
                        <h3 className="fs-5 mt-5"> About Us</h3>
                        <h1 className="display-6 mb-2">Who <b>We</b> Are </h1>
                        <hr className='w-50' />
                        <p className="lead mb-4">
                        ...where you can belong to a 
                        school club, a gaming group, 
                        or a worldwide art community. 
                        Where just you and a handful of 
                        friends can spend time together. 
                        A place that makes it easy to talk 
                        every day and hang out more often.</p>
                         <div className="buttons d-flex justify-content-center mb-5">
                       <button className="btn btn-primary rounded-pill me-4 px-4 py-2">
                        Get Started
                        </button>
                        <button className="btn btn-primary rounded-pill me-4 px-4 py-2">
                        Contact Us
                        </button>
                      </div>
                        </div>
                    </div>
                </div>
            </section>
            
    </>
  )
}

export default AboutPage;