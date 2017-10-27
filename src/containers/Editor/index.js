import React, { Component } from 'react';
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import { Container } from 'semantic-ui-react';

import {
  EditorState,
  convertToRaw,
  CompositeDecorator,
  Modifier } from 'draft-js';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton } from 'draft-js-buttons';

import randomMC from 'random-material-color';
import 'draft-js/dist/Draft.css';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import './main.css';

import question from '../../components/QuestionsSidebar/questions';
import findQuestionsEntity from '../../components/RetrieveQuestionsEntity/strategy';
import showQuestionsEntity from '../../components/RetrieveQuestionsEntity/component';


const staticToolbarPlugin = createToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
  ],
});

const { Toolbar } = staticToolbarPlugin;


const decorator = new CompositeDecorator([
  {
    strategy: findQuestionsEntity,
    component: showQuestionsEntity,
  },
]);


export default class MainEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(decorator),
      questionId: -1,
    };
    this.plugins = [
      staticToolbarPlugin,
    ];
    this.onChange = editorState => this.setState({ editorState });
    this.createQuestionsEntity = this.createQuestionsEntity.bind(this);
  }

  componentDidMount() {
    this.focus();
  }

  componentWillReceiveProps(next) {
    if (next.idSelected !== this.props.idSelected) {
      this.setState({ questionId: next.idSelected });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.questionId !== prevState.questionId) {
      const ques = this.state.questionId - 1;
      this.createQuestionsEntity(ques, 'MUTABLE');
    }
  }

  onClick() {
    this.focus();
    const selection = this.state.editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.props.toggled(true);
    }
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
    this.onChange(newState);
  }

  render() {
    return (
      <Container>
        <Toolbar />
        <button className="questions" onClick={() => this.onClick()}>
          Questionnaire
        </button>
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
          />
        </div>
        <pre className="pre">
          {JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()), null, 10)}
        </pre>
      </Container>
    );
  }
}
