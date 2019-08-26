import React from 'react';
import logo from './logo.svg';
import './App.css';

interface AppState {
  meetings: any[]
}

const App: React.FC = () => {
  const [appState, setAppState] = React.useState<AppState>({
    meetings: []
  })

  React.useEffect(() => {
    // Request all meetings from Firebase
    const getMeetings = async () => {
      const response = await fetch('https://us-central1-quaker-maps.cloudfunctions.net/api/meetings')
      const meetingsObj = await response.json()
      const meetings = meetingsObj.meetings
      setAppState({ meetings })
    }
    getMeetings()
  }, [])

  return (
    <div className="App">
      {appState.meetings.map((meeting: any) => (
        <>
          <h1>{meeting.title}</h1>
          <a href={`https://${meeting.website}`}>
            <p>{meeting.website}</p>
          </a>
          <p>{meeting.phone}</p>
          <p>{meeting.address}</p>
          <p>{meeting.city}, {meeting.state} {meeting.zip}</p>
          <p>{meeting.worship_style}</p>
          <p>{meeting.yearly_meeting}</p>
          <p>{meeting.branch}</p>
          <p>{meeting.accessibility}</p>
        </>
      ))}
    </div>
  );
}

export default App;
