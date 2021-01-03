/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Input, Text} from 'galio-framework';
import {COLOR} from './colors';
import {sharedStyles} from './shared.style';

export default function CustomInput(props) {
  const {style, validations, onChangeText, onValidation, ...props2} = props;
  const [error, setError] = useState('');
  const [text, setText] = useState('');
  const [fresh, setFresh] = useState(true);

  const handleChange = val => {
    setText(val);
    onChangeText && onChangeText(val);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!fresh) {
        validate(text);
      } else {
        setFresh(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  /* const handleBlur = () => {
    if (validateOnBlur) {
      validate();
      setValidateOnBlur(false);
    }
  }; */

  const validate = async (val = text) => {
    for (let i = 0; i < validations.length; i++) {
      if (!validations[i].regex.test(val)) {
        setError(validations[i].errMsg);
        onValidation && onValidation(false);
        break;
      } else {
        setError('');
        onValidation && onValidation(true);
      }
    }
  };

  return (
    <React.Fragment>
      <Input
        value={text}
        style={
          error !== ''
            ? {...style, ...sharedStyles.borderDanger}
            : {...style, ...sharedStyles.borderOk}
        }
        onChangeText={value => handleChange(value)}
        /* onBlur={() => handleBlur()} */
        {...props2}
      />
      <Text size={10} color={COLOR.RED}>
        {error}
      </Text>
    </React.Fragment>
  );
}
