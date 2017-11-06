import React, { Component } from 'react';
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import { Container, Button, Popup } from 'semantic-ui-react';

import {
  EditorState,
  convertToRaw,
  CompositeDecorator,
  Modifier,
  RichUtils } from 'draft-js';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';

import randomMC from 'random-material-color';
import 'draft-js/dist/Draft.css';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import './main.css';


import question from '../../components/QuestionsSidebar/questions';
import findQuestionsEntity from '../../components/RetrieveQuestionsEntity/strategy';
import showQuestionsEntity from '../../components/RetrieveQuestionsEntity/component';

const staticToolbarPlugin = createToolbarPlugin({
  structure: [
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
  ],
});

const { Toolbar } = staticToolbarPlugin;

export default class MainEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      read: false,
    };

    this.plugins = [
      staticToolbarPlugin,
    ];
    this.onChange = editorState => this.setState({ editorState });
    this.createQuestionsEntity = this.createQuestionsEntity.bind(this);
    this.removeEntity = this.removeEntity.bind(this);
    this.handleDecorators = this.handleDecorators.bind(this);
  }

  componentWillMount() {
    const decorator = new CompositeDecorator([
      {
        strategy: findQuestionsEntity,
        component: showQuestionsEntity,
        props: {
          removeEntity: this.removeEntity,
          readOnly: this.state.read,
        },
      },
    ]);
    this.setState({ editorState: EditorState.set(this.state.editorState, { decorator }) });
  }

  componentDidMount() {
    this.focus();
  }

  componentWillReceiveProps(next) {
    if (next.idSelected !== -1 && next.changed) {
      const ques = next.idSelected - 1;
      this.createQuestionsEntity(ques, 'MUTABLE');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.read !== prevState.read && this.state.read === false) {
      this.onUpdate();
    }
  }

  onUpdate() {
    this.setState({ editorState: EditorState.moveFocusToEnd(this.state.editorState) });
  }

  onClick() {
    this.focus();
    const selection = this.state.editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.props.toggled(true);
    }
  }

  handleDecorators() {
    const decorator = new CompositeDecorator([
      {
        strategy: findQuestionsEntity,
        component: showQuestionsEntity,
        props: {
          removeEntity: this.removeEntity,
          readOnly: !this.state.read,
        },
      },
    ]);
    this.setState({
      editorState: EditorState.set(this.state.editorState, { decorator }),
      read: !this.state.read,
    });
  }

  focus() {
    this.editor.focus();
  }

  createQuestionsEntity(quesId, type) {
    const quesData = {
      id: quesId + 1,
      text: question[quesId].text,
      color: randomMC.getColor(),
    };
    const contentState = this.state.editorState.getCurrentContent();
    contentState.createEntity('QnA', type, quesData);
    const key = contentState.getLastCreatedEntityKey();
    const selection = this.state.editorState.getSelection();
    const newContent = Modifier.applyEntity(contentState, selection, key);
    const newState = EditorState.push(this.state.editorState, newContent, 'apply-entity');
    const collapsed = selection.merge({
      anchorKey: selection.getFocusKey(),
      anchorOffset: selection.getEndOffset(),
      focusOffset: selection.getEndOffset(),
    });
    this.setState({ editorState: EditorState.forceSelection(newState, collapsed) });
  }

  removeEntity(bool) {
    if (bool) {
      const currentSelection = this.state.editorState.getSelection();
      const currentContent = this.state.editorState.getCurrentContent();
      const position = currentSelection.getStartOffset();
      const currentBlock = currentContent.getBlockForKey(currentSelection.getStartKey());
      const entity = currentBlock.getEntityAt(position);
      let startUpdated = false;
      let newAnchor;
      let anchorOffset;
      let newFocus;
      let focusOffset;
      currentContent.getBlocksAsArray().forEach((block) => {
        block.findEntityRanges((character) => {
          const entityKey = character.getEntity();
          return entityKey === entity;
        }, (start, end) => {
          if (!startUpdated) {
            newAnchor = block.key;
            anchorOffset = start;
            startUpdated = true;
          }
          newFocus = block.key;
          focusOffset = end;
        });
      });
      const newSelection = currentSelection.merge({
        anchorKey: newAnchor,
        anchorOffset,
        focusOffset,
        focusKey: newFocus,
      });
      const newState = RichUtils.toggleLink(this.state.editorState, newSelection, null);
      const collapsed = currentSelection.merge({
        anchorKey: currentSelection.getAnchorKey(),
        anchorOffset: currentSelection.getAnchorOffset(),
        focusOffset: currentSelection.getAnchorOffset(),
        focusKey: currentSelection.getAnchorKey(),
      });
      this.setState({ editorState: EditorState.forceSelection(newState, collapsed) });
    }
  }

  render() {
    // const block = this.state.editorState.getCurrentContent().getBlocksAsArray();
    const selection = this.state.editorState.getSelection();
    return (
      <Container>
        <Button
          onClick={() => this.handleDecorators()}
          // content={this.state.read ? 'Editor Mode' : 'Reader Mode'}
          color={this.state.read ? 'teal' : 'green'}
          icon={this.state.read ? 'compose' : 'eye'}
          // labelPosition="right"
          circular
          floated="right"
        />
        <Toolbar />
        <div
          className="editor"
          role="presentation"
          onClick={() => this.focus()}
        >
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={this.plugins}
            ref={(element) => { this.editor = element; }}
            placeholder="Write a note..."
            readOnly={this.state.read}
            stripPastedStyles
          />
          <Popup
            trigger={
              <Button
                onClick={() => this.onClick()}
                color="vk"
                  // content="Questionnaire"
                icon="help"
                  // labelPosition="right"
                circular
                style={{ cursor: 'pointer', visibility: this.state.read || selection.isCollapsed() ? 'hidden' : 'visible' }}
              />
            }
            position="bottom center"
            content="Assign a question to the selected text"
          />
        </div>
        <pre className="pre">
          {selection.serialize()}<br /><br />
          {JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()), null, 10)}
        </pre>
      </Container>
    );
  }
}

