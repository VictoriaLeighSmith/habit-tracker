const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let habits = [
  {
    id: 1,
    name: "Drink Water",
    description: "Drink 8 glasses of water",
    targetPerWeek: 7,
    createdAt: new Date().toISOString(),
  },
];

let checkins = [
  {
    id: 1,
    habitId: 1,
    date: new Date().toISOString().split("T")[0],
    completed: true,
  },
];

// ---------- GET /habits ----------
// Retrieve all habits.
app.get("/habits", (request, response) => {
  response.json(habits);
});

// ---------- GET /habits/:id ----------
// Retrieve a specific habit by id
app.get("/habits/:id", (request, response) => {
  const habitId = parseInt(request.params.id);
  const habit = habits.find((habit) => {
    return habit.id === habitId;
  });

  // If the habit was not found, display an error along with the id that could not be found.
  if (!habit) {
    return response
      .status(404)
      .json({ error: `No habit was found with the id: ${habitId}` });
  }

  response.json(habit);
});

// ---------- POST /habits ----------
app.post("/habits", (request, response) => {
  const { name, description, targetPerWeek } = request.body;

  // Check to make sure that name and target were all included in the request properly. If not, display an error.
  if (!name || targetPerWeek === undefined || isNaN(targetPerWeek)) {
    return response
      .status(400)
      .json({ error: "Name and target per week are required." });
  }

  // Otherwise, create a new habit with the given data
  const newHabit = {
    id: habits.length + 1,
    name,
    description,
    targetPerWeek,
    createdAt: new Date().toISOString(),
  };

  // Push the new habit to habits array, and show the user the newly created habit.
  habits.push(newHabit);
  response.status(201).json(newHabit);
});

// ---------- PUT /habits/:id ----------
app.put("/habits/:id", (request, response) => {
  const habitId = parseInt(request.params.id);
  const { name, description, targetPerWeek } = request.body;

  // Match the id in the request params to the existing habit ID
  const habitIndex = habits.findIndex((habit) => habit.id === habitId);

  // If the id of the habit doesn't exist in the habits array, display an error
  if (habitIndex === -1) {
    return response
      .status(404)
      .json({ error: `Habit with id ${habitId} not found` });
  }

  // Check to make sure that name and target were all included in the request properly. If not, display an error.
  if (!name || targetPerWeek === undefined || isNaN(targetPerWeek)) {
    return response
      .status(400)
      .json({ error: "Name and target per week are required" });
  }

  // Otherwise, replace the info for the habit that was indicated
  habits[habitIndex] = {
    id: habitId,
    name: name,
    description: description,
    targetPerWeek: targetPerWeek,
    createdAt: habits[habitIndex].createdAt,
  };

  return response.json(habits[habitIndex]);
});

// ---------- DELETE /habits/:id ----------
app.delete("/habits/:id", (request, response) => {
  const habitId = parseInt(request.params.id);
  const habitIndex = habits.findIndex((habit) => habit.id === habitId);

  // If the habit isn't found in the habits array, display an error
  if (habitIndex === -1) {
    return response
      .status(404)
      .json({ error: `Habit with id ${habitId} not found` });
  }

  // Store the deleted habit temporarily so the deleted habit can be displayed to the user
  const deletedHabit = habits[habitIndex].name;

  // Remove the specified habit, and update checkins to consist of all the checkins that do not have the habit id that was removed
  habits.splice(habitIndex, 1);
  checkins = checkins.filter((checkin) => checkin.habitId !== habitId);

  return response
    .status(200)
    .json({ message: `Habit ${deletedHabit} was deleted` });
});

// ---------- GET /habits/:id/checkins ----------
app.get("/habits/:id/checkins", (request, response) => {
  const habitId = parseInt(request.params.id);
  const habitIndex = habits.findIndex((habit) => habit.id === habitId);

  // If the habit isn't found in the habits array, display an error
  if (habitIndex === -1) {
    return response
      .status(404)
      .json({ error: `Habit with id ${habitId} not found` });
  }

  // Otherwise, find all of the checkins for the specified habit
  const habitCheckin = checkins.filter(
    (checkin) => checkin.habitId === habitId,
  );

  response.status(200).json(habitCheckin);
});

// ---------- POST /habits/:habitId/checkins ----------
app.post("/habits/:habitId/checkins", (request, response) => {
  const habitId = parseInt(request.params.habitId);
  let { completed, date } = request.body;
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

  // Match the id in the request params to the existing habit ID
  const habitIndex = habits.findIndex((habit) => habit.id === habitId);

  // If the id of the habit doesn't exist in the habits array, display an error
  if (habitIndex === -1) {
    return response
      .status(404)
      .json({ error: `Habit with id ${habitId} not found` });
  }

  // Set completed to true by default. Otherwise if the value provided is not a boolean, display an error
  if (completed === undefined) {
    completed = true;
  } else if (typeof completed !== "boolean") {
    return response
      .status(400)
      .json({ error: "Completed must be true or false" });
  }

  // Check to make sure user has given a valid date in YYYY-MM-DD format
  if (isNaN(Date.parse(date)) || !dateFormat.test(date)) {
    return response.status(400).json({
      error: `${date} is not a valid date (must be in YYYY-MM-DD format)`,
    });
  }

  // Otherwise, create a new checkin for the specified habit
  const newHabitCheckin = {
    id: checkins.length + 1,
    habitId: habitId,
    date: date,
    completed: completed,
  };

  checkins.push(newHabitCheckin);
  response.status(201).json(newHabitCheckin);
});

app.listen(PORT, () => {
  console.log(`Habit Tracker API listening on port ${PORT}`);
});
