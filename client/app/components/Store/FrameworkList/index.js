/**
 *
 * FrameworkList
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const FrameworkList = props => {
  const { frameworks } = props;

  return (
    <div className='brands-list'>
      <h2>Shop By Framework</h2>
      <hr />
      <Row className='flex-sm-row'>
        {frameworks.map((framework, index) => (
          <Col xs='6' md='4' lg='3' key={index} className='mb-3 px-2'>
            <Link
              to={`/shop/framework/${framework.slug}`}
              className='d-block brand-box'
            >
              <h4>{framework.name}</h4>
              <p className='brand-desc'>{framework.description}</p>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FrameworkList;
