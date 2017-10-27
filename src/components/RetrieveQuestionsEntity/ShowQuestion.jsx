import React,{ Component } from 'react';
import { Popup } from 'semantic-ui-react';

export default class ShowQuestion extends Component {

  render() {
    return(
      <Popup trigger={(
      	<span style={{cursor:'pointer',backgroundColor:this.props.quesData.color}} >
          {this.props.children}
         </span>
        )}
        on={['click','hover']}
        wide='very'
        content={this.props.quesData.text}
        inverted
      />
    );
  }
}