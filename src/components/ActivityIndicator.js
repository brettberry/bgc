import React from 'react';
import Spinner from 'react-activity/lib/Spinner';
import 'react-activity/dist/react-activity.css';

export default function ActivityIndicator() {
  return (
    <Spinner color="#ebb052" size={32} speed={1} />
  );
}
