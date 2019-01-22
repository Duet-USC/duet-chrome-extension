import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import style from './MainSection.css';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

export default class MainSection extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
  }

  handleClearCompleted = () => {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted();
    }
  };

  handleShow = (filter) => {
    this.setState({ filter });
  };

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props;
    if (todos.length > 0) {
      return (
        <input
          className={style.toggleAll}
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={actions.completeAll}
        />
      );
    }
  }

  renderFooter(completedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted}
          onShow={this.handleShow}
        />
      );
    }
  }

  componentDidMount() {
    // Read current URL and isMatch from chrome.local.storage,
      // display custom popup message acordingly
      // Note: chrome.storage.local.[url, isMatch] are updated in chrome/extension/background/urlListener.js
    chrome.storage.local.get(['url', 'isMatch'], obj => {
      let currentURL = obj.url;

      // update URL
      this.setState({url: currentURL});

      // update popup message
      let match = obj.isMatch;
      if (match) {
        this.setState({
            popupMessage: "Hello! We've noticed that you're shopping for an item that a refugee family in Greece needs.\
              Care to donate?"
          });
      } else {
        this.setState({
            popupMessage: "Hello! You will be notified here for potential donation matches."
          });
      }
    });

  }

  render() {
    return (
      <section className={style.main}>
        <div>
          {this.state.popupMessage}
        </div>
        <div>
          Current URL: {this.state.url}
        </div>
      </section>
    );
  }
}
