/**
 *
 * EditFramework
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import Switch from '../../Common/Switch';

const EditFramework = props => {
  const {
    framework,
    frameworkChange,
    formErrors,
    updateFramework,
    deleteFramework,
    activateFramework
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updateFramework();
  };

  return (
    <div className='edit-framework'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Framework Name'}
              value={framework.name}
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
              value={framework.description}
              onInputChange={(name, value) => {
                frameworkChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12' className='mt-3 mb-2'>
            <Switch
              style={{ width: 100 }}
              tooltip={framework.isActive}
              tooltipContent={`Disabling ${framework.name} will also disable all ${framework.name} controls.`}
              id={`enable-framework-${framework._id}`}
              name={'isActive'}
              label={'Active?'}
              checked={framework.isActive}
              toggleCheckboxChange={value => activateFramework(framework._id, value)}
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
            onClick={() => deleteFramework(framework._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditFramework;
