import React, { Component } from 'react';
import './events.styles.scss';

class Events extends Component {
  render() {
    return (
      <div className="eventPageContainer">
        <NewEvent />
        <NewEvent />
        <NewEvent />
        <NewEvent />
        <NewEvent />

      </div>
    );
  }
}

function NewEvent() {
  return (
    <div className="eventContainer">
      <h1 className="eventName">Event</h1>
      <div className="subheaderContainer">
        <h3 className="location">City, State</h3>
        <h3 className="date">Month, Days, Year</h3>
      </div>
      <p className="eventDetails">Details about event here.</p>
    </div>
  );
}

export default Events;
