import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthForm from './components/AuthForm';
import GroupPanel from './components/GroupPanel';
import ActivitiesPanel from './components/ActivitiesPanel';
import CalendarPanel from './components/CalendarPanel';
import useAuthViewModel from './viewmodels/useAuthViewModel';
import useGroupViewModel from './viewmodels/useGroupViewModel';
import useActivityViewModel from './viewmodels/useActivityViewModel';
import useCalendarViewModel from './viewmodels/useCalendarViewModel';

function App() {
  const auth = useAuthViewModel();
  const groupVM = useGroupViewModel(auth.token, auth.user);
  const activityVM = useActivityViewModel(auth.token);
  const calendarVM = useCalendarViewModel(auth.token);
  const [panel, setPanel] = useState('groups');
  const [selectedGroup, setSelectedGroup] = useState('');

  // Reset selectedGroup when user changes (login/logout)
  useEffect(() => {
    setSelectedGroup('');
  }, [auth.user]);

  if (!auth.token) {
    return <div className="container mt-4"><AuthForm auth={auth} /></div>;
  }

  return (
    <div className="container mt-4">
      <h1>Group Activity Scheduler</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <nav className="nav nav-pills">
          <button className={`nav-link${panel === 'groups' ? ' active' : ''}`} onClick={() => setPanel('groups')}>Groups</button>
          <button className={`nav-link${panel === 'activities' ? ' active' : ''}`} onClick={() => setPanel('activities')}>Activities</button>
          <button className={`nav-link${panel === 'calendar' ? ' active' : ''}`} onClick={() => setPanel('calendar')}>Calendar</button>
        </nav>
        <span>Logged in as <b>{auth.user?.nickname}</b> <button className="btn btn-sm btn-outline-danger ms-2" onClick={auth.logout}>Logout</button></span>
      </div>
      {panel === 'groups' && <GroupPanel groupVM={groupVM} user={auth.user} />}
      {panel === 'activities' && <>
        <ActivitiesPanel activityVM={activityVM} groupId={selectedGroup} user={auth.user} />
        <div className="mt-3">
          <label>Select Group for Activities: </label>
          <select className="form-select w-auto d-inline-block ms-2" value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}>
            <option value="">None</option>
            {groupVM.groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
        </div>
      </>}
      {panel === 'calendar' && <>
        <CalendarPanel 
          calendarVM={calendarVM} 
          groupId={selectedGroup} 
          groupMembers={groupVM.groups.find(g => g.id === selectedGroup)?.members}
          activities={activityVM.activities}
          user={auth.user}
        />
        <div className="mt-3">
          <label>Select Group for Calendar: </label>
          <select className="form-select w-auto d-inline-block ms-2" value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}>
            <option value="">None</option>
            {groupVM.groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
        </div>
      </>}
    </div>
  );
}

export default App; 