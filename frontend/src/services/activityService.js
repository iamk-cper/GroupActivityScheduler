const API_URL = '/api/activities';

export async function createActivity(description, duration, groupId, token) {
  const res = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ description, duration, groupId })
  });
  if (!res.ok) throw new Error('Create activity failed');
  return await res.json();
}

export async function likeActivity(activityId, token) {
  const res = await fetch(`${API_URL}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ activityId })
  });
  if (!res.ok) throw new Error('Like failed');
  return await res.json();
}

export async function dislikeActivity(activityId, token) {
  const res = await fetch(`${API_URL}/dislike`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ activityId })
  });
  if (!res.ok) throw new Error('Dislike failed');
  return await res.json();
}

export async function getActivities(groupId, token) {
  const res = await fetch(`${API_URL}/group/${groupId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch activities');
  return await res.json();
}

export async function deleteActivity(activityId, token) {
  const res = await fetch(`${API_URL}/${activityId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Delete activity failed');
  return await res.json();
} 