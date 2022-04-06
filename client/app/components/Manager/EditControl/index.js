/**
 *
 * EditControl
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

const EditControl = props => {
  const {
    user,
    control,
    controlChange,
    formErrors,
    frameworks,
    updateControl,
    deleteControl,
    activateControl
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updateControl();
  };

  return (
    <div className='edit-control'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Control Name'}
              value={control.name}
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
              value={control.description}
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
              value={control.quantity}
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
              value={control.price}
              onInputChange={(name, value) => {
                controlChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['taxable']}
              label={'Taxable'}
              multi={false}
              name={'taxable'}
              value={[control.taxable ? taxableSelect[0] : taxableSelect[1]]}
              options={taxableSelect}
              handleSelectChange={value => {
                controlChange('taxable', value.value);
              }}
            />
          </Col>
          {user.role === 'ROLE_ADMIN' && (
            <Col xs='12' md='12'>
              <SelectOption
                error={formErrors['framework']}
                label={'Select Framework'}
                multi={false}
                value={control.framework}
                options={frameworks}
                handleSelectChange={value => {
                  controlChange('framework', value);
                }}
              />
            </Col>
          )}
          <Col xs='12' md='12' className='mt-3 mb-2'>
            <Switch
              id={`enable-control-${control._id}`}
              name={'isActive'}
              label={'Active?'}
              checked={control?.isActive}
              toggleCheckboxChange={value => {
                controlChange('isActive', value);
                activatecontrol(control._id, value);
              }}
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
            onClick={() => deleteControl(control._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditControl;
