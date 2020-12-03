import { observer } from 'mobx-react';
import React from 'react';
import ChatViewModel from '../viewModels/ChatViewModel';
import ChatButtonComponent from './ChatButtonComponent';
import ChatInputComponent from './ChatInputComponent';
import MessageBoxComponent from './MessageBoxComponent';
import TypingLoadingComponent from './TypingLoadingComponent';

@observer
export default class ChatComponent extends React.Component {
  constructor(props) {
    super(props);
    this.model = ChatViewModel;
    this.props = props;

    // binds
    this.submit = this.submit.bind(this);
    this.submitActionButtons = this.submitActionButtons.bind(this);
  }
  async submit({ text }) {
    await this.model.userInput(text);
  }

  async submitActionButtons(value, text) {
    await this.model.userReactionButtons(value, text);
  }

  render() {
    return (
      <div id="chat">
        <div className="wrapper">
          <div className="chat-transcript">
            <div className="user-column">
              
			  {this.model.renderButtons && this.model.buttons.length > 0 ? (
                <>
                  {this.model.buttons.map(({ text, value }) => {
                    return (
                      <ChatButtonComponent
                        text={text}
                        value={value}
                        submit={this.submitActionButtons}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  {this.model.chatStates.userMessages.map(
                    ({ message, opacity, from }) => {
                      return (
                        <MessageBoxComponent
                          opacity={opacity}
                          text={message}
						  author={from}
                          withShadow
                        />
                      );
                    }
                  )}
                </>
              )}
			  {this.model.chatStates.typing && <TypingLoadingComponent />}
            </div>
          </div>
          <div className="input-row">
            {(!this.model.renderButtons || this.model.buttons.length === 0) && (
              <ChatInputComponent
                disabled={this.model.chatStates.typing}
                submit={this.submit}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
