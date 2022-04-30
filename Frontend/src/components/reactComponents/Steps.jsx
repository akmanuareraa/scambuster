// This is a skeleton starter React component generated by Plasmic.
// This file is owned by you, feel free to edit as you see fit.
import * as React from "react";
import { useNavigate } from 'react-router-dom'

function Steps_(props, ref) {
  // Use PlasmicNavbar to render this component as it was
  // designed in Plasmic, by activating the appropriate variants,
  // attaching the appropriate event handlers, etc.  You
  // can also install whatever React hooks you need here to manage state or
  // fetch data.
  //
  // Props you can pass into PlasmicNavbar are:
  // 1. Variants you want to activate,
  // 2. Contents for slots you want to fill,
  // 3. Overrides for any named node in the component to attach behavior and data,
  // 4. Props to set on the root node.
  //
  // By default, we are just piping all NavbarProps here, but feel free
  // to do whatever works for you.
  
  let bar = props.bar
  console.log("bar",bar,props,ref);
  let navigate = useNavigate();
  return (

    <div className="column is-10 is-offset-1">
    
    <ul className="steps has-content-centered">
      <li className = {(bar == "create"? "steps-segment is-active is-clickable" : "steps-segment is-clickable")} onClick={() => navigate('/createnft')}>
        <span className="steps-marker"></span>
        <div className="steps-content">
          <p className="is-size-4">Create NFT</p>
          
        </div>
      </li>
      
      <li className = {(bar == "wallet"? "steps-segment is-active is-clickable" : "steps-segment is-clickable")} onClick={() => navigate('/wallet')}>
        <span className="steps-marker"></span>
        <div className="steps-content">
          <p className="is-size-4">Portfolio</p>
                  </div>
      </li>
      <li className = {(bar == "list"? "steps-segment is-active" : "steps-segment is-clickable")} >
        <span className="steps-marker"></span>
        <div className="steps-content">
          <p className="is-size-4">List NFT</p>
                  </div>
      </li>
      <li className = {(bar == "market"? "steps-segment is-active is-clickable" : "steps-segment is-clickable")} onClick={() => navigate('/marketplace')}>
        <span className="steps-marker"></span>
        <div className="steps-content">
          <p className="is-size-4">Marketplace</p>
          
        </div>
      </li>
      <li className = {(bar == "buy"? "steps-segment is-active" : "steps-segment is-clickable")} >
        <span className="steps-marker"></span>
        <div className="steps-content">
          <p className="is-size-4">Buy NFT</p>
          
        </div>
      </li>
      
    </ul>  </div>
  );
}

const Steps = React.forwardRef(Steps_);

export default Steps;