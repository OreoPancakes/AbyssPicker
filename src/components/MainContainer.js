import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import CharacterSelector from "./filters/CharacterSelector";
import ConfigureSettingsPanel from "./filters/ConfigureSettingsPanel";
import ResultsPanel from "./ResultsModal";

import characters from "../config/characterInfo";

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inPickMode: false,
      numChars: 0,
      eligibleCharacters: new Set(Object.keys(characters)),
      includedChars: [],
      results: {},
      isResultModalOpen: false,
    };
  }

  handleClickCharacter = (char, shouldDeselect) => {
    let newChars = new Set(this.state.eligibleCharacters);
    if (shouldDeselect) {
      newChars.delete(char);
    } else {
      newChars.add(char);
    }
    this.setState({ eligibleCharacters: newChars });
  };

  handleNumCharChange = (newNumChars) => {
    this.setState({ numChars: newNumChars });
  };

  setUsePickMode = (usePickMode) => {
    this.setState({ inPickMode: usePickMode });
  };

  updateIncludedChars = (newIncludedChars) => {
    this.setState({ includedChars: newIncludedChars });
  };

  closeResultsModal = () => {
    this.setState({ isResultModalOpen: false });
  };

  run = () => {
    if (
      this.state.numChars === 0 ||
      this.state.numChars < this.state.includedChars.length ||
      this.state.eligibleCharacters.size === 0
    ) {
      return;
    }
    let numStillNeeded = this.state.numChars - this.state.includedChars.length;
    let selectedChars = new Set(
      this.state.includedChars.map((name) => name.toLowerCase())
    );
    let eligibleChars = Array.from(this.state.eligibleCharacters);

    while (numStillNeeded > 0) {
      let randIndex = Math.floor(Math.random() * eligibleChars.length);
      let pickedChar = eligibleChars[randIndex];
      if (!selectedChars.has(pickedChar)) {
        selectedChars.add(pickedChar);
        numStillNeeded--;
      }
    }
    let results = {
      inPickMode: this.state.inPickMode,
      finalSelectedCharacters: Array.from(selectedChars),
    };
    this.setState({ results, isResultModalOpen: true });
  };

  renderResults() {
    return (
      <Row className="p-4 justify-content-md-center">
        <ResultsPanel
          results={this.state.results}
          onClose={this.closeResultsModal}
        ></ResultsPanel>
      </Row>
    );
  }

  render() {
    return (
      <Container className="p-4" fluid style={{ width: "80%" }}>
        <Row>
          <Col lg={4}>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Settings</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ConfigureSettingsPanel
                  includedChars={this.state.includedChars}
                  inPickMode={this.state.inPickMode}
                  numChars={this.state.numChars}
                  setUsePickMode={this.setUsePickMode}
                  handleNumCharChange={this.handleNumCharChange}
                  updateIncludedChars={this.updateIncludedChars}
                ></ConfigureSettingsPanel>
              </Modal.Body>
              <Modal.Footer>
                <Button className="btn btn-danger" block onClick={this.run}>
                  Run
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Col>
          <Col>
            <CharacterSelector
              eligibleCharacters={this.state.eligibleCharacters}
              handleClickCharacter={this.handleClickCharacter}
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-5">
          <Col className="text-center" xs="4"></Col>
        </Row>
        {this.state.isResultModalOpen &&
          Object.keys(this.state.results).length > 0 &&
          this.renderResults()}
      </Container>
    );
  }
}

export default MainContainer;
