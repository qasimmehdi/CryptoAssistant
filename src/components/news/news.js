/* eslint-disable react-hooks/exhaustive-deps */
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import * as Actions from '../../store/actions';
import NewsTabNav from './news-tab-nav';

export default function NewsScreen() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const changeTitle = title => {
    return dispatch(Actions.Header({title: title}));
  };
  useEffect(() => {
    //do not do anything here make another useEffect if needed
    console.log('News', isFocused);
    if (isFocused) {
      changeTitle('News');
    }
  }, [isFocused]);
  return <NewsTabNav />;
}
