/*
 *
 * Sell
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class IntAudit extends React.PureComponent {
  render() {
    const {
      internalauditorFormData,
      formErrors,
      InternalAuditorFormChange,
      IntAuditForUs,
      isSubmitting,
      isLoading
    } = this.props;

    const handleSubmit = event => {
      event.preventDefault();
      IntAuditForUs();
    };

    return (
      <div className='sell'>
        {isLoading && <LoadingIndicator />}
        <h2>Join GRC Tool and Register your compnay!</h2>
        <hr />
        <Row>
          <Col xs='12' md='6' className='order-2 order-md-1'>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col xs='12'>
                  <Input
                    type={'text'}
                    error={formErrors['name']}
                    label={'Name'}
                    name={'name'}
                    placeholder={'You Full Name'}
                    value={internalauditorFormData.name}
                    onInputChange={(name, value) => {
                      InternalAuditorFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='12'>
                  <Input
                    type={'text'}
                    error={formErrors['email']}
                    label={'Email Address'}
                    name={'email'}
                    placeholder={'Your Email Address'}
                    value={internalauditorFormData.email}
                    onInputChange={(name, value) => {
                      InternalAuditorFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='12'>
                  <Input
                    type={'text'}
                    error={formErrors['phoneNumber']}
                    label={'Phone Number'}
                    name={'phoneNumber'}
                    placeholder={'Your Phone Number'}
                    value={internalauditorFormData.phoneNumber}
                    onInputChange={(name, value) => {
                      InternalAuditorFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='12'>
                  <Input
                    type={'text'}
                    error={formErrors['framework']}
                    label={'Framework'}
                    name={'framework'}
                    placeholder={'Your Business Framework'}
                    value={internalauditorFormData.framework}
                    onInputChange={(name, value) => {
                      InternalAuditorFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='12'>
                  <Input
                    type={'textarea'}
                    error={formErrors['business']}
                    label={'Business'}
                    name={'business'}
                    placeholder={'Please Describe Your Business'}
                    value={internalauditorFormData.business}
                    onInputChange={(name, value) => {
                      
                      InternalAuditorFormChange(name, value);
                    }}
                  />
                </Col>
              </Row>
              <hr />
              <div className='sell-actions'>
                <Button type='submit' text='Submit' disabled={isSubmitting} />
              </div>
            </form>
          </Col>
          <Col xs='12' md='6' className='order-1 order-md-2'>
            <Row>
              <Col xs='12' className='order-2 order-md-1 text-md-center mb-3'>
                <div className='agreement-banner-text'>
                  <h3 className='join_text'>Would you like automate the process of GRC!</h3>
                  <h4 className='join_text'>Secure your business with GRC Tool</h4>
                  <b className='join_text'>Register Today</b>
                </div>
              </Col>

              <Col
                xs='12'
                className='order-1 order-md-2 text-center mb-3 mb-md-0'
              >
                <img
                  className='agreement-banner'
                  src={'/images/banners/agreement.svg'}
                  alt='agreement banner'
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    internalauditorFormData: state.internalauditor.internalauditorFormData,
    formErrors: state.internalauditor.formErrors,
    isSubmitting: state.internalauditor.isInternalAuditorSubmitting,
    isLoading: state.internalauditor.isInternalAuditorLoading
  };
};
                       
export default connect(mapStateToProps, actions)(IntAudit);
