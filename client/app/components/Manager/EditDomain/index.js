/**
 *
 * EditDomain
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';
import Switch from '../../Common/Switch';

const EditDomain = props => {
  const {
    controls,
    domain,
    domainChange,
    formErrors,
    updateDomain,
    deleteDomain,
    activateDomain
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updateDomain();
  };

  return (
    <div className='edit-domain'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Domain Name'}
              value={domain.name}
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
              value={domain.description}
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
              defaultValue={domain.controls}
              handleSelectChange={value => {
                domainChange('controls', value);
              }}
            />
          </Col>
          <Col xs='12' md='12' className='mt-3 mb-2'>
            <Switch
              style={{ width: 100 }}
              tooltip={domain.isActive}
              tooltipContent={`Disabling ${domain.name} will also disable all ${domain.name} products.`}
              id={`enable-domain-${domain._id}`}
              name={'isActive'}
              label={'Active?'}
              checked={domain.isActive}
              toggleCheckboxChange={value =>
                activateDomain(domain._id, value)
              }
            />
          </Col>
        </Row>
        <hr />
        <div className='d-flex flex-column flex-md-row'>
          <Button
            type='submit'
            text='Save'
            className='mb-3 mb-md-0 mr-0 mr-md-3'
          />
          <Button
            variant='danger'
            text='Delete'
            onClick={() => deleteDomain(domain._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditDomain;
