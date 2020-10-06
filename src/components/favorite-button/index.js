import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class FavoriteButton extends Component {
    state = {
        iconClass: 'gray-heart',
        favorite: false,
        animate: false,
    };

    componentDidMount() {
        this.iconClass = this.favorite ? 'red-heart' : 'gray-heart';
        const value = this.props.isFavorite;
        this.setState({ favorite: value, animate: value });
    }

    onClickIcon = () => {
        const { favorite } = this.state;
        const favoriteValue = !favorite;
        this.setState({ animate: favoriteValue, favorite: favoriteValue });
        if (favoriteValue) {
            this.props.onLike('true');
        } else {
            this.props.onUnlike('true');
        }
    }

    render() {
        return <i onClick={this.onClickIcon} id="heart" className={`${this.state.iconClass} HeartAnimation ${this.state.animate ? 'animate' : ''}`}></i>
    }
}

FavoriteButton.propTypes = {
    onLike: PropTypes.func,
    onUnlike: PropTypes.func,
};