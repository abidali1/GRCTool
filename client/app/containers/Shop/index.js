/**
 *
 * Shop
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';

import ControlsShop from '../ControlsShop';
import FrameworksShop from '../FrameworksPage';
import DomainShop from '../DomainShop';

import Page404 from '../../components/Common/Page404';
import ControlFilter from '../../components/Store/ControlFilter';
import Pagination from '../../components/Common/Pagination';
import SelectOption from '../../components/Common/SelectOption';

class Shop extends React.PureComponent {
  componentDidMount() {
    document.body.classList.add('shop-page');
  }

  componentWillUnmount() {
    document.body.classList.remove('shop-page');
  }

  render() {
    const { controls, advancedFilters, filterControls } = this.props;
    const { totalControls, pageNumber, pages, order } = advancedFilters;

    const sortOptions = [
      { value: 0, label: 'Newest First' },
      { value: 1, label: 'Price High to Low' },
      { value: 2, label: 'Price Low to High' }
    ];

    return (
      <div className='shop'>
        <Row xs='12'>
          <Col
            xs='3'
            xs={{ size: 12, order: 1 }}
            sm={{ size: 12, order: 1 }}
            md={{ size: 12, order: 1 }}
            lg={{ size: 3, order: 1 }}
          >
            <ControlFilter
              totalControls={totalControls}
              pageNumber={pageNumber}
              filterControls={filterControls}
            />
          </Col>
          <Col
            xs='9'
            xs={{ size: 12, order: 2 }}
            sm={{ size: 12, order: 2 }}
            md={{ size: 12, order: 2 }}
            lg={{ size: 9, order: 2 }}
          >
            <Row className='align-items-center'>
              <Col
                xs='6'
                xs={{ size: 12, order: 1 }}
                sm={{ size: 12, order: 1 }}
                md={{ size: 5, order: 1 }}
                lg={{ size: 6, order: 1 }}
                className='text-center text-md-left mt-3 mt-md-0 mb-1 mb-md-0'
              >
                <b>Showing: </b>
                {`${
                  totalControls < 8
                    ? totalProducts
                    : 8 * pageNumber - 8 == 0
                    ? 1
                    : 8 * pageNumber - 8 + 1
                } – ${
                  totalControls < 8
                    ? totalControls
                    : 8 * pageNumber < totalControls
                    ? 8 * pageNumber
                    : totalControls
                } Controls of ${totalControls} controls`}
              </Col>
              <Col
                xs={{ size: 12, order: 2 }}
                sm={{ size: 12, order: 2 }}
                md={{ size: 2, order: 2 }}
                lg={{ size: 2, order: 2 }}
                className='text-right pr-0 d-none d-md-block'
              >
                <b>Sort by</b>
              </Col>
              <Col
                xs='4'
                xs={{ size: 12, order: 2 }}
                sm={{ size: 12, order: 2 }}
                md={{ size: 5, order: 2 }}
                lg={{ size: 4, order: 2 }}
              >
                <SelectOption
                  name={'sorting'}
                  value={{ value: order, label: sortOptions[order].label }}
                  options={sortOptions}
                  handleSelectChange={(n, v) => {
                    filterControls('sorting', n.value);
                  }}
                />
              </Col>
            </Row>
            <Switch>
              <Route exact path='/shop' component={ControlsShop} />
              <Route path='/shop/domain/:slug' component={DomainShop} />
              <Route path='/shop/framework/:slug' component={FrameworksShop} />
              <Route path='*' component={Page404} />
            </Switch>

            {totalProducts >= 8 && (
              <div className='d-flex justify-content-center text-center mt-4'>
                <Pagination
                  handlePagenationChangeSubmit={filterControls}
                  controls={controls}
                  pages={pages}
                  page={pageNumber}
                />
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    advancedFilters: state.control.advancedFilters
  };
};

export default connect(mapStateToProps, actions)(Shop);
