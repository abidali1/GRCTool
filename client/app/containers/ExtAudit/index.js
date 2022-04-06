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

class ExtAudit extends React.PureComponent {
  render() {
    const {
      externalauditorFormData,
      formErrors,
      ExternalAuditorFormChange,
      ExtAuditForUs,
      isSubmitting,
      isLoading
    } = this.props;

    const handleSubmit = event => {
      event.preventDefault();
      ExtAuditForUs();
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
                    value={externalauditorFormData.name}
                    onInputChange={(name, value) => {
                      ExternalAuditorFormChange(name, value);
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
                    value={externalauditorFormData.email}
                    onInputChange={(name, value) => {
                      ExternalAuditorFormChange(name, value);
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
                    value={externalauditorFormData.phoneNumber}
                    onInputChange={(name, value) => {
                      ExternalAuditorFormChange(name, value);
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
                    value={externalauditorFormData.framework}
                    onInputChange={(name, value) => {
                      ExternalAuditorFormChange(name, value);
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
                    value={externalauditorFormData.business}
                    onInputChange={(name, value) => {
                      
                      ExternalAuditorFormChange(name, value);
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
                  <h3>Would you like automate the process of GRC!</h3>
                  <h4>Secure your business with GRC Tool</h4>
                  <b>Register Today</b>
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
    externalauditorFormData: state.externalauditor.externalauditorFormData,
    formErrors: state.externalauditor.formErrors,
    isSubmitting: state.externalauditor.isExternalAuditorSubmitting,
    isLoading: state.externalauditor.isExternalAuditorLoading
  };
};
                       
export default connect(mapStateToProps, actions)(ExtAudit);
