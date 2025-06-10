// Basic Express server setup for Group Activity Scheduler
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Import and use routes
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const activityRoutes = require('./routes/activityRoutes');
const calendarRoutes = require('./routes/calendarRoutes');

app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/calendar', calendarRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/group-activity', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('Group Activity Scheduler Backend');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 