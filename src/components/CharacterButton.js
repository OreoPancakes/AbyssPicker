import React from "react";
import PropTypes from "prop-types";

import Image from "react-bootstrap/Image";

class CharacterButton extends React.Component {
  handleClick = () => {
    this.props.clickHandler(this.props.name, !this.props.isDeselected);
  };

  render() {
    let styleObj = {
      opacity: this.props.isDeselected ? 0.2 : 1.0,
    };
    return (
      <div>
        <Image
          width={125}
          height={125}
          src={this.props.charInfo.icon}
          onClick={this.handleClick}
          rounded={true}
          style={styleObj}
        ></Image>
        <div>{this.props.name[0].toUpperCase() + this.props.name.slice(1)}</div>
      </div>
    );
  }
}

CharacterButton.propTypes = {
  name: PropTypes.string.isRequired,
  isDeselected: PropTypes.bool,
  charInfo: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    element: PropTypes.string.isRequired,
    rarity: PropTypes.number.isRequired,
  }),
  clickHandler: PropTypes.func,
};

export default CharacterButton;
