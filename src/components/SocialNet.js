import React from "react";
import "./SocialNet.css";

export default function SocialNet(props) {

  return (
      <a target="_blank" href={props.href} className="socialNetworkLink"><img className="socialNetworkImg" src={props.src}></img></a>
  );
}
