import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import MapRender from "../../components/Map/MapRender";
import ShopCards from "../Shop/ShopCards";
import shopData from "../Shop/shop-data/shoplist-data.js";
import { Redirect } from "react-router-dom";

import checkIfInBounds from "../../lib/geolib";

export class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounds: null,
      shopResults: [],
      shopData: shopData,
      newShopData: false,
      initialRender: true
    };
    this.getMapBounds = this.getMapBounds.bind(this);
  }

  setInitialRender = cb => {
    this.setState({ initialRender: false }, cb);
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(this.state.shopResults);
  //   console.log(nextState.shopResults);
  //   if (this.state.shopResults === nextState.shopResults) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
  // componentDidMount() {
  //   this.setState({ location: this.props.location });
  // }
  //componentDidMount(){
  // fetch('shopData')
  //.then(response => response.json())
  // .then(data => this.setState({results: data.shopResults}))
  //1. fetch shops from db
  //2. setState with array of documents
  //}

  getMapBounds(center) {
    let shopsInBound = [];
    let mapCenter = {
      lat: center.lat(),
      lng: center.lng()
    };
    console.log(mapCenter);

    this.state.shopData.map(shop => {
      let shopLocation = {
        lat: parseFloat(shop.lat),
        lng: parseFloat(shop.lng)
      };
      if (checkIfInBounds(shopLocation, mapCenter)) {
        shopsInBound.push(shop);
      }
    });
    this.setState({ shopResults: shopsInBound });
  }

  render() {
    if (!this.props.location) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <MapRender
          location={this.props.location}
          getMapBounds={this.getMapBounds}
          shopData={shopData}
          initialRender={this.state.initialRender}
          setInitialRender={this.setInitialRender}
        />
        <ShopCards shopResults={this.state.shopResults} />
      </div>
    );
  }
}

export default Results;
