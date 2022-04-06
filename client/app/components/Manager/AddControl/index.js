/**
 *
 * AddControl
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';

const taxableSelect = [
  { value: 1, label: 'Yes' },
  { value: 0, label: 'No' }
];

const AddControl = props => {
  const {
    user,
    controlFormData,
    formErrors,
    controlChange,
    addControl,
    frameworks,
    image
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addControl();
  };

  return (
    <div className='add-control'>
      <h1 />
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['sku']}
              label={'Sku'}
              name={'sku'}
              placeholder={'Control Sku'}
              value={controlFormData.sku}
              onInputChange={(name, value) => {
                controlChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Control Name'}
              value={controlFormData.name}
              onInputChange={(name, value) => {
                controlChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={formErrors['description']}
              label={'Description'}
              name={'description'}
              placeholder={'Control Description'}
              value={controlFormData.description}
              onInputChange={(name, value) => {
                controlChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'number'}
              error={formErrors['quantity']}
              label={'Quantity'}
              name={'quantity'}
              decimals={false}
              placeholder={'Control Quantity'}
              value={controlFormData.quantity}
              onInputChange={(name, value) => {
                controlChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'number'}
              error={formErrors['price']}
              label={'Price'}
              name={'price'}
              min={1}
              placeholder={'Control Price'}
              value={controlFormData.price}
              onInputChange={(name, value) => {
                controlChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['taxable']}
              label={'Taxable'}
              name={'taxable'}
              options={taxableSelect}
              value={controlFormData.taxable}
              handleSelectChange={value => {
                controlChange('taxable', value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <SelectOption
              disabled={user.role === 'ROLE_CLIENT'}
              error={formErrors['framework']}
              name={'framework'}
              label={'Select Framework'}
              value={
                user.role === 'ROLE_CLIENT'
                  ? frameworks[1]
                  : controlFormData.framework
              }
              options={frameworks}
              handleSelectChange={value => {
                controlChange('framework', value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'file'}
              error={formErrors['file']}
              name={'image'}
              label={'file'}
              placeholder={'Please Upload Image'}
              value={image}
              onInputChange={(name, value) => {
                controlChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'active-control'}
              name={'isActive'}
              label={'Active?'}
              checked={controlFormData.isActive}
              toggleCheckboxChange={value => controlChange('isActive', value)}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-control-actions'>
          <Button type='submit' text='Add Control' />
        </div>
      </form>
    </div>
  );
};

export default AddControl;
