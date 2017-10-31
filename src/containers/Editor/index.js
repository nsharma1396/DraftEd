import React, { Component } from 'react';
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import { Container, Button } from 'semantic-ui-react';

import {
  EditorState,
  convertToRaw,
  CompositeDecorator,
  Modifier,
  RichUtils } from 'draft-js';
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

export default class MainEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      questionId: -1,
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
    if (next.idSelected !== this.props.idSelected) {
      this.setState({ questionId: next.idSelected });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.questionId !== prevState.questionId) {
      const ques = this.state.questionId - 1;
      this.createQuestionsEntity(ques, 'MUTABLE');
    }
    if (this.state.read !== prevState.read && this.state.read === false) { this.focus(); }
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
      selection: this.state.editorState.getSelection(),
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

  removeEntity(bool, selection) {
    if (bool === true) {
      const newState = RichUtils.toggleLink(this.state.editorState, selection, null);
      const currentSelection = this.state.editorState.getSelection();
      const collapsed = selection.merge({
        anchorKey: currentSelection.getAnchorKey(),
        anchorOffset: currentSelection.getAnchorOffset(),
        focusOffset: currentSelection.getAnchorOffset(),
        focusKey: currentSelection.getAnchorKey(),
      });
      this.setState({ editorState: EditorState.forceSelection(newState, collapsed) });
    }
  }


  render() {
    const block = this.state.editorState.getCurrentContent().getBlocksAsArray();
    const selection = this.state.editorState.getSelection();
    return (
      <Container>
        <Toolbar />
        <Button
          onClick={() => this.onClick()}
          disabled={this.state.read}
          color="vk"
          content="Questionnaire"
          icon="help"
          labelPosition="right"
          circular
        />
        <Button
          onClick={() => this.handleDecorators()}
          content={this.state.read ? 'Editor Mode' : 'Reader Mode'}
          color={this.state.read ? 'teal' : 'green'}
          icon={this.state.read ? 'compose' : 'eye'}
          labelPosition="right"
          circular
        />
        <div style={{ display: 'flex' }}>
          <ol className="lines" role="presentation" style={{ listStylePosition: 'inside' }}>
            {[...Array(block.length)].map((i, j) => (
              <li
                key={block[j].key}
                style={{
                    color: block[j].key === selection.getFocusKey() ? 'red' : 'initial',
                  }}
              />
              ))}
          </ol>
          <div
            className="editor"
            role="presentation"
            onClick={() => this.focus()}
            style={{ flex: '1' }}
          >
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              plugins={this.plugins}
              ref={(element) => { this.editor = element; }}
              placeholder="Write a note..."
              readOnly={this.state.read}
            />
          </div>
        </div>
        <pre className="pre">
          {JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()), null, 10)}
        </pre>

      </Container>
    );
  }
}
