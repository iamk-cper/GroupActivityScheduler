import { useState, useEffect } from 'react';
import * as activityService from '../services/activityService';

export default function useActivityViewModel(token) {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setActivities([]);
    setError('');
  }, [token]);

  const fetchActivities = async (groupId) => {
    try {
      const groupActivities = await activityService.getActivities(groupId, token);
      setActivities(groupActivities);
      setError('');
    } catch (e) {
      setError('Failed to fetch activities.');
    }
  };

  const createActivity = async (description, duration, groupId) => {
    try {
      await activityService.createActivity(description, duration, groupId, token);
      await fetchActivities(groupId); // Refresh the list to get fully populated data
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  const likeActivity = async (activityId, groupId) => {
    try {
      await activityService.likeActivity(activityId, token);
      await fetchActivities(groupId);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  const dislikeActivity = async (activityId, groupId) => {
    try {
      await activityService.dislikeActivity(activityId, token);
      await fetchActivities(groupId);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  const deleteActivity = async (activityId, groupId) => {
    try {
      await activityService.deleteActivity(activityId, token);
      await fetchActivities(groupId);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  return { activities, fetchActivities, createActivity, likeActivity, dislikeActivity, deleteActivity, error };
} 