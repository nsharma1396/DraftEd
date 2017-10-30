import React from 'react';
import ShowQuestion from './ShowQuestion';

const showQuestionsEntity = (props) => { 
  const quesData = props.contentState.getEntity(props.entityKey).getData();
  return (
    <ShowQuestion
      quesData={quesData}
      readOnly={props.readOnly}
      deleteQuesEntity={(bool) => {
        if(bool===true) {
          props.removeEntity(true,quesData.selection);
        }
      }}
      >
        {props.children}
      </ShowQuestion>
    );
}

export default showQuestionsEntity;