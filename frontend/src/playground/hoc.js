import React, { Component} from "react";
import ReactDOM  from 'react-dom';




// Higher Order Components - HOC
//1. A component that renders another component


//This is our regular Component
const MyLoad = (props)=>(
  <div>
      <h3>This is my Load</h3>
       <p>These are {props.quantity} of beans that i need transported to masvingo</p>
  </div>
);

//This is the regular function that returns The higher order component(HOC);
 const requireAunthentication = (WrappedComponent)=>{
   return (props)=>(
     <div>
     { props.isOwner ? (
         <WrappedComponent {...props}/>
       ):
      ( 
          <h3>Not Authorised</h3>
      ) 
    }

    </div>
   );
 } ;

 //This is how we call the function that returns a higher order component and then pass in our regular component.
 //We give the component a new Name and this is the name that we render to the screen.
const WithAuthMessage = requireAunthentication(MyLoad);


ReactDOM.render(<WithAuthMessage isOwner={true} quantity = "2 Tonnes" />, document.getElementById("app"));

