import React, { Component } from "react";

export class ShopCards extends Component {
  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.props.shopResults, "\t", 2)}</pre>
      </div>
    );
  }
}

export default ShopCards;
