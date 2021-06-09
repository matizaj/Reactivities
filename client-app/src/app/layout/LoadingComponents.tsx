import React from "react"
import { Dimmer, Image, Loader, Segment } from "semantic-ui-react";

const LoadingComponents = () => {
  return (
        <Dimmer active={true} inverted={true}>
            <Loader content='Loading...'/>
        </Dimmer>
  )
};

export default LoadingComponents;
