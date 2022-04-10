import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import actions from '../../actions';
import Input from '../../components/Common/Input';
import SelectOption from '../../components/Common/SelectOption';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import makeAnimated from 'react-select/animated';

class CreatRegulatorAccount extends React.PureComponent {

  componentDidMount() {
    this.props.fetchFrameworksSelect();
  }

  render() {
    const {
      user,
      regulatorFormData,
      formErrors,
      regulatorFormChange,
      regWithUs,
      isSubmitting,
      frameworks,
      isLoading,
      multi,
      regulator,
      defaultValue,
      value,
      label,
      disabled
    } = this.props;

    const handleSubmit = event => {
      event.preventDefault();
      regWithUs();
    };

    return (
      <div className='sell'>
        {isLoading && <LoadingIndicator />}
        <h2>Add regulator to our platform </h2>
        <hr />
        <Row>
          <Col xs='12' md='6' className='order-2 order-md-1'>
            <form className='block-example border border-dark' onSubmit={handleSubmit}>
              <Row>
                <Col xs='12'>
                  <Input
                    type={'text'}
                    error={formErrors['name']}
                    label={'Name'}
                    name={'name'}
                    placeholder={'You Full Name'}
                    value={regulatorFormData.name}
                    onInputChange={(name, value) => {
                      regulatorFormChange(name, value);
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
                    value={regulatorFormData.email}
                    onInputChange={(name, value) => {
                      regulatorFormChange(name, value);
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
                    value={regulatorFormData.phoneNumber}
                    onInputChange={(name, value) => {
                      regulatorFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='12'>

              {/* <SelectOption
              disabled={user.role === 'ROLE_CLIENT'}
              error={formErrors['framework']}
              name={'framework'}
              label={'Select Framework'}
              value={
                user.role === 'ROLE_CLIENT'
                  ? frameworks[1]
                  : regulatorFormData.framework
              }
              options={frameworks}
              handleSelectChange={value => {
                regulatorFormChange('framework', value);
              }}
            /> */}

              <SelectOption
              error={formErrors['framework']}
              label={'Select Frameworks'}
              multi={true}
              value={regulatorFormData.frameworks}
              options={frameworks}
              handleSelectChange={value => {
                regulatorFormChange('framework', value);
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
                    value={regulatorFormData.business}
                    onInputChange={(name, value) => {
                      regulatorFormChange(name, value);
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
                  <h3 className='agreement-banner-text-color'>Would you like automate the process of GRC!</h3>
                  <h4 className='agreement-banner-text-color'>Secure your business with GRC Tool</h4>
                  <b className='agreement-banner-text-color'>Register Today</b>
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

    regulatorFormData: state.regulator.regulatorFormData,
    formErrors: state.regulator.formErrors,
    isSubmitting: state.regulator.isRegulatorSubmitting,
    isLoading: state.regulator.isRegulatorLoading,
    frameworks: state.framework.frameworksSelect
  };

};



export default connect(mapStateToProps, actions)(CreatRegulatorAccount);