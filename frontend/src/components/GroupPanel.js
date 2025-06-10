import React, { useState, useEffect } from 'react';

export default function GroupPanel({ groupVM, user }) {
  const [groupName, setGroupName] = useState('');
  const [inviteNickname, setInviteNickname] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');

  useEffect(() => {
    groupVM.fetchGroups();
    // eslint-disable-next-line
  }, [user]);

  const handleCreate = async (e) => {
    e.preventDefault();
    // Wait for group creation and fetch updated groups
    await groupVM.createGroup(groupName);
    await groupVM.fetchGroups();
    setGroupName('');
  };

  const handleInvite = (e) => {
    e.preventDefault();
    if (selectedGroup && inviteNickname) {
      groupVM.inviteUser(selectedGroup, inviteNickname);
      setInviteNickname('');
    }
  };

  return (
    <div>
      <h2>Groups</h2>
      <form onSubmit={handleCreate} className="mb-3">
        <div className="input-group">
          <input className="form-control" value={groupName} onChange={e => setGroupName(e.target.value)} placeholder="New group name" required />
          <button className="btn btn-success" type="submit">Create Group</button>
        </div>
      </form>
      <form onSubmit={handleInvite} className="mb-3">
        <div className="input-group">
          <select className="form-select" value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)} required>
            <option value="">Select group</option>
            {groupVM.groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
          <input className="form-control" value={inviteNickname} onChange={e => setInviteNickname(e.target.value)} placeholder="Invite by nickname" required />
          <button className="btn btn-primary" type="submit">Invite</button>
        </div>
      </form>
      {groupVM.inviteMessage && <div className="alert alert-success">{groupVM.inviteMessage}</div>}
      {groupVM.error && <div className="alert alert-danger">{groupVM.error}</div>}
      <ul className="list-group">
        {groupVM.groups.map(g => (
          <li className="list-group-item" key={g.id}>{g.name} (Members: {g.members && g.members.length > 0 ? g.members.join(', ') : ''})</li>
        ))}
      </ul>
      {groupVM.invitations && groupVM.invitations.length > 0 && (
        <div className="mt-4">
          <h4>Invitations</h4>
          <ul className="list-group">
            {groupVM.invitations.map(inv => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={inv.id}>
                {inv.name} (Members: {inv.members && inv.members.length > 0 ? inv.members.join(', ') : ''})
                <span>
                  <button className="btn btn-success btn-sm me-2" onClick={() => groupVM.acceptInvitation(inv.id)}>Accept</button>
                  <button className="btn btn-danger btn-sm" onClick={() => groupVM.rejectInvitation(inv.id)}>Reject</button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 