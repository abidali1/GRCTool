/**
 *
 * ControlPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import { BagIcon } from '../../components/Common/Icon';
import ControlReviews from '../../components/Store/ControlReviews';
import SocialShare from '../../components/Store/SocialShare';

class ControlPage extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchStoreControl(slug);
    this.props.fetchControlReviews(slug);
    document.body.classList.add('control-page');
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.fetchStoreControl(slug);
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('control-page');
  }

  render() {
    const {
      isLoading,
      control,
      controlShopData,
      shopFormErrors,
      itemsInCart,
      controlShopChange,
      handleAddToCart,
      handleRemoveFromCart,
      addControlReview,
      reviewsSummary,
      reviews,
      reviewFormData,
      reviewChange,
      reviewFormErrors
    } = this.props;

    return (
      <div className='control-shop'>
        {isLoading ? (
          <LoadingIndicator />
        ) : Object.keys(control).length > 0 ? (
          <>
            <Row className='flex-row'>
              <Col xs='12' md='5' lg='5' className='mb-3 px-3 px-md-2'>
                <div className='position-relative'>
                  <img
                    className='item-image'
                    src={`${
                      control.imageUrl
                        ? control.imageUrl
                        : '/images/placeholder-image.png'
                    }`}
                  />
                  {control.inventory <= 0 && !shopFormErrors['quantity'] ? (
                    <p className='stock out-of-stock'>Out of stock</p>
                  ) : (
                    <p className='stock in-stock'>In stock</p>
                  )}
                </div>
              </Col>
              <Col xs='12' md='7' lg='7' className='mb-3 px-3 px-md-2'>
                <div className='control-container'>
                  <div className='item-box'>
                    <div className='item-details'>
                      <h1 className='item-name one-line-ellipsis'>
                        {control.name}
                      </h1>
                      <p className='sku'>{control.sku}</p>
                      <hr />
                      {control.framework && (
                        <p className='by'>
                          see more from{' '}
                          <Link
                            to={`/shop/framework/${control.framework.slug}`}
                            className='default-link'
                          >
                            {control.framework.name}
                          </Link>
                        </p>
                      )}
                      <p className='item-desc'>{control.description}</p>
                      <p className='price'>${control.price}</p>
                    </div>
                    <div className='item-customize'>
                      <Input
                        type={'number'}
                        error={shopFormErrors['quantity']}
                        label={'Quantity'}
                        name={'quantity'}
                        decimals={false}
                        min={1}
                        max={control.inventory}
                        placeholder={'Control Quantity'}
                        disabled={
                          control.inventory <= 0 && !shopFormErrors['quantity']
                        }
                        value={controlShopData.quantity}
                        onInputChange={(name, value) => {
                          controlShopChange(name, value);
                        }}
                      />
                    </div>
                    <div className='my-4 item-share'>
                      <SocialShare control={control} />
                    </div>
                    <div className='item-actions'>
                      {itemsInCart.includes(control._id) ? (
                        <Button
                          variant='primary'
                          disabled={
                            control.inventory <= 0 &&
                            !shopFormErrors['quantity']
                          }
                          text='Remove From Bag'
                          className='bag-btn'
                          icon={<BagIcon />}
                          onClick={() => handleRemoveFromCart(control)}
                        />
                      ) : (
                        <Button
                          variant='primary'
                          disabled={
                            control.quantity <= 0 && !shopFormErrors['quantity']
                          }
                          text='Add To Bag'
                          className='bag-btn'
                          icon={<BagIcon />}
                          onClick={() => handleAddToCart(control)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <ControlReviews
              reviewFormData={reviewFormData}
              reviewFormErrors={reviewFormErrors}
              reviews={reviews}
              reviewsSummary={reviewsSummary}
              reviewChange={reviewChange}
              addReview={addControlReview}
            />
          </>
        ) : (
          <NotFound message='no control found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    control: state.control.storeControl,
    controlShopData: state.control.controlShopData,
    shopFormErrors: state.control.shopFormErrors,
    isLoading: state.control.isLoading,
    reviews: state.review.controlReviews,
    reviewsSummary: state.review.reviewsSummary,
    reviewFormData: state.review.reviewFormData,
    reviewFormErrors: state.review.reviewFormErrors,
    itemsInCart: state.cart.itemsInCart
  };
};

export default connect(mapStateToProps, actions)(ControlPage);
