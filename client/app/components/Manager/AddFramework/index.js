/**
 *
 * AddFramework
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';

const AddFramework = props => {
  const { frameworkFormData, formErrors, frameworkChange, addFramework } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addFramework();
  };

  return (
    <div className='add-framework'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Framework Name'}
              value={frameworkFormData.name}
              onInputChange={(name, value) => {
                frameworkChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={formErrors['description']}
              label={'Description'}
              name={'description'}
              placeholder={'Framework Description'}
              value={frameworkFormData.description}
              onInputChange={(name, value) => {
                frameworkChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'active-framework'}
              name={'isActive'}
              label={'Active?'}
              checked={frameworkFormData.isActive}
              toggleCheckboxChange={value => frameworkChange('isActive', value)}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-framework-actions'>
          <Button type='submit' text='Add Framework' />
        </div>
      </form>
    </div>
  );
};

export default AddFramework;
