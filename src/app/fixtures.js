import React from 'react';
import { Inbox, CalendarToday, DateRange } from '@material-ui/icons';

export const taskFilters = [
  { key: 'INBOX', name: 'Inbox', icon: <Inbox />, color: '#246fe0' },
  { key: 'TODAY', name: 'Today', icon: <CalendarToday />, color: '#058527' },
  { key: 'UPCOMING', name: 'Upcoming', icon: <DateRange />, color: '#692fc2' },
];
