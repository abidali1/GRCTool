
import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';
import banners from './banners.json';
import { FcLockLandscape } from 'react-icons/fc';
import { FcCheckmark } from 'react-icons/fc';
import { FcMultipleInputs } from 'react-icons/fc';
import { FcPositiveDynamic } from 'react-icons/fc';

 

class Homepage extends React.PureComponent {

  render() {
    return (
      <div className='homepage'>
        <header className="masthead">
            <div className="container px-4 px-lg-5 h-100">
                <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                    <div className="col-lg-8 align-self-end">
                        <h1 className="text-white font-weight-bold">Governance, Risk, and Compliance</h1>
                        <hr className="divider" />
                    </div>
                    <div className="col-lg-8 align-self-baseline">
                        <p className="text-white-75 mb-5">Secure your business with regulation standards today</p>
                        <a className="btn btn-primary btn-xl" href="#about">Find Out More</a>
                    </div>
                </div>
            </div>
        </header>

            <section className="page-section bg-primary" id="about">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-8 text-center">
                        <h2 className="text-white mt-0">We've got what you need!</h2>
                        <hr className="divider divider-light" />
                        <p className="text-white-75 mb-4">Start Bootstrap has everything you need to get your new website up and running in no time! Choose one of our open source, free to download, and easy to use themes! No strings attached!</p>
                        <a className="btn btn-light btn-xl" href="#services">Get Started!</a>
                    </div>
                </div>
            </div>
        </section>

            <section className="page-section" id="services">
            <div className="container px-4 px-lg-5">
                <h2 className="text-center mt-0">At Your Service</h2>
                <hr className="divider" />
                <div className="row gx-4 gx-lg-5">
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <div className="mb-2"><i><FcMultipleInputs size={60}/></i></div>
                            <h3 className="h4 mb-2">Fast development</h3>
                            <p className="text-muted mb-0">Change the pace of work with this tool</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <div className="mb-2"><i><FcPositiveDynamic size={60}/></i></div>
                            <h3 className="h4 mb-2">Keep track</h3>
                            <p className="text-muted mb-0">All your files in one platform.</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <div className="mb-2"><i><FcCheckmark size={60}/></i></div>
                            <h3 className="h4 mb-2">Automate your work</h3>
                            <p className="text-muted mb-0">You can easily automate your GRC process with our tool!</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <div className="mb-2"><i><FcLockLandscape size={60}/></i></div>
                            <h3 className="h4 mb-2">Secure Platform</h3>
                            <p className="text-muted mb-0">All your files remain confidential to you</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </div>
    );
  }
}

 

const mapStateToProps = state => {

  return {};

};

 

export default connect(mapStateToProps, actions)(Homepage);