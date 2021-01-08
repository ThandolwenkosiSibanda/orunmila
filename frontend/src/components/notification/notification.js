import React, { Component} from "react";

class Notification extends React.Component {

    render(){
       return (
        <li>
        <a href="#">
          <div className="details">
            <div className="user-title">Thabani Masawi</div>
            <div className="noti-details">{this.props.notificationText}</div>
            <div className="noti-date">Oct 10, 12:00 am</div>
          </div>
        </a>
        </li>
        

       );
    }
}





export default (Notification);