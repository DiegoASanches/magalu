import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import FavoriteButton from './../favorite-button/index';
import { like, unlike, isFavorite } from './../../services/favorite.service';
import './style.scss';

class Character extends Component {

  state = {
    showModal: false,
  };

  constructor(props) {
    super(props);
    const { instance } = props;

    this.id = instance.id;
    this.name = instance.name;
    this.image = `${instance.thumbnail.path}.${instance.thumbnail.extension}`;
    this.description = !instance.description.length ? 'Sem Descrição...' :
      instance.description.length > 150 ?
        instance.description.substring(0, 150).split('').concat('...').join('') :
        instance.description;
    this.fullDescription = !instance.description.length ? 'Sem Descrição...' :
      instance.description;
    this.comics = instance.comics.items;
    this.series = instance.series.items;
    this.stories = instance.stories.items;
    this.detail = instance.urls.find(r => r.type === 'detail');
    this.wiki = instance.urls.find(r => r.type === 'wiki');
    this.comicLink = instance.urls.find(r => r.type === 'comiclink');
    this.isFavorite = isFavorite(this.id);
  }

  showDetails = (event) => {
    this.setState({ showModal: true });
  }

  hideDetails = (event) => {
    this.setState({ showModal: false });
  }

  onLike() {
    this.isFavorite = true;
    like(this.id);
  }

  onUnlike() {
    this.isFavorite = false;
    unlike(this.id);
  }

  render() {
    return (
      <div className="Character">
        <div className="text-center Character-name"><span className="h3">{this.state.isFavorite} {this.isFavorite} {this.name}</span></div>
        <div className="Character-image" style={{ backgroundImage: `url('${this.image}')` }} />
        <p className="Character-description">
          {this.description}
        </p>
        <button type="button" className="btn btn-primary btn-lg Character-link" onClick={this.showDetails}>Ver mais</button>
        <Modal show={this.state.showModal} onHide={this.hideDetails} dialogClassName="Character-modal">
          <Modal.Header closeButton>
            <Modal.Title>
              {this.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={this.image} alt={this.name} className="Character-modal-img img-circle " />
            <div className="Character-modal-desc">
              <h4>Descrição</h4>
              <p>{this.fullDescription}</p>
              {this.comicLink &&
                <a target="_blank" className="btn-link btn-block"
                  href={this.comicLink.url} rel="noopener noreferrer">
                  Ver informação no site da Marvel</a>
              }
            </div>
            <div class="fav-button">
              <FavoriteButton isFavorite={this.isFavorite} onLike={() => this.onLike()} onUnlike={() => this.onUnlike()} />
            </div>
            <Tabs defaultActiveKey={1} id="characterTabs" className="hidden-xs Character-modal-tabs">
              <Tab eventKey={1} title={`Filmes (${this.comics.length})`}>
                {this.comics.length ?
                  <ul className="list-inline">
                    {this.comics.map((c, i) => <li key={i}><span className="label label-default">{c.name}</span></li>)}
                  </ul> :
                  <p>Sem dados</p>
                }
              </Tab>
              <Tab eventKey={2} title={`Series (${this.series.length})`}>
                {this.series.length ?
                  <ul className="list-inline">
                    {this.series.map((c, i) => <li key={i}><span className="label label-default">{c.name}</span></li>)}
                  </ul> :
                  <p>Sem dados</p>
                }
              </Tab>
              <Tab eventKey={3} title={`Quadrinhos (${this.stories.length})`}>
                {this.stories.length ?
                  <ul className="list-inline">
                    {this.stories.map((c, i) => <li key={i}><span className="label label-default">{c.name}</span></li>)}
                  </ul> :
                  <p>Sem dados</p>
                }
              </Tab>
            </Tabs>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

Character.propTypes = {
  instance: PropTypes.object.isRequired,
};

export default Character;