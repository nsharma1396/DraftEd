import React, { Component } from 'react';
import { Popup, Button, Icon, Modal, Image } from 'semantic-ui-react';
class ShowQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showPopup: false,
    }
  }
  handleOpen = () => this.setState({showPopup:true})
  handleClose = () => this.setState({showPopup:false})

  render() {
    if(!this.props.readOnly) {
      return(
        <Popup trigger={(
        	<span style={{cursor:'pointer',backgroundColor:this.props.quesData.color}} >
            {this.props.children}
           </span>
          )}
          on={'click'}
          wide='very'
          position="top center"
          flowing
          inverted
          hideOnScroll={true}
        >
          {this.props.quesData.text}
          &nbsp;&nbsp;
          <Button
            negative
            icon
            circular
            onClick={(e)=>{this.props.deleteQuesEntity(true)}}
          >
            <Icon name="erase"></Icon>
          </Button>
        </Popup>
      );
    }
    else {
      return(
        <span>
          <Popup trigger={(
            <span style={{cursor:'pointer',backgroundColor:this.props.quesData.color}} >
              {this.props.children}
             </span>
            )}
            on={'click'}
            wide='very'
            open={this.state.showPopup}
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            position="top center"
            flowing
            inverted
            hideOnScroll={true}
          >
            {this.props.quesData.text}
            &nbsp;&nbsp;
            <Button
              icon
              circular
              color="blue"
              onClick={()=>this.setState({showModal:true,showPopup:false})}
            >
              <Icon name="comments"></Icon>
            </Button>
            </Popup>

            <Modal
              open={this.state.showModal}
              closeOnDimmerClick={false}
              closeIcon
              onClose={()=>this.setState({showModal:false})}
            >
              <Modal.Header>Comments</Modal.Header>
              <Modal.Content image scrolling>
                <Image
                  size='medium'
                  src='https://www.w3schools.com/w3css/img_avatar3.png'
                  wrapped
                />          
                <Modal.Description>
                  <Modal.Header as="h1">{this.props.quesData.text}</Modal.Header>
                    <Modal.Header as="h2">Brendon Mccullum</Modal.Header>
                    <p>Whats up?</p>
                    <p>Whats up?</p>
                    <Modal.Header as="h2">Yuvraj Singh</Modal.Header>
                    <p>Whats up?</p>
                    <p>Whats up?</p>
                    <Modal.Header as="h2">Clique</Modal.Header>
                    <p>Whats up?</p>
                    <p>Whats up?</p>
                    <Modal.Header as="h2">CodeChef</Modal.Header>
                    <p>Whats up?</p>
                    <p>Whats up?</p>
                    <Modal.Header as="h2">CodeMonk</Modal.Header>
                    <p>Whats up?</p>
                    <p>Whats up?</p>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button primary>
                  Add Comment <Icon name='comment' />
                </Button>
              </Modal.Actions>
            </Modal>  
        </span>
      );
    }
  }
}


export default ShowQuestion;