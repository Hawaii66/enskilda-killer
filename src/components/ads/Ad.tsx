"use client";

import React, { Component } from "react";
import { usePathname } from "next/navigation";
import { toast } from "../ui/use-toast";

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
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      toast({
        title: "Error loading ads",
        description: "Please disable your ad blocker and try again.",
      });
    }
  }

  render() {
    return (
      <div
        key={
          (typeof window === "undefined"
            ? { location: { href: "" } }
            : window
          ).location.href.replace(/\//g, "-") +
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
