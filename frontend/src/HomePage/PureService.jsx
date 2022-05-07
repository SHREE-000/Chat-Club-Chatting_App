import React from 'react'
import Footer from './Footer';
import NavBar from './NavBar';

const PureService = () => {
  return (
    <>
<NavBar />
<section id="service">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-12">
              <h3 className="fs-5 text-center mb-0">Our Services</h3>
              <h1 className="display-6 text-center mb-4">
                Our <b>Awesome</b> Services
              </h1>
              <hr className="w-25 mx-auto" />
            </div>{" "}
          </div>

          <div className="row mt-5">
            <div className="col-md-4">
              <div class="card p-3">
                <div class="card-body text-center">
                    <i className="fa fa-file-code-o fa-4x mb-4 text-primary"></i>
          
                  <p class="card-text lead">
                  ChatClub servers are organized into topic-based 
                  channels where you can collaborate, 
                  share, and just talk about your day 
                  without clogging up a group chat.
                  </p>
  
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div class="card p-3">
                <div class="card-body text-center">
                    <i className="fa fa-cogs fa-4x mb-4 text-primary"></i>

                  <p class="card-text lead">
                  Grab a seat in a voice channel when you’re 
                  free. Friends in your server 
                  can see you’re around and instantly 
                  pop in to talk without having to call.
                  </p>
                
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div class="card p-3">
                <div class="card-body text-center">
                    <i className="fa fa-star-half-o fa-4x mb-4 text-primary"></i>

                  <p class="card-text lead">
                  Get any community running with moderation 
                  tools and custom member access. 
                  Give members special powers, 
                  set up private channels, and more.
                  </p>

                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-4">
              <div class="card p-3">
                <div class="card-body text-center">
                    <i className="fa fa-mobile fa-4x mb-4 text-primary"></i>

                  <p class="card-text lead">
                  Create an invite-only place where you belong
                  Where hanging out is easyCreate an invite-only 
                  place where you belong
                  </p>

                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div class="card p-3" >
                <div class="card-body text-center">
                    <i className="fa fa-users fa-4x mb-4 text-primary"></i>

                  <p class="card-text lead">
                  Low-latency voice and video feels like you’re in the 
                  same room. Wave hello over video, watch 
                  friends stream their games, or gather up 
                  and have a drawing session with screen share.
                  </p>

                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div class="card p-3">
                <div class="card-body text-center">
                    <i className="fa fa-laptop fa-4x mb-4 text-primary"></i>
                  <h3 class="card-text lead">
                  From few to a fandom do some fun with Club Chat.
                  We will make a new experience in chatting.
                  Try out... 
                  
                  </h3>

                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      <Footer />

    </>
  )
}

export default PureService;