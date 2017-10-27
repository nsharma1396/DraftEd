import React from 'react';
import ShowQuestion from './ShowQuestion';

const showQuestionsEntity = (props) => {
  const quesData = props.contentState.getEntity(props.entityKey).getData();
  return (
    <ShowQuestion quesData={quesData}>{props.children}</ShowQuestion>
  );
};

export default showQuestionsEntity;