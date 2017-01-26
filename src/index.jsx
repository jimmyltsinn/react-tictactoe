import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';

require("./style.css");

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

Square.propTypes = {
  value: React.PropTypes.string,
  onClick: React.PropTypes.func
};

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    // const status = 'Next player: ' + (calculateWinner(this.props.squares) ? '-' : this.props.xIsNext ? 'X' : 'O');
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  squares: React.PropTypes.array,
  onClick: React.PropTypes.func
};


class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: Immutable.List([{
        squares: Array(9).fill(null),
        xIsNext: true,
      }]).toArray()
    };
  }

  render() {
    const history = this.state.history;
    console.log(history[0]);
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status = winner ? ('Winner: ' + winner) : 'Next Player: ' + (current.xIsNext ? 'X' : 'O');

    const moves = history.map((step, id) => {
      const desc = id ? 'Move #' + id : 'Game Start';
      return (
        <li key={id}>
          <a href="#" onClick={() => this.jumpTo(id)}>{desc}</a>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  jumpTo(i) {
    this.setState({
      history: this.state.history.slice(0, i + 1)
    });
  }

  handleClick(i) {
    const current = this.state.history[this.state.history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = current.xIsNext ? 'X' : 'O';
    this.setState({
      history: Immutable.List(this.state.history).push({
        squares: squares,
        xIsNext: !current.xIsNext
      }).toArray()
    });
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('container')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
