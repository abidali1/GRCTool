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

class Sell extends React.PureComponent {
  render() {
    const {
      sellFormData,
      formErrors,
      sellFormChange,
      sellWithUs,
      isSubmitting,
      isLoading
    } = this.props;

    const handleSubmit = event => {
      event.preventDefault();
      sellWithUs();

    };

    return (
      <div className='sell'>
        {isLoading && <LoadingIndicator />}
        <h2>Join GRC Tool and Register your compnay!</h2>
        <hr />
            <Col xs='24' md='18' className='order-1 order-md-2'>
            <Row>
              <Col xs='20' className='order-2 order-md-1 text-md-center mb-3'>
                <div className='agreement-banner-text'>
                  <h3>Would you like automate the process of GRC!</h3>
                  <h4>Secure your business with GRC Tool</h4>
                  <b>Register Today</b>
                </div>
              </Col>

              <Col
                xs='20'
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
        <Row>
          <Col xs='24' md='8' className='order-2 order-md-1'>
            <form onSubmit={handleSubmit}>
              <Row>
              <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['englishname']}
                    label={'Company Name English'}
                    name={'englishname'}
                    placeholder={'You Full Name'}
                    value={sellFormData.englishname}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['arabicname']}
                    label={'Company Name Arabic Test'}
                    name={'arabicname'}
                    placeholder={'You Full Name'}
                    value={sellFormData.arabicname}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <h3> Information of the person responsible for managing the organization's account</h3>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['accountsupervisorenglishname']}
                    label={'Account Supervisor English Name '}
                    name={'accountsupervisorenglishname'}
                    placeholder={'You Full Name'}
                    value={sellFormData.accountsupervisorenglishname}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['accountsupervisorarabicname']}
                    label={'Account Supervisor Arabic Name '}
                    name={'accountsupervisorarabicname'}
                    placeholder={'You Full Name'}
                    value={sellFormData.accountsupervisorarabicname}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['accountsupervisorid']}
                    label={'Account Supervisor ID'}
                    name={'accountsupervisorid'}
                    placeholder={'You Full Name'}
                    value={sellFormData.accountsupervisorid}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['accountsupervisoremail']}
                    label={'Account Supervisor Email'}
                    name={'accountsupervisoremail'}
                    placeholder={'You Name'}
                    value={sellFormData.accountsupervisoremail}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['accountsupervisorphoneNumber']}
                    label={'Account Supervisor Phone Number'}
                    name={'accountsupervisorphoneNumber'}
                    placeholder={'You Full Name'}
                    value={sellFormData.accountsupervisorphoneNumber}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['accountsupervisortelephoneNumber']}
                    label={'Account Supervisor Telephone Number'}
                    name={'accountsupervisortelephoneNumber'}
                    placeholder={'Your Telephone Number'}
                    value={sellFormData.accountsupervisortelephoneNumber}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <h3> Information of the person responsible for cyber security in the organization </h3>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['csoarabicname']}
                    label={'CSO Arabic Name '}
                    name={'csoarabicname'}
                    placeholder={'CSO Full English Name'}
                    value={sellFormData.csoarabicname}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['csoenglishname']}
                    label={'CSO English Name '}
                    name={'csoenglishname'}
                    placeholder={'CSO Full Arabic Name'}
                    value={sellFormData.csoenglishname}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['csoid']}
                    label={' CSO National ID '}
                    name={'csoid'}
                    placeholder={'CSO ID Number'}
                    value={sellFormData.csoid}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['csophoneNumber']}
                    label={'CSO Phone Number'}
                    name={'csophoneNumber'}
                    placeholder={'CSO Phone Number'}
                    value={sellFormData.csophoneNumber}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['csoemail']}
                    label={'CSO Email Address'}
                    name={'csoemail'}
                    placeholder={'CSO Email Address'}
                    value={sellFormData.csoemail}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['csotelephoneNumber']}
                    label={'CSO Telephone Number '}
                    name={'csotelephoneNumber'}
                    placeholder={'CSO Telephone Number'}
                    value={sellFormData.csotelephoneNumber}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <h3> Information of the deputy person in charge of cyber security in the organization </h3>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['deputyarabicname']}
                    label={'Arabic Name of CSO Deputy '}
                    name={'deputyarabicname'}
                    placeholder={'CSO Deputy Arabic Full Name'}
                    value={sellFormData.deputyarabicname}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['deputyenglishname']}
                    label={'English Name of deputy '}
                    name={'deputyenglishname'}
                    placeholder={'English Full Name of CSO Deputy'}
                    value={sellFormData.deputyenglishname}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['deputyid']}
                    label={' National ID of deputy '}
                    name={'deputyid'}
                    placeholder={'CSO Deputy ID Number'}
                    value={sellFormData.deputyid}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['deputyemail']}
                    label={'Email Address of CSO deputy '}
                    name={'deputyemail'}
                    placeholder={'Your Email Address'}
                    value={sellFormData.deputyemail}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['deputytelephoneNumber']}
                    label={'Telephone Number of deputy'}
                    name={'deputytelephoneNumber'}
                    placeholder={'CSO Deputy Telephone Number'}
                    value={sellFormData.deputytelephoneNumber}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['deputyphoneNumber']}
                    label={'Phone Number of deputy'}
                    name={'deputyphoneNumber'}
                    placeholder={'CSO Deputy Phone Number'}
                    value={sellFormData.deputyphoneNumber}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <h2> Brief Description About the Organization                      </h2>
                <br/>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['sector']}
                    label={'Sector '}
                    name={'sector'}
                    placeholder={'Your Business Sector'}
                    value={sellFormData.sector}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['branchnumber']}
                    label={'Number of branch '}
                    name={'branchnumber'}
                    placeholder={'Branch Number'}
                    value={sellFormData.branchnumber}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['website']}
                    label={'the official website address '}
                    name={'website'}
                    placeholder={'Website Address'}
                    value={sellFormData.website}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col> 
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['officialemployee']}
                    label={'Number of official employees '}
                    name={'officialemployee'}
                    placeholder={'Your official employee'}
                    value={sellFormData.officialemployee}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>               
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['contractoremployee']}
                    label={'Number of contract employees  '}
                    name={'contractoremployee'}
                    placeholder={'Your Contractor employees'}
                    value={sellFormData.contractoremployee}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['city']}
                    label={'City of the organization`s main site'}
                    name={'city'}
                    placeholder={'Main Site City'}
                    value={sellFormData.city}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['address']}
                    label={'The main address of the orgnization '}
                    name={'address'}
                    placeholder={'Orgnization Address'}
                    value={sellFormData.address}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['numdatacenter']}
                    label={'The Number of data centers of the orgnization '}
                    name={'numdatacenter'}
                    placeholder={'Your Data Center number'}
                    value={sellFormData.numdatacenter}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'text'}
                    error={formErrors['datacenterlocation']}
                    label={'The Locations of data centers of the orgnization '}
                    name={'datacenterlocation'}
                    placeholder={'Your Business Framework'}
                    value={sellFormData.datacenterlocation}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <h3>The number of website , applications and electronic services for the Organization </h3>
                <Col xs='6'>
                  <Input
                    type={'number'}
                    error={formErrors['appconnected']}
                    label={'connected to the enternet '}
                    name={'appconnected'}
                    placeholder={'Device, App and services connected to the enternet'}
                    value={sellFormData.appconnected}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'number'}
                    error={formErrors['appinternal']}
                    label={'enternal '}
                    name={'appinternal'}
                    placeholder={'internal Device, App and services'}
                    value={sellFormData.appinternal}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='6'>
                  <Input
                    type={'number'}
                    error={formErrors['devicenum']}
                    label={'the number of electronic device and database of the orgnization  '}
                    name={'devicenum'}
                    placeholder={'Your Business Framework'}
                    value={sellFormData.devicenum}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
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
                    value={sellFormData.business}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
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

        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sellFormData: state.client.sellFormData,
    formErrors: state.client.formErrors,
    isSubmitting: state.client.isSellSubmitting,
    isLoading: state.client.isSellLoading,

  };
};

export default connect(mapStateToProps, actions)(Sell);
