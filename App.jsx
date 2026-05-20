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
    { name: "Puxada pulley aberta", muscle: "Costas" },
    { name: "Puxada pulley fechada", muscle: "Costas" },
    { name: "Puxada com triângulo", muscle: "Costas" },
    { name: "Puxada articulada", muscle: "Costas" },
    { name: "Pulley costas", muscle: "Costas" },
    { name: "Pulldown", muscle: "Costas" },
    { name: "Barra fixa", muscle: "Costas" },
    { name: "Barra fixa supinada", muscle: "Costas" },
    { name: "Barra fixa pronada", muscle: "Costas" },
    { name: "Remada baixa", muscle: "Costas" },
    { name: "Remada baixa triângulo", muscle: "Costas" },
    { name: "Remada baixa aberta", muscle: "Costas" },
    { name: "Remada curvada", muscle: "Costas" },
    { name: "Remada unilateral", muscle: "Costas" },
    { name: "Remada máquina", muscle: "Costas" },
    { name: "Remada articulada", muscle: "Costas" },
    { name: "Remada cavalinho", muscle: "Costas" },
    { name: "Serrote", muscle: "Costas" },
    { name: "Levantamento terra", muscle: "Costas" },
    { name: "Rack pull", muscle: "Costas" },
    { name: "Pull over polia", muscle: "Costas" },
    { name: "Pull over halter", muscle: "Costas" },

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
      { id: 11, name: "Puxada com triângulo", sets: 4, reps: 12 },
      { id: 12, name: "Remada baixa triângulo", sets: 4, reps: 12 },
      { id: 13, name: "Remada cavalinho", sets: 3, reps: 12 },
      { id: 14, name: "Pulldown", sets: 3, reps: 15 },
      { id: 15, name: "Rosca direta", sets: 3, reps: 12 },
      { id: 16, name: "Rosca martelo", sets: 3, reps: 12 },
      { id: 17, name: "Rosca máquina", sets: 3, reps: 15 },
      { id: 18, name: "Bike ergométrica", sets: 1, reps: 15 },
    ],

    "Treino C - Pernas": [
      { id: 19, name: "Agachamento livre", sets: 4, reps: 10 },
      { id: 20, name: "Agachamento hack", sets: 4, reps: 12 },
      { id: 21, name: "Leg press 45", sets: 4, reps: 12 },
      { id: 22, name: "Cadeira extensora", sets: 3, reps: 15 },
      { id: 23, name: "Mesa flexora", sets: 3, reps: 12 },
      { id: 24, name: "Cadeira abdutora", sets: 3, reps: 15 },
      { id: 25, name: "Cadeira adutora", sets: 3, reps: 15 },
      { id: 26, name: "Panturrilha em pé", sets: 4, reps: 20 },
      { id: 27, name: "Escada", sets: 1, reps: 15 },
    ],

    "Treino D - Ombros e Core": [
      { id: 28, name: "Desenvolvimento halter", sets: 4, reps: 10 },
      { id: 29, name: "Elevação lateral", sets: 4, reps: 15 },
      { id: 30, name: "Elevação frontal", sets: 3, reps: 12 },
      { id: 31, name: "Face pull", sets: 3, reps: 15 },
      { id: 32, name: "Prancha", sets: 3, reps: 60 },
      { id: 33, name: "Abdominal supra", sets: 3, reps: 20 },
      { id: 34, name: "Abdominal infra", sets: 3, reps: 20 },
      { id: 35, name: "HIIT", sets: 1, reps: 12 },
    ],
  };

  const [library, setLibrary] = useState(() => {
    const saved = localStorage.getItem("library");
    return saved ? JSON.parse(saved) : defaultLibrary;
  });

  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem("workouts");
    return saved ? JSON.parse(saved) : defaultWorkouts;
  });

  const [checked, setChecked] = useState({});
  const [collapsed, setCollapsed] = useState({});
  const [filter, setFilter] = useState("Todos");

  useEffect(() => {
    localStorage.setItem("library", JSON.stringify(library));
  }, [library]);

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

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

    const confirmDelete = window.confirm(
      "Deseja remover este exercício?"
    );

    if (!confirmDelete) return;

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

    const isChecked = !checked[id];

    setChecked({
      ...checked,
      [id]: isChecked,
    });

    setCollapsed({
      ...collapsed,
      [id]: isChecked,
    });
  };

  const finishWorkout = () => {

    alert("Treino concluído 🔥");

    setChecked({});
    setCollapsed({});

    setScreen("home");
  };

  const muscles = [
    "Todos",
    ...new Set(library.map((exercise) => exercise.muscle)),
  ];

  const filteredLibrary = library.filter((exercise) => {

    if (filter === "Todos") return true;

    return exercise.muscle === filter;
  });

  return (

    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-4 flex justify-center">

      <div className="w-full max-w-md">

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
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl p-5 text-left hover:bg-zinc-700 transition"
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

            <div className="space-y-4 mb-8">

              {workouts[activeWorkout].map((exercise) => {

                const isChecked = checked[exercise.id];
                const isCollapsed = collapsed[exercise.id];

                return (

                  <div
                    key={exercise.id}
                    className={`rounded-3xl border transition-all duration-300 ${
                      isChecked
                        ? "bg-green-500/10 border-green-500"
                        : "bg-zinc-800 border-zinc-700"
                    }`}
                  >

                    <div
                      className="p-4 cursor-pointer"
                      onClick={() => {
                        if (isChecked) {
                          setCollapsed({
                            ...collapsed,
                            [exercise.id]: !isCollapsed,
                          });
                        }
                      }}
                    >

                      <div className="flex justify-between items-center">

                        <div>

                          <div
                            className={`text-lg font-semibold ${
                              isChecked
                                ? "line-through text-zinc-400"
                                : ""
                            }`}
                          >
                            {exercise.name}
                          </div>

                          <div className="text-zinc-400 text-sm mt-1">
                            {exercise.sets} séries • {exercise.reps} reps
                          </div>

                        </div>

                        <div className="flex items-center gap-3">

                          {isChecked && (
                            <span className="text-green-400 text-xl">
                              ✔
                            </span>
                          )}

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeExercise(exercise.id);
                            }}
                            className="text-red-400 text-xl"
                          >
                            ✕
                          </button>

                        </div>

                      </div>

                    </div>

                    {!isCollapsed && (

                      <div className="px-4 pb-4">

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
                            className="w-1/2 p-3 rounded-2xl bg-zinc-900"
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
                            className="w-1/2 p-3 rounded-2xl bg-zinc-900"
                          />

                        </div>

                        <button
                          onClick={() => toggleCheck(exercise.id)}
                          className={`w-full p-3 rounded-2xl font-bold transition ${
                            isChecked
                              ? "bg-green-500 text-black"
                              : "bg-zinc-700"
                          }`}
                        >

                          {isChecked
                            ? "Refazer exercício"
                            : "Concluir exercício"}

                        </button>

                      </div>
                    )}

                  </div>
                );
              })}
            </div>

            <div className="mb-5">

              <div className="flex gap-2 overflow-x-auto pb-2">

                {muscles.map((muscle) => (

                  <button
                    key={muscle}
                    onClick={() => setFilter(muscle)}
                    className={`px-4 py-2 rounded-2xl whitespace-nowrap text-sm font-semibold transition ${
                      filter === muscle
                        ? "bg-green-500 text-black"
                        : "bg-zinc-800 border border-zinc-700"
                    }`}
                  >

                    {muscle}

                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 max-h-72 overflow-auto mb-6 pr-1">

              {filteredLibrary.map((exercise, index) => (

                <div
                  key={index}
                  className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 flex justify-between items-center"
                >

                  <div>

                    <div className="font-semibold">
                      {exercise.name}
                    </div>

                    <div className="text-xs text-zinc-400 mt-1">
                      {exercise.muscle}
                    </div>

                  </div>

                  <button
                    onClick={() => addToWorkout(exercise)}
                    className="bg-green-500 hover:bg-green-400 transition text-black w-11 h-11 rounded-2xl font-black text-xl"
                  >
                    +
                  </button>

                </div>
              ))}
            </div>

            <button
              onClick={finishWorkout}
              className="w-full bg-green-500 text-black p-4 rounded-3xl font-black text-lg hover:bg-green-400 transition"
            >

              Finalizar treino 🔥

            </button>

          </>
        )}

      </div>

    </div>
  );
}
