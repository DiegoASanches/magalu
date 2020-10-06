import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Button, FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';
import FavoriteButton from './../favorite-button/index';
import './style.scss';

class Filters extends Component {

  isFavorite = false;

  state = {
    name: '',
    exactMatch: false,
  };

  changeFilterByName = (event) => {
    this.setState({
      name: event.target.value,
    });
  }

  reset = () => {
    this.setState({ name: '' });
    this.props.onReset();
  }

  submit = (event) => {
    event.preventDefault();
    this.props.onApply();
  }

  changeExactMatchFlag = (event) => {
    this.setState({ exactMatch: event.target.checked })
  }

  onFilterFavorite(status) {
    if (!status) {
      this.reset();
    }
    this.props.favoriteFilter(status);
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <div className="row">
          <div className="col-md-4">
            <FormGroup controlId="filterByName">
              <ControlLabel>Nome</ControlLabel>
              <FormControl type="text"
                value={this.state.name}
                onChange={this.changeFilterByName} />
            </FormGroup>
            <div className="favorite-button">
              <FavoriteButton isFavorite={this.isFavorite} onLike={() => this.onFilterFavorite(true)} onUnlike={() => this.onFilterFavorite(false)} />
            </div>
            <div className="search-name">
              <Checkbox checked={this.state.exactMatch}
                onChange={this.changeExactMatchFlag}>
                Buscar por nome específico
                </Checkbox>
            </div>
          </div>
        </div>
        <ButtonToolbar>
          <Button type="reset" onClick={this.reset}>Limpar</Button>
          <Button type="submit" bsStyle="primary">Filtrar</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

Filters.propTypes = {
  onApply: PropTypes.func,
  onReset: PropTypes.func,
};

Filters.defaultProps = {
  onApply: () => { },
  onReset: () => { },
};


export default Filters;
