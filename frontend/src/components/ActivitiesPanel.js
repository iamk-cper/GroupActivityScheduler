import React, { useState, useEffect } from 'react';

export default function ActivitiesPanel({ activityVM, groupId, user }) {
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(60);

  useEffect(() => {
    if (groupId) activityVM.fetchActivities(groupId);
    // eslint-disable-next-line
  }, [groupId]);

  const handleCreate = (e) => {
    e.preventDefault();
    activityVM.createActivity(description, duration, groupId);
    setDescription('');
    setDuration(60);
  };

  if (!groupId) return <div className="alert alert-info">Select a group to see activities.</div>;

  return (
    <div>
      <h2>Activities</h2>
      <form onSubmit={handleCreate} className="mb-3">
        <div className="input-group">
          <input className="form-control" value={description} onChange={e => setDescription(e.target.value)} placeholder="Activity description" required />
          <input type="number" className="form-control" value={duration} onChange={e => setDuration(Number(e.target.value))} min={1} max={480} required />
          <button className="btn btn-success" type="submit">Add Activity</button>
        </div>
      </form>
      {activityVM.error && <div className="alert alert-danger">{activityVM.error}</div>}
      <ul className="list-group">
        {activityVM.activities.map(a => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={a.id}>
            <span>{a.description} ({a.duration} min) by {a.createdBy}</span>
            <span>
              <button className="btn btn-outline-success btn-sm me-2" onClick={() => activityVM.likeActivity(a.id, groupId)}>+ {a.likes}</button>
              <button className="btn btn-outline-danger btn-sm me-2" onClick={() => activityVM.dislikeActivity(a.id, groupId)}>- {a.dislikes}</button>
              {user && a.createdBy === user.nickname && (
                <button className="btn btn-danger btn-sm" onClick={() => activityVM.deleteActivity(a.id, groupId)}>Delete</button>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
} 