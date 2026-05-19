import React, { useState, useEffect } from "react";

export default function WorkoutChecklistApp() {

  // =========================
  // TELAS
  // =========================
  const [screen, setScreen] = useState("home");
  const [activeWorkout, setActiveWorkout] = useState(null);

  // =========================
  // DATA
  // =========================
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  // =========================
  // BIBLIOTECA
  // =========================
  const defaultLibrary = [

    // PEITO
    { name: "Supino reto barra", muscle: "Peito" },
    { name: "Supino inclinado halter", muscle: "Peito" },
    { name: "Crucifixo reto", muscle: "Peito" },
    { name: "Peck deck", muscle: "Peito" },

    // COSTAS
    { name: "Puxada frontal aberta", muscle: "Costas" },
    { name: "Remada baixa", muscle: "Costas" },
    { name: "Barra fixa", muscle: "Costas" },

    // PERNAS
    { name: "Agachamento livre", muscle: "Pernas" },
    { name: "Leg press", muscle: "Pernas" },
    { name: "Mesa flexora", muscle: "Pernas" },

    // OMBROS
    { name: "Desenvolvimento halter", muscle: "Ombros" },
    { name: "Elevação lateral", muscle: "Ombros" },

    // BÍCEPS
    { name: "Rosca direta", muscle: "Bíceps" },
    { name: "Rosca martelo", muscle: "Bíceps" },

    // TRÍCEPS
    { name: "Tríceps pulley", muscle: "Tríceps" },
    { name: "Tríceps corda", muscle: "Tríceps" },

    // CORE
    { name: "Prancha", muscle: "Core" },
    { name: "Abdominal supra", muscle: "Core" },

    // CARDIO
    { name: "Esteira", muscle: "Cardio" },
    { name: "Bicicleta", muscle: "Cardio" },
  ];

  // =========================
  // TREINOS PRONTOS
  // =========================
  const defaultWorkouts = {
    "Treino A - Peito e Tríceps": [
      {
        id: 1,
        name: "Supino reto barra",
        sets: 4,
        reps: 10,
      },
      {
        id: 2,
        name: "Supino inclinado halter",
        sets: 3,
        reps: 12,
      },
      {
        id: 3,
        name: "Tríceps pulley",
        sets: 3,
        reps: 12,
      },
    ],

    "Treino B - Costas e Bíceps": [
      {
        id: 4,
        name: "Puxada frontal aberta",
        sets: 4,
        reps: 10,
      },
      {
        id: 5,
        name: "Remada baixa",
        sets: 3,
        reps: 12,
      },
      {
        id: 6,
        name: "Rosca direta",
        sets: 3,
        reps: 12,
      },
    ],

    "Treino C - Pernas": [
      {
        id: 7,
        name: "Agachamento livre",
        sets: 4,
        reps: 10,
      },
      {
        id: 8,
        name: "Leg press",
        sets: 4,
        reps: 12,
      },
      {
        id: 9,
        name: "Mesa flexora",
        sets: 3,
        reps: 12,
      },
    ],

    "Treino D - Ombros e Core": [
      {
        id: 10,
        name: "Desenvolvimento halter",
        sets: 4,
        reps: 10,
      },
      {
        id: 11,
        name: "Elevação lateral",
        sets: 3,
        reps: 15,
      },
      {
        id: 12,
        name: "Prancha",
        sets: 3,
        reps: 60,
      },
    ],
  };

  // =========================
  // STATES
  // =========================
  const [library, setLibrary] = useState(() => {
    const saved = localStorage.getItem("library");
    return saved ? JSON.parse(saved) : defaultLibrary;
  });

  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem("workouts");
    return saved ? JSON.parse(saved) : defaultWorkouts;
  });

  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem("checked");
    return saved ? JSON.parse(saved) : {};
  });

  const [filter, setFilter] = useState("Todos");

  // =========================
  // SAVE
  // =========================
  useEffect(() => {
    localStorage.setItem("library", JSON.stringify(library));
  }, [library]);

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem("checked", JSON.stringify(checked));
  }, [checked]);

  // =========================
  // FUNÇÕES
  // =========================
  const addToWorkout = (exercise) => {

    const newExercise = {
      id: Date.now(),
      name: exercise.name,
      sets: 3,
      reps: 12,
    };

    setWorkouts({
      ...workouts,
      [activeWorkout]: [
        ...workouts[activeWorkout],
        newExercise,
      ],
    });
  };

  const removeExercise = (id) => {

    setWorkouts({
      ...workouts,
      [activeWorkout]: workouts[activeWorkout].filter(
        (exercise) => exercise.id !== id
      ),
    });
  };

  const updateExercise = (id, field, value) => {

    setWorkouts({
      ...workouts,
      [activeWorkout]: workouts[activeWorkout].map(
        (exercise) =>
          exercise.id === id
            ? { ...exercise, [field]: value }
            : exercise
      ),
    });
  };

  const toggleCheck = (id) => {

    setChecked({
      ...checked,
      [id]: !checked[id],
    });
  };

  const finishWorkout = () => {

    alert("Treino concluído 🔥");

    setChecked({});

    setScreen("home");
  };

  // =========================
  // FILTROS
  // =========================
  const muscles = [
    "Todos",
    ...new Set(library.map((exercise) => exercise.muscle)),
  ];

  const filteredLibrary = library.filter((exercise) => {

    if (filter === "Todos") return true;

    return exercise.muscle === filter;
  });

  // =========================
  // UI
  // =========================
  return (

    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-4 flex justify-center">

      <div className="w-full max-w-md">

        {/* HOME */}
        {screen === "home" && (

          <>
            <div className="mb-6">

              <p className="text-zinc-400 text-sm capitalize">
                {today}
              </p>

              <h1 className="text-4xl font-black mt-1">
                Treino do Rafa
              </h1>

              <p className="text-zinc-400 mt-2">
                Escolha seu treino do dia
              </p>

            </div>

            <div className="space-y-4">

              {Object.keys(workouts).map((workoutName) => (

                <button
                  key={workoutName}
                  onClick={() => {
                    setActiveWorkout(workoutName);
                    setScreen("workout");
                  }}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl p-5 text-left"
                >

                  <div className="text-2xl font-bold">
                    {workoutName}
                  </div>

                  <div className="text-zinc-400 text-sm mt-1">
                    {workouts[workoutName].length} exercícios
                  </div>

                </button>
              ))}
            </div>
          </>
        )}

        {/* WORKOUT */}
        {screen === "workout" && activeWorkout && (

          <>
            <button
              onClick={() => setScreen("home")}
              className="mb-4 text-zinc-400"
            >
              ← Voltar
            </button>

            <div className="mb-5">

              <h1 className="text-3xl font-black">
                {activeWorkout}
              </h1>

              <p className="text-zinc-400 mt-1">
                {
                  workouts[activeWorkout].filter(
                    (exercise) => checked[exercise.id]
                  ).length
                }
                {" / "}
                {workouts[activeWorkout].length}
                {" concluídos"}
              </p>

            </div>

            {/* EXERCÍCIOS */}
            <div className="space-y-3 mb-6">

              {workouts[activeWorkout].map((exercise) => (

                <div
                  key={exercise.id}
                  className="bg-zinc-800 border border-zinc-700 rounded-3xl p-4"
                >

                  <div className="flex justify-between items-start mb-3">

                    <div>

                      <div
                        className={`text-lg font-semibold ${
                          checked[exercise.id]
                            ? "line-through text-zinc-500"
                            : ""
                        }`}
                      >
                        {exercise.name}
                      </div>

                      <div className="text-zinc-400 text-sm mt-1">
                        {exercise.sets} séries • {exercise.reps} reps
                      </div>

                    </div>

                    <button
                      onClick={() => removeExercise(exercise.id)}
                      className="text-red-400 text-xl"
                    >
                      ✕
                    </button>

                  </div>

                  {/* INPUTS */}
                  <div className="flex gap-2 mb-3">

                    <input
                      type="number"
                      value={exercise.sets}
                      onChange={(e) =>
                        updateExercise(
                          exercise.id,
                          "sets",
                          Number(e.target.value)
                        )
                      }
                      className="w-1/2 p-2 rounded-xl bg-zinc-900"
                    />

                    <input
                      type="number"
                      value={exercise.reps}
                      onChange={(e) =>
                        updateExercise(
                          exercise.id,
                          "reps",
                          Number(e.target.value)
                        )
                      }
                      className="w-1/2 p-2 rounded-xl bg-zinc-900"
                    />

                  </div>

                  {/* BOTÃO CONCLUIR */}
                  <button
                    onClick={() => toggleCheck(exercise.id)}
                    className={`w-full p-3 rounded-2xl font-bold ${
                      checked[exercise.id]
                        ? "bg-green-500 text-black"
                        : "bg-zinc-700"
                    }`}
                  >

                    {checked[exercise.id]
                      ? "✔ Exercício concluído"
                      : "Concluir exercício"}

                  </button>

                </div>
              ))}
            </div>

            {/* FILTROS */}
            <div className="flex gap-2 overflow-auto mb-4">

              {muscles.map((muscle) => (

                <button
                  key={muscle}
                  onClick={() => setFilter(muscle)}
                  className={`px-3 py-1 rounded-xl whitespace-nowrap text-sm ${
                    filter === muscle
                      ? "bg-green-500 text-black"
                      : "bg-zinc-800"
                  }`}
                >

                  {muscle}

                </button>
              ))}
            </div>

            {/* BIBLIOTECA */}
            <div className="space-y-2 max-h-52 overflow-auto mb-6">

              {filteredLibrary.map((exercise, index) => (

                <div
                  key={index}
                  className="bg-zinc-800 rounded-2xl p-3 flex justify-between items-center"
                >

                  <div>

                    <div>{exercise.name}</div>

                    <div className="text-xs text-zinc-400">
                      {exercise.muscle}
                    </div>

                  </div>

                  <button
                    onClick={() => addToWorkout(exercise)}
                    className="bg-green-500 text-black w-10 h-10 rounded-xl font-bold"
                  >
                    +
                  </button>

                </div>
              ))}
            </div>

            {/* FINALIZAR */}
            <button
              onClick={finishWorkout}
              className="w-full bg-green-500 text-black p-4 rounded-3xl font-black text-lg"
            >

              Finalizar treino 🔥

            </button>

          </>
        )}

      </div>

    </div>
  );
}
