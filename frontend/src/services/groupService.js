const API_URL = '/api/groups';

export async function createGroup(name, token) {
  const res = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name })
  });
  if (!res.ok) throw new Error('Create group failed');
  return await res.json();
}

export async function inviteUser(groupId, nickname, token) {
  const res = await fetch(`${API_URL}/invite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ groupId, nickname })
  });
  if (!res.ok) throw new Error('Invite failed');
  return await res.json();
}

export async function getGroups(token) {
  const res = await fetch(`${API_URL}/all`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch groups');
  return await res.json();
}

export async function getInvitations(token) {
  const res = await fetch(`${API_URL}/invitations`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch invitations');
  return await res.json();
}

export async function acceptInvitation(groupId, token) {
  const res = await fetch(`${API_URL}/accept-invitation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ groupId })
  });
  if (!res.ok) throw new Error('Failed to accept invitation');
  return await res.json();
}

export async function rejectInvitation(groupId, token) {
  const res = await fetch(`${API_URL}/reject-invitation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ groupId })
  });
  if (!res.ok) throw new Error('Failed to reject invitation');
  return await res.json();
}

export async function getMyGroups(token) {
  const res = await fetch(`${API_URL}/mine`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch your groups');
  return await res.json();
} 