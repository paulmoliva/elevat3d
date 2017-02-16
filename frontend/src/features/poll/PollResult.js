import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from './d3Wrapper';

class PollResult extends Component {
  constructor(props) {
    super(props);

    this.renderResults = ::this.renderResults;
  }

  renderResults() {
    const results = this.props.results;
    const resultLines = [];

    for (var key in results) {
      if(key != 'name'){
          resultLines.push(<li key={key}>
            <span>{key}</span>: <span>{results[key]}</span>
          </li>);
      }
    };

    return resultLines;
  }

  render() {

    return (
      <div>
        <h3>Poll Results</h3>
        <ul>
          { this.renderResults() }
        </ul>
        <Chart results={this.props.results}/>
      </div>
    )
  }


}


const mapStateToProps = state => {
  const results = state.polls.results.votingData;

  return { results };
};

export default connect(
  mapStateToProps,
  {}
)(PollResult);
