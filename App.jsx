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
  // BIBLIOTECA COMPLETA
  // =========================
  const defaultLibrary = [

    // PEITO
    { name: "Supino reto barra", muscle: "Peito" },
    { name: "Supino reto halter", muscle: "Peito" },
    { name: "Supino inclinado barra", muscle: "Peito" },
    { name: "Supino inclinado halter", muscle: "Peito" },
    { name: "Supino declinado", muscle: "Peito" },
    { name: "Supino máquina", muscle: "Peito" },
    { name: "Chest press", muscle: "Peito" },
    { name: "Crucifixo reto", muscle: "Peito" },
    { name: "Crucifixo inclinado", muscle: "Peito" },
    { name: "Crucifixo declinado", muscle: "Peito" },
    { name: "Peck deck", muscle: "Peito" },
    { name: "Crossover alto", muscle: "Peito" },
    { name: "Crossover médio", muscle: "Peito" },
    { name: "Crossover baixo", muscle: "Peito" },
    { name: "Flexão", muscle: "Peito" },
    { name: "Paralelas", muscle: "Peito" },

    // COSTAS
    { name: "Puxada frontal aberta", muscle: "Costas" },
    { name: "Puxada frontal fechada", muscle: "Costas" },
    { name: "Puxada neutra", muscle: "Costas" },
    { name: "Pulldown", muscle: "Costas" },
    { name: "Barra fixa", muscle: "Costas" },
    { name: "Remada baixa", muscle: "Costas" },
    { name: "Remada curvada", muscle: "Costas" },
    { name: "Remada unilateral", muscle: "Costas" },
    { name: "Remada cavalinho", muscle: "Costas" },
    { name: "Serrote", muscle: "Costas" },
    { name: "Levantamento terra", muscle: "Costas" },

    // PERNAS
    { name: "Agachamento livre", muscle: "Pernas" },
    { name: "Agachamento frontal", muscle: "Pernas" },
    { name: "Agachamento hack", muscle: "Pernas" },
    { name: "Hack squat", muscle: "Pernas" },
    { name: "Leg press 45", muscle: "Pernas" },
    { name: "Leg press horizontal", muscle: "Pernas" },
    { name: "Agachamento smith", muscle: "Pernas" },
    { name: "Afundo", muscle: "Pernas" },
    { name: "Passada", muscle: "Pernas" },
    { name: "Bulgarian split squat", muscle: "Pernas" },
    { name: "Cadeira extensora", muscle: "Pernas" },
    { name: "Mesa flexora", muscle: "Pernas" },
    { name: "Flexora sentado", muscle: "Pernas" },
    { name: "Stiff", muscle: "Pernas" },
    { name: "Terra romeno", muscle: "Pernas" },
    { name: "Agachamento sumô", muscle: "Pernas" },
    { name: "Panturrilha sentado", muscle: "Pernas" },
    { name: "Panturrilha em pé", muscle: "Pernas" },

    // GLÚTEOS
    { name: "Elevação pélvica", muscle: "Glúteos" },
    { name: "Hip thrust", muscle: "Glúteos" },
    { name: "Coice na polia", muscle: "Glúteos" },
    { name: "Glúteo máquina", muscle: "Glúteos" },
    { name: "Cadeira abdutora", muscle: "Glúteos" },
    { name: "Cadeira adutora", muscle: "Glúteos" },

    // OMBROS
    { name: "Desenvolvimento barra", muscle: "Ombros" },
    { name: "Desenvolvimento halter", muscle: "Ombros" },
    { name: "Desenvolvimento máquina", muscle: "Ombros" },
    { name: "Arnold press", muscle: "Ombros" },
    { name: "Elevação lateral", muscle: "Ombros" },
    { name: "Elevação frontal", muscle: "Ombros" },
    { name: "Crucifixo invertido", muscle: "Ombros" },
    { name: "Face pull", muscle: "Ombros" },
    { name: "Remada alta", muscle: "Ombros" },

    // BÍCEPS
    { name: "Rosca direta", muscle: "Bíceps" },
    { name: "Rosca alternada", muscle: "Bíceps" },
    { name: "Rosca martelo", muscle: "Bíceps" },
    { name: "Rosca concentrada", muscle: "Bíceps" },
    { name: "Rosca Scott", muscle: "Bíceps" },
    { name: "Rosca Scott máquina", muscle: "Bíceps" },
    { name: "Rosca máquina", muscle: "Bíceps" },

    // TRÍCEPS
    { name: "Tríceps pulley", muscle: "Tríceps" },
    { name: "Tríceps corda", muscle: "Tríceps" },
    { name: "Tríceps francês", muscle: "Tríceps" },
    { name: "Tríceps francês barra V", muscle: "Tríceps" },
    { name: "Tríceps testa", muscle: "Tríceps" },
    { name: "Tríceps banco", muscle: "Tríceps" },
    { name: "Tríceps unilateral", muscle: "Tríceps" },

    // CORE
    { name: "Prancha", muscle: "Core" },
    { name: "Prancha lateral", muscle: "Core" },
    { name: "Abdominal supra", muscle: "Core" },
    { name: "Abdominal infra", muscle: "Core" },
    { name: "Abdominal oblíquo", muscle: "Core" },
    { name: "Abdominal máquina", muscle: "Core" },
    { name: "Elevação de pernas", muscle: "Core" },

    // CARDIO
    { name: "Esteira caminhada", muscle: "Cardio" },
    { name: "Esteira corrida", muscle: "Cardio" },
    { name: "Bike ergométrica", muscle: "Cardio" },
    { name: "Escada", muscle: "Cardio" },
    { name: "Elíptico", muscle: "Cardio" },
    { name: "Remo", muscle: "Cardio" },
    { name: "HIIT", muscle: "Cardio" },

  ];

  // =========================
  // TREINOS PRONTOS
  // =========================
  const defaultWorkouts = {

    "Treino A - Peito e Tríceps": [
      { id: 1, name: "Supino reto barra", sets: 4, reps: 10 },
      { id: 2, name: "Supino inclinado halter", sets: 4, reps: 12 },
      { id: 3, name: "Crucifixo reto", sets: 3, reps: 12 },
      { id: 4, name: "Crossover médio", sets: 3, reps: 15 },
      { id: 5, name: "Peck deck", sets: 3, reps: 15 },
      { id: 6, name: "Tríceps pulley", sets: 3, reps: 12 },
      { id: 7, name: "Tríceps corda", sets: 3, reps: 15 },
      { id: 8, name: "Tríceps francês barra V", sets: 3, reps: 12 },
      { id: 9, name: "Esteira caminhada", sets: 1, reps: 20 },
    ],

    "Treino B - Costas e Bíceps": [
      { id: 10, name: "Puxada frontal aberta", sets: 4, reps: 10 },
      { id: 11, name: "Remada baixa", sets: 4, reps: 12 },
      { id: 12, name: "Remada cavalinho", sets: 3, reps: 12 },
      { id: 13, name: "Pulldown", sets: 3, reps: 15 },
      { id: 14, name: "Rosca direta", sets: 3, reps: 12 },
      { id: 15, name: "Rosca martelo", sets: 3, reps: 12 },
      { id: 16, name: "Rosca máquina", sets: 3, reps: 15 },
      { id: 17, name: "Bike ergométrica", sets: 1, reps: 15 },
    ],

    "Treino C - Pernas": [
      { id: 18, name: "Agachamento livre", sets: 4, reps: 10 },
      { id: 19, name: "Agachamento hack", sets: 4, reps: 12 },
      { id: 20, name: "Leg press 45", sets: 4, reps: 12 },
      { id: 21, name: "Cadeira extensora", sets: 3, reps: 15 },
      { id: 22, name: "Mesa flexora", sets: 3, reps: 12 },
      { id: 23, name: "Cadeira abdutora", sets: 3, reps: 15 },
      { id: 24, name: "Cadeira adutora", sets: 3, reps: 15 },
      { id: 25, name: "Panturrilha em pé", sets: 4, reps: 20 },
      { id: 26, name: "Escada", sets: 1, reps: 15 },
    ],

    "Treino D - Ombros e Core": [
      { id: 27, name: "Desenvolvimento halter", sets: 4, reps: 10 },
      { id: 28, name: "Elevação lateral", sets: 4, reps: 15 },
      { id: 29, name: "Elevação frontal", sets: 3, reps: 12 },
      { id: 30, name: "Face pull", sets: 3, reps: 15 },
      { id: 31, name: "Prancha", sets: 3, reps: 60 },
      { id: 32, name: "Abdominal supra", sets: 3, reps: 20 },
      { id: 33, name: "Abdominal infra", sets: 3, reps: 20 },
      { id: 34, name: "HIIT", sets: 1, reps: 12 },
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

  const [checked, setChecked] = useState({});

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
                Bora Treinar!!!
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
