import React, { useCallback, useReducer } from "react";

import "./NewPlace.css";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/Input";
import Button from '../../shared/components/FormElements/Button';

const formReducer = (state, action) => {
  switch(action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for(const inputId in state.inputs) {
        if(inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        }
        else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
    },
    isValid: false
  })

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({type: 'INPUT_CHANGE', value, isValid, inputId: id})
  }, []); // useCallback -> this should rerender based on dependencies to make useEffect in Input not run again

  return (
    <form className="place-form">
      <Input
        element="input"
        type="input"
        id="title"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        element="textarea"
        label="Description"
        id="description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
