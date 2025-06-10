const API_URL = '/api/calendar';

export async function createSlot(groupId, date, description, token) {
  const res = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ groupId, date, description })
  });
  if (!res.ok) throw new Error('Create slot failed');
  return await res.json();
}

export async function setActivity(slotId, activityId, token) {
  const res = await fetch(`${API_URL}/set-activity`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ slotId, activityId })
  });
  if (!res.ok) throw new Error('Set activity failed');
  return await res.json();
}

export async function addAvailableUser(slotId, token) {
  const res = await fetch(`${API_URL}/available`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ slotId })
  });
  if (!res.ok) throw new Error('Add available user failed');
  return await res.json();
}

export async function addMember(slotId, token) {
  const res = await fetch(`${API_URL}/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ slotId })
  });
  if (!res.ok) throw new Error('Join slot failed');
  return await res.json();
}

export async function removeMember(slotId, token) {
  const res = await fetch(`${API_URL}/leave`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ slotId })
  });
  if (!res.ok) throw new Error('Leave slot failed');
  return await res.json();
}

export async function getSlotsByGroup(groupId, token) {
  const res = await fetch(`${API_URL}/group/${groupId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch calendar slots');
  return await res.json();
} 