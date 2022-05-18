import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import actions from '../../actions';
import Input from '../../components/Common/Input';
import SelectOption from '../../components/Common/SelectOption';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import makeAnimated from 'react-select/animated';

import AssignedImplementersList from '../../components/Manager/AssignedImplementersList';
import SubPage from '../../components/Manager/SubPage';

import NotFound from '../../components/Common/NotFound';
class FrameworkToImplement extends React.PureComponent {

  componentDidMount() {
    this.props.fetchFrameworksSelect(this);
    this.props.fetchImplementersSelect(this);
    this.props.fetchAssignedImplementers();
  }

  render() {
    const {
      user,
      assessmentFormData,
      formErrors,
      assessmentFormChange,
      startImplementaion,
      isSubmitting,
      frameworks,
      implementers,
      isALoading,
      isAssignedImpLoading,
      assignedImplementers,
      multi,
      regulator,
      defaultValue,
      value,
      label,
      disabled
    } = this.props;

    const handleSubmit = event => {
      event.preventDefault();
      startImplementaion();
    };

    return (
      <div className='sell'>
        {isALoading && <LoadingIndicator />}
        <h2>Choose the framework and the implementer</h2>
        <hr />
        <Row>
          <Col xs='12' md='8' className='order-2 order-md-1'>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col xs='12'>

              <SelectOption
              error={formErrors['framework']}
              label={'Select Frameworks'}
              multi={true}
              value={assessmentFormData.frameworks}
              options={frameworks}
              handleSelectChange={value => {
                assessmentFormChange('framework', value);
              }}
            />

                </Col>
                <Col xs='12'>
              <SelectOption
              error={formErrors['implementer']}
              label={'Select Implementers'}
              multi={true}
              value={assessmentFormData.implementers}
              options={implementers}
              handleSelectChange={value => {
                assessmentFormChange('implementer', value);
              }}
            />

                </Col>
                
              </Row>
              <hr />
              <div className='sell-actions'>
                <Button type='submit' text='Submit' disabled={isSubmitting} />
              </div>
              <hr />
            </form>
          </Col>
        </Row>

        <Row>
        <Col xs='12' md='8' className='order-2 order-md-1'>
        <SubPage title={'Assigned Frameworks'} isMenuOpen={null}>
          {isAssignedImpLoading ? (
            <LoadingIndicator inline />
          ) : assignedImplementers.length > 0 ? (
            <AssignedImplementersList
            assignedImplementers={assignedImplementers}
            />
          ) : (
            <NotFound message='nothing found.' />
          )}
        </SubPage>
        </Col>
        </Row>

      </div>

      

      
    );
  }
}

const mapStateToProps = state => {

  return {
    assessmentFormData: state.assessment.assessmentFormData,
    formErrors: state.assessment.formErrors,
    isSubmitting: state.assessment.isAssessmentSubmitting,
    isALoading: state.assessment.isAssessmentLoading,
    frameworks: state.framework.frameworksSelect,
    implementers:state.implementer.implementersSelect,
    assignedImplementers: state.implementer.assignedImplementers,
    isAssignedImpLoading: state.implementer.isAssignedImplementerLoading
  };

};


export default connect(mapStateToProps, actions)(FrameworkToImplement);