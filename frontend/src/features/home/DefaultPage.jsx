import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {router, browserHistory} from 'react-router';
import { Hello, RedditList } from './index';
import * as actions from './redux/actions';
import PollsSvg from './PollsSvg';
// import Header from './header';

import Typist from 'react-typist';

const crypto = require('crypto');

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
        question: '',
        focus: false
    };
    this.handlePlusOne = ::this.handlePlusOne;
    this.handleMinusOne = ::this.handleMinusOne;
    this.handleReset = ::this.handleReset;
    this.handleFetchReddit = ::this.handleFetchReddit;
    this.handleChange = ::this.handleChange;
    this.handleSubmit = ::this.handleSubmit;
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  handlePlusOne() {
    this.props.actions.counterPlusOne();
  }

  handleMinusOne() {
    this.props.actions.counterMinusOne();
  }

  handleReset() {
    this.props.actions.resetCounter();
  }

  handleFetchReddit() {
    this.props.actions.fetchRedditReactjsList();
  }

  handleSubmit(e) {
    e.preventDefault();
    var token = crypto.randomBytes(6).toString('hex');
    browserHistory.push('/poll/' + token + '?' + $.param({name: this.state.question}))
  }

  handlePollSubmit(e) {
      e.preventDefault();
      browserHistory.push('/poll/' + $('.text').val())
  }

  handleClick() {
    browserHistory.push('get-started');
  }

  handleChange(e) {
      this.setState({question: e.target.value});
  }

  onFocus(e) {
      this.setState({focused: true});
  }

  onBlur(e) {
      this.setState({focused: false});
  }

  render() {
    const { count, fetchRedditReactjsListPending, redditReactjsList, fetchRedditReactjsListError } = this.props.home;
    let cursor = {
        show: true,
        blink: true,
        element: '|',
        hideWhenDone: true,
        hideWhenDoneDelay: 3000
    };
    let {question, focused} = this.state;
    let placeholder = (question && !focused) ? '' : 'What is your Question?';
    return (
      <div className="page-home">
          {((!window.currentUser) ?
            (
                <div className="page-home">
                    <div className="c c-splash">
                        <div className="c-temp">
                            <div className="hl-wrap">
                                <Typist className="hl hl-flushed" cursor={cursor} avgTypingDelay={20} stdTypingDelay={0} >
                                    Create polls for your people and see what your people say
                                </Typist>
                            </div>
                            <button onClick={this.handleClick} className="btn btn-primary">Get Started</button>
                        </div>

                        <div className="img-wrap">
                            <PollsSvg />
                        </div>
                    </div>
                </div>)
            :
            (<div className="dashboard">
				<div className="input input--hoshi">
					<input onFocus={this.onFocus} onBlur={this.onBlur} onChange={(e) => this.handleChange(e)} className="input__field input__field--hoshi" type="text" id="input-4" />
					<label className="input__label input__label--hoshi input__label--hoshi-color-1">
                        <span className="input__label-content input__label-content--hoshi">{placeholder}</span>
					</label>
				</div>
                <div className="c-btn">
                    <button onClick={this.handleSubmit} className="btn btn-primary">Post</button>
                </div>
            </div>
            )
          )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
