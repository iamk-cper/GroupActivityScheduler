import { useState, useEffect } from 'react';
import * as calendarService from '../services/calendarService';

export default function useCalendarViewModel(token) {
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setSlots([]);
    setError('');
  }, [token]);

  const fetchSlots = async (groupId) => {
    try {
      const groupSlots = await calendarService.getSlotsByGroup(groupId, token);
      setSlots(groupSlots);
      setError('');
    } catch (e) {
      setError('Failed to fetch calendar slots.');
    }
  };

  const createSlot = async (groupId, date, description) => {
    try {
      const slot = await calendarService.createSlot(groupId, date, description, token);
      setSlots(prev => [...prev, slot]);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  const setActivity = async (slotId, activityId) => {
    try {
      const slot = await calendarService.setActivity(slotId, activityId, token);
      setSlots(prev => prev.map(s => s.id === slotId ? slot : s));
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  const joinSlot = async (slotId) => {
    try {
      const slot = await calendarService.addMember(slotId, token);
      setSlots(prev => prev.map(s => s._id === slot._id ? slot : s));
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  const leaveSlot = async (slotId) => {
    try {
      const slot = await calendarService.removeMember(slotId, token);
      setSlots(prev => prev.map(s => s._id === slot._id ? slot : s));
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  return { slots, fetchSlots, createSlot, setActivity, joinSlot, leaveSlot, error };
} 