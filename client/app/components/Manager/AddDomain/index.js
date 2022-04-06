/**
 *
 * AddDomain
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';

const AddDomain = props => {
  const {
    controls,
    domainFormData,
    formErrors,
    domainChange,
    addDomain
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addDomain();
  };

  return (
    <div className='add-domain'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Domain Name'}
              value={domainFormData.name}
              onInputChange={(name, value) => {
                domainChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={formErrors['description']}
              label={'Description'}
              name={'description'}
              placeholder={'Domain Description'}
              value={domainFormData.description}
              onInputChange={(name, value) => {
                domainChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['controls']}
              label={'Select Controls'}
              multi={true}
              value={domainFormData.controls}
              options={controls}
              handleSelectChange={value => {
                domainChange('controls', value);
              }}
            />
          </Col>
          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'active-domain'}
              name={'isActive'}
              label={'Active?'}
              checked={domainFormData.isActive}
              toggleCheckboxChange={value => domainChange('isActive', value)}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-domain-actions'>
          <Button type='submit' text='Add Domain' />
        </div>
      </form>
    </div>
  );
};

export default AddDomain;
