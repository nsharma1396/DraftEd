import React from 'react';
import { Popup, Button } from 'semantic-ui-react';

const ShowQuestion = props => {
  return(
    <Popup trigger={(
    	<span style={{cursor:'pointer',backgroundColor:props.quesData.color}} >
        {props.children}
       </span>
      )}
      on={'click'}
      wide='very'
      position="top center"
      flowing
      inverted
    >
      {props.quesData.text}
      &nbsp;&nbsp;
      <Button
        className="negative ui icon button"
        onClick={(e)=>{props.deleteQuesEntity(true)}}
      >
        <i className="trash icon"></i>
      </Button>
    </Popup>
  );
}


export default ShowQuestion;