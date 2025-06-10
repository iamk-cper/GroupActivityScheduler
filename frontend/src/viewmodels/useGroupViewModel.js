import { useState, useEffect } from 'react';
import * as groupService from '../services/groupService';

export default function useGroupViewModel(token, user) {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');
  const [invitations, setInvitations] = useState([]);
  const [inviteMessage, setInviteMessage] = useState('');

  const fetchGroups = async () => {
    try {
      const userGroups = await groupService.getMyGroups(token);
      setGroups(userGroups);
      setError('');
    } catch (e) {
      setError('Failed to fetch groups.');
    }
  };

  const fetchInvitations = async () => {
    try {
      const invs = await groupService.getInvitations(token);
      setInvitations(invs);
    } catch (e) {
      setInvitations([]);
    }
  };

  useEffect(() => {
    if (token && user) {
      fetchGroups();
      fetchInvitations();
    } else {
      setGroups([]);
      setInvitations([]);
      setError('');
      setInviteMessage('');
    }
    // eslint-disable-next-line
  }, [token, user]);

  const createGroup = async (name) => {
    try {
      const group = await groupService.createGroup(name, token);
      setGroups(prev => [...prev, group]);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  const inviteUser = async (groupId, nickname) => {
    try {
      await groupService.inviteUser(groupId, nickname, token);
      setInviteMessage('Invitation sent!');
      setError('');
    } catch (e) {
      setError(e.message);
      setInviteMessage('');
    }
  };

  const acceptInvitation = async (groupId) => {
    try {
      await groupService.acceptInvitation(groupId, token);
      fetchGroups();
      fetchInvitations();
    } catch (e) {
      setError('Failed to accept invitation.');
    }
  };

  const rejectInvitation = async (groupId) => {
    try {
      await groupService.rejectInvitation(groupId, token);
      fetchInvitations();
    } catch (e) {
      setError('Failed to reject invitation.');
    }
  };

  return { groups, createGroup, inviteUser, error, fetchGroups, invitations, inviteMessage, acceptInvitation, rejectInvitation };
} 