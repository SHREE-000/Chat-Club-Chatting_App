import React from 'react'
import axios from "axios";
import {useState} from 'react'
import AlertNotification from '../shared/components/AlertNotification';
import { validateContact } from '../shared/utils/validators';

const ContactPage = () => {

    const [msg,setMsg] = useState({
      username : "",
      email : "",
      message : ""
    })

    const [notificationStatus, setNotification] = useState(false)
    const [notificationStatusFail, setNotificationFailed] = useState(false)
  
    const handleChange = async (event) => {
      let name = event.target.name
      let value = event.target.value
      setMsg({...msg, [name] : value}) 
    }
  
    const submitChange  = async (event) => {
      event.preventDefault()
      let {username,email,message} = msg
      const validation = validateContact({email,message})
      if (validation && username) {
      const response = await axios.post('/api/auth/contact', {
        username,email,message
      }) 
      if (response.status === 400 || !response) {
        setNotificationFailed(true)
        setTimeout( async() => {
          await setNotificationFailed(false)
          window.location.reload()
        },5000) 
      }
      else {
          setNotification(true)
          setTimeout( async() => {
            await setNotification(false)
            window.location.reload()
          },5000) 
        } 
      }else{
        setNotificationFailed(true)
        setTimeout( async() => {
          await setNotificationFailed(false)
          window.location.reload()
        },5000) 
      }
      
    } 

  return (
    <>

    


<section id="contact" className="mt-5 mb-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12">
              <h3 className="fs-5 text-center mb-0">Contact Us</h3>
              <h1 className="display-6 text-center mb-4">
                Have Some <b> Question?</b>
              </h1>
              <hr className="w-25 mx-auto" />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-5">
              <img src="https://bit.ly/3rGZGKn" alt="" className="w-75" />
            </div>

            <div className="col-md-6">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={msg.username}
                    onChange={handleChange}
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={msg.email}
                    onChange={handleChange}
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Your Message
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    name="message"
                    value={msg.message}
                    onChange={handleChange}
                    rows="5"
                    required
                  ></textarea>
                </div>

                <buttun className="btn btn-outline-primary mb-5" onClick={submitChange}>
                  Send Message
                  <i className="fa fa-paper-plane ms-2"></i>
                </buttun>
                <div className='mt-5'>
                { notificationStatus && <AlertNotification notificationContactSuccess={'Succefully send your message'} />
    }
    { notificationStatusFail && <AlertNotification notificationContactFail={'Please use proper entries'} />
    }
    </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default ContactPage;