/**
 *
 * OrderPage
 *
 */

 import React from 'react';

 import { connect } from 'react-redux';
 
 import actions from '../../actions';
 
 import FrameworkDetails from '../../components/Manager/FrameworkDetails';
 import NotFound from '../../components/Common/NotFound';
 import LoadingIndicator from '../../components/Common/LoadingIndicator';
 
 class View extends React.PureComponent {
   componentDidMount() {
     const id = this.props.match.params.id;
     this.props.fetchFramework(id);
   }
 
   componentDidUpdate(prevProps) {
     if (this.props.match.params.id !== prevProps.match.params.id) {
       const id = this.props.match.params.id;
       this.props.fetchFramework(id);
     }
   }
 
   render() {
     const {
       history,
       framework,
       domains,
       user,
       isLoading,
      // cancelOrder,
    //    updateOrderItemStatus
     } = this.props;
 
     return (
       <div className='order-page'>
         {isLoading ? (
           <LoadingIndicator backdrop />
         ) : framework._id ? (
           <FrameworkDetails
             framework={framework}
             domains={domains}
             user={user}
            //  cancelOrder={cancelOrder}
            //  updateOrderItemStatus={updateOrderItemStatus}
            //  onBack={() => {
            //    if (window.location.toString().includes('success')) {
            //      history.push('/dashboard/framework');
            //    } else {
            //      history.goBack();
            //    }
            //  }}
           />
         ) : (
           <NotFound message='no framework found.' />
         )}
       </div>
     );
   }
 }
 
 const mapStateToProps = state => {
   return {
     user: state.account.user,
     framework: state.framework.framework,
     domains:state.framework.framework.domains,
     isLoading: state.order.isLoading
   };
 };
 
 export default connect(mapStateToProps, actions)(View);
 