import {

  // REMOVE_IMPLEMENTERS,
  ASSESSMENT_FORM_CHANGE,
  SET_ASSESSMENT_FORM_ERRORS,
  ASSESSMENT_FORM_RESET,
  SET_ASSESSMENT_LOADING,
  SET_ASSESSMENTS_LOADING,
  SET_ASSESSMENT_SUBMITTING,
  SET_FORM_LOADING,
  SIGNUP_RESET,
  FETCH_ASSESSMENTS
} from './constants';


const initialState = {
  assessments: [],
  assessmentFormData: {

    implementer:'',
    framework: [] 
  },
  formErrors: {},



  isLoading: false,
  isAssessmentSubmitting: false,
  isAssessmentLoading: false
};

 

const assessmentReducer = (state = initialState, action) => {

  switch (action.type) {

    case FETCH_ASSESSMENTS:
      return {
        ...state,
        assessments: action.payload
      };


    case ASSESSMENT_FORM_CHANGE:
      return {
        ...state,
        assessmentFormData: { ...state.assessmentFormData, ...action.payload }
      };

    case SET_ASSESSMENT_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };

    case ASSESSMENT_FORM_RESET:
      return {
        ...state,
        assessmentFormData: {
 //modification
          framework: [],
          implementer: ''
        },
        formErrors: {}
      };




    case SET_ASSESSMENTS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case SET_ASSESSMENT_SUBMITTING:
      return {
        ...state,
        isFormSubmitting: action.payload
      };
      case SET_ASSESSMENT_LOADING:
        return {
          ...state,
          isLoading: action.payload
        };


   
    default:
      return state;
  }
};

 

export default assessmentReducer;