import { push } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_ASSESSMENTS,
  SET_ASSESSMENT_FORM_ERRORS,
  ASSESSMENT_FORM_RESET,
  ASSESSMENT_FORM_CHANGE,
  SET_ASSESSMENTS_LOADING,
  SET_ASSESSMENT_SUBMITTING,
  SET_ASSESSMENT_LOADING,
  SIGNUP_RESET
} from './constants';

import handleError from '../../utils/error';
import {
  formatSelectOptions,
  unformatSelectOptions
} from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';
import { signOut } from '../Login/actions';

export const assessmentFormChange = (name, value) => {

  let formData = {};
  formData[name] = value;

  return {
    type: ASSESSMENT_FORM_CHANGE,
    payload: formData
  };

};


export const startImplementaion = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        
        framework: 'required',
        implementer: 'required'
      };
      const assessment=getState().assessment.assessmentFormData;
      const implementers = getState().implementer.implementersSelect;
    //  const user = getState().account.user;
      const frameworks = getState().framework.frameworksSelect;

      // const framework = unformatSelectOptions([assessment.framework]);
      // const implementer = unformatSelectOptions([assessment.implementer]);

      const newAssessment = {

        framework: unformatSelectOptions(assessment.framework),
        implementer: unformatSelectOptions(assessment.implementer),
      };

 

      const { isValid, errors } = allFieldsValidation(newAssessment, rules, {
        'required.framework': 'Frameworks is required.',
        'required.implementer': 'Implementer is required.'
      });

 

      if (!isValid) {
        return dispatch({ type: SET_ASSESSMENT_FORM_ERRORS, payload: errors });
      }

 

      dispatch({ type: SET_ASSESSMENT_SUBMITTING, payload: true });
      dispatch({ type: SET_ASSESSMENT_LOADING, payload: true });

 

      const response = await axios.post(
        '/api/implementer/assignimplementiontask',
        newAssessment
      );

 

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

 

      dispatch({ type: ASSESSMENT_FORM_RESET });
      dispatch(success(successfulOptions));

    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_ASSESSMENT_SUBMITTING, payload: false });
      dispatch({ type: SET_ASSESSMENT_LOADING, payload: false });
    }
  };
};

 

export const fetchAssessments = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: SET_ASSESSMENTS_LOADING, payload: true });
      // const response = await axios.get(`/api/regulator/list`);

      // dispatch({
      //   type: FETCH_REGULATORS,
      //   payload: response.data.regulators
      // });

    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_ASSESSMENTS_LOADING, payload: false });
    }

  };

};


// delete regulator api

// export const deleteRegulator = id => {
//   return async (dispatch, getState) => {
//     try {
//       const response = await axios.delete(`/api/regulator/delete/${id}`);
//       const successfulOptions = {
//         title: `${response.data.message}`,
//         position: 'tr',
//        autoDismiss: 1
//       };

//       if (response.data.success == true) {
//         dispatch(success(successfulOptions));
//         dispatch({
//           type: REMOVE_REGULATORS,
//           payload: id
//         });
//       }
//     } catch (error) {
//       handleError(error, dispatch);
//     }
//   };
// };