import React from 'react';
import Menu from './components/Menu';
import axios from 'axios';


class App extends React.Component {
  state = {deckId: "", currentCards: [], newGame: false}
  
  handleNewDeck = () => {
    this.getNewDeck();
  }

  handleDraw = async (deckId) => {
    this.setState({deckId: this.handleNewDeck.deck_id});
    let res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
  }

  getNewDeck = async () => {
    try {
      let res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      let deck_id = res.data.deck_id;
      this.setState({deckId: deck_id})
    } catch (err) {
      this.setState({deckId: ""});
      console.log(err);
    }
  }
  
  render() {
    return (
      <>
        <div className="App">
          <Menu />
          <button onClick={this.handleNewDeck}>Generate Deck</button>
        </div>
        <div>
            <label>
                Input Existing Deck: 
                <input type="text"/>
            </label>
            <button onClick={this.handleDraw}>Draw</button>
        </div>
      </>
    );
  }
}

export default App;
