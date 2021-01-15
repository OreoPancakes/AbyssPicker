import React from "react";
import PropTypes from "prop-types";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import CharacterButton from "../CharacterButton";

import characters from "../../config/characterInfo";

class CharacterSelector extends React.Component {
  render() {
    let sortedCharNames = Object.entries(characters)
      .sort((a, b) => {
        if (a[1].rarity === b[1].rarity) {
          return a[0] < b[0] ? -1 : 1;
        }
        return a[1].rarity > b[1].rarity ? -1 : 1;
      })
      .map((entry) => entry[0]);

    return (
      <Container>
        <Row>
          {sortedCharNames.map((charName) => {
            let info = characters[charName];
            let isDeselected = !this.props.eligibleCharacters.has(charName);
            return (
              <div key={charName} className="p-2">
                <CharacterButton
                  name={charName}
                  charInfo={info}
                  isDeselected={isDeselected}
                  clickHandler={this.props.handleClickCharacter}
                ></CharacterButton>
              </div>
            );
          })}
        </Row>
      </Container>
    );
  }
}

CharacterSelector.propTypes = {
  eligibleCharacters: PropTypes.arrayOf(PropTypes.string),
  handleClickCharacter: PropTypes.func.isRequired,
};

export default CharacterSelector;
