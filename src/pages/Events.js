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
        <NewEvent />
      </div>
    );
  }
}

function NewEvent() {
  return (
    <div className="eventsContainer">
      <div className="eventContainer" />
    </div>
  );
}

export default Events;
