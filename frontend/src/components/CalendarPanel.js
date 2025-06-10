import React, { useState, useEffect } from 'react';

function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
  return new Date(d.setDate(diff));
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

export default function CalendarPanel({ calendarVM, groupId, activities, groupMembers, user }) {
  const [weekStart, setWeekStart] = useState(getStartOfWeek(new Date()));
  const [selectedActivity, setSelectedActivity] = useState({}); // { [date]: activityId }

  useEffect(() => {
    if (groupId) calendarVM.fetchSlots(groupId);
    // eslint-disable-next-line
  }, [groupId, weekStart]);

  if (!groupId) {
    return <div className="alert alert-info">Select a group to see calendar.</div>;
  }

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const handleSelect = (date, value) => {
    setSelectedActivity(prev => ({ ...prev, [date]: value }));
  };

  const handleAddToCalendar = (date) => {
    const activityId = selectedActivity[date];
    const activity = activities.find(a => a.id === activityId);
    if (activity) {
      calendarVM.createSlot(groupId, date, activity.description);
      setSelectedActivity(prev => ({ ...prev, [date]: '' }));
    }
  };

  // Helper to get slot for a date
  const getSlotForDate = (date) => calendarVM.slots.find(s => s.date === date);

  return (
    <div>
      <h2>Calendar</h2>
      <div className="mb-2 d-flex align-items-center">
        <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => setWeekStart(addDays(weekStart, -7))}>&lt; Prev</button>
        <span className="fw-bold">Week of {formatDate(weekStart)}</span>
        <button className="btn btn-outline-secondary btn-sm ms-2" onClick={() => setWeekStart(addDays(weekStart, 7))}>Next &gt;</button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="table table-bordered text-center align-middle" style={{ minWidth: 700 }}>
          <thead>
            <tr>
              {days.map((d, i) => (
                <th key={i}>{d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {days.map((d, i) => {
                const dateStr = formatDate(d);
                const slot = getSlotForDate(dateStr);
                return (
                  <td key={i} style={{ minWidth: 120 }}>
                    {slot ? (
                      <div>
                        {(() => {
                          const members = slot.members || [];
                          console.log('user:', user, 'members:', members);
                          return (
                            <>
                              <div className="mb-2">
                                Activity: <b>{slot.description}</b><br />
                                Members: {members.length > 0 ? members.map(m => m.nickname).join(', ') : 'None'}
                              </div>
                              {/* Debug log for Join button logic */}
                              {(() => {
                                const shouldShowJoin = user && !members.some(m => m.nickname === user.nickname);
                                console.log('[JoinButtonCheck]', {
                                  user,
                                  members,
                                  shouldShowJoin,
                                  slotId: slot._id,
                                  slotDescription: slot.description
                                });
                                return user && members.some(m => m.nickname === user.nickname) ? (
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => calendarVM.leaveSlot(slot._id)}
                                  >
                                    Leave
                                  </button>
                                ) : user && !members.some(m => m.nickname === user.nickname) && (
                                  <button
                                    className="btn btn-outline-success btn-sm"
                                    onClick={() => calendarVM.joinSlot(slot._id)}
                                  >
                                    Join
                                  </button>
                                );
                              })()}
                            </>
                          );
                        })()}
                      </div>
                    ) : (
                      <div>
                        <select className="form-select form-select-sm mb-1" value={selectedActivity[dateStr] || ''} onChange={e => handleSelect(dateStr, e.target.value)}>
                          <option value="">Select activity</option>
                          {activities && activities.map(a => (
                            <option key={a.id} value={a.id}>{a.description}</option>
                          ))}
                        </select>
                        <button className="btn btn-outline-secondary btn-sm" disabled={!selectedActivity[dateStr]} onClick={() => handleAddToCalendar(dateStr)}>Add to Calendar</button>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 