"use client";

import React, { Component } from "react";
import { usePathname } from "next/navigation";

type Props = {
  slot: string;
  client: string;
  format: string;
  index?: number;
};

declare const window: any;

class Ad extends Component<Props> {
  componentDidMount() {
    this.initAd();
  }

  initAd() {
    console.log("Init");
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div
        key={
          window.location.href.replace(/\//g, "-") +
          "-" +
          this.props.slot +
          "-" +
          this.props.index
        }
        className="w-full"
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={this.props.client}
          data-ad-slot={this.props.slot}
          data-ad-format={this.props.format}
          data-full-width-responsive="true"
        ></ins>
      </div>
    );
  }
}

export default Ad;
