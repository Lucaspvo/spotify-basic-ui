import React from'react';
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import './search-text-input.css';

class SearchTextInput extends React.Component {
  render() {
    return (
      <InputGroup className="search-text-input">
        <FormControl
          value={this.props.searchInput}
          onChange={this.props.onChange}
          placeholder="Search for an artist..."
          aria-label="Search for an artist..."
          aria-describedby="search-input"
        />
        <InputGroup.Append>
          <InputGroup.Text id="search-input">
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

export default SearchTextInput;