import React from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { Multiselect } from "multiselect-react-dropdown";

import characters from "../config/characterInfo";

class IncludedCharModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChars: this.props.selectedChars,
    };
  }

  updateSelectedChars = (newSelected) => {
    this.setState({
      selectedChars: newSelected.map((value) => value.name),
    });
  };

  renderBody() {
    let charOptions = Object.keys(characters)
      .sort()
      .map((charName, index) => {
        return {
          name: charName[0].toUpperCase() + charName.slice(1),
        };
      });

    return (
      <div>
        <Multiselect
          options={charOptions}
          displayValue="name"
          selectedValues={this.props.selectedChars.map((charName) => {
            return { name: charName };
          })}
          onSelect={(selected, pickedItem) =>
            this.updateSelectedChars(selected)
          }
          onRemove={(selected, pickedItem) =>
            this.updateSelectedChars(selected)
          }
        />
      </div>
    );
  }

  render() {
    return (
      <Modal show={true} onHide={this.props.handleCancel}>
        <Modal.Header>
          <Modal.Title>Select Auto-Included Characters</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.renderBody()}</Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-danger"
            block
            onClick={() => this.props.handleSave(this.state.selectedChars)}
          >
            Save
          </Button>
          <Button
            className="btn btn-secondary"
            block
            onClick={this.props.handleCancel}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

IncludedCharModel.propTypes = {
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  selectedChars: PropTypes.arrayOf(PropTypes.string),
};

export default IncludedCharModel;
