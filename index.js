const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let habits = [
  {
    id: 1,
    name: 'Drink Water',
    description: 'Drink 8 glasses of water',
    targetPerWeek: 7,
    createdAt: new Date().toISOString(),
  },
];

app.get('/habits', (request, response) => {
  response.json(habits);
});

app.listen(PORT, () => {
  console.log(`Habit Tracker API listening on port ${PORT}`);
});
