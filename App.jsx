import React, { useState, useEffect } from "react";

export default function WorkoutChecklistApp() {

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  // =========================
  // BIBLIOTECA DE EXERCÍCIOS
  // =========================
  const defaultLibrary = [

    // PEITO
    { name: "Supino reto barra", muscle: "Peito" },
    { name: "Supino reto halter", muscle: "Peito" },
    { name: "Supino inclinado barra", muscle: "Peito" },
    { name: "Supino inclinado halter", muscle: "Peito" },
    { name: "Crucifixo reto", muscle: "Peito" },
    { name: "Crucifixo inclinado", muscle: "Peito" },
    { name: "Peck deck", muscle: "Peito" },
    { name: "Crossover", muscle: "Peito" },

    // COSTAS
    { name: "Puxada frontal aberta", muscle: "Costas" },
    { name: "Puxada frontal fechada", muscle: "Costas" },
    { name: "Barra fixa", muscle: "Costas" },
    { name: "Remada baixa", muscle: "Costas" },
    { name: "Remada curvada", muscle: "Costas" },
    { name: "Pulldown", muscle: "Costas" },

    // PERNAS
    { name: "Agachamento livre", muscle: "Pernas" },
    { name: "Leg press", muscle: "Pernas" },
    { name: "Cadeira extensora", muscle: "Pernas" },
    { name: "Mesa flexora", muscle: "Pernas" },
    { name: "Stiff", muscle: "Pernas" },
    { name: "Panturrilha em pé", muscle: "Pernas" },

    // OMBROS
    { name: "Desenvolvimento halter", muscle: "Ombros" },
    { name: "Elevação lateral", muscle: "Ombros" },
    { name: "Elevação frontal", muscle: "Ombros" },

    // BÍCEPS
    { name: "Rosca direta", muscle: "Bíceps" },
    { name: "Rosca alternada", muscle: "Bíceps" },
    { name: "Rosca martelo", muscle: "Bíceps" },

    // TRÍCEPS
    { name: "Tríceps pulley", muscle: "Tríceps" },
    { name: "Tríceps corda", muscle: "Tríceps" },
    { name: "Tríceps francês", muscle: "Tríceps" },

    // CORE
    { name: "Prancha", muscle: "Core" },
    { name: "Abdominal supra", muscle: "Core" },
    { name: "Abdominal infra", muscle: "Core" },

    // CARDIO
    { name: "Esteira", muscle: "Cardio" },
    { name: "Bicicleta", muscle: "Cardio" },
    { name: "Escada", muscle: "Cardio" },
  ];

  // =========================
  // TREINOS
  // =========================
  const defaultWorkouts = {
    "Treino A": [],
    "Treino B": [],
    "Treino C": [],
    "Treino D": [],
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

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedWorkout, setSelectedWorkout] = useState("Treino A");
  const [filter, setFilter] = useState("Todos");
  const [newExercise, setNewExercise] = useState("");

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

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // =========================
  // FUNÇÕES
  // =========================
  const addExercise = () => {
    if (!newExercise.trim()) return;

    setLibrary([
      ...library,
      {
        name: newExercise,
        muscle: "Livre",
      },
    ]);

    setNewExercise("");
  };

  const addToWorkout = (exercise) => {
    setWorkouts({
      ...workouts,
      [selectedWorkout]: [
        ...workouts[selectedWorkout],
        {
          id: Date.now(),
          name: exercise.name,
          sets: 3,
          reps: 12,
        },
      ],
    });
  };

  const removeExercise = (id) => {
    setWorkouts({
      ...workouts,
      [selectedWorkout]: workouts[selectedWorkout].filter(
        (e) => e.id !== id
      ),
    });
  };

  const updateExercise = (id, field, value) => {
    setWorkouts({
      ...workouts,
      [selectedWorkout]: workouts[selectedWorkout].map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });
  };

  const toggleCheck = (id) => {
    setChecked({
      ...checked,
      [id]: !checked[id],
    });
  };

  const toggleFavorite = (name) => {
    if (favorites.includes(name)) {
      setFavorites(favorites.filter((f) => f !== name));
    } else {
      setFavorites([...favorites, name]);
    }
  };

  // =========================
  // FILTROS
  // =========================
  const muscles = [
    "Todos",
    "Favoritos",
    ...new Set(library.map((e) => e.muscle)),
  ];

  const filteredLibrary = library.filter((exercise) => {
    if (filter === "Todos") return true;

    if (filter === "Favoritos") {
      return favorites.includes(exercise.name);
    }

    return exercise.muscle === filter;
  });

  // =========================
  // PROGRESSO
  // =========================
  const completed =
    workouts[selectedWorkout]?.filter((e) => checked[e.id]).length || 0;

  const total = workouts[selectedWorkout]?.length || 0;

  const progress = total
    ? Math.round((completed / total) * 100)
    : 0;

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-4 flex justify-center">

      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="mb-5">
          <p className="text-zinc-400 capitalize text-sm">
            {today}
          </p>

          <h1 className="text-3xl font-black">
            Treino do Rafa
          </h1>

          <p className="text-zinc-400 text-sm mt-1">
            Progresso: {progress}%
          </p>
        </div>

        {/* SELECT TREINO */}
        <select
          value={selectedWorkout}
          onChange={(e) => setSelectedWorkout(e.target.value)}
          className="w-full p-3 rounded-xl bg-zinc-800 mb-4"
        >
          {Object.keys(workouts).map((w) => (
            <option key={w}>{w}</option>
          ))}
        </select>

        {/* FILTROS */}
        <div className="flex gap-2 overflow-auto mb-4">
          {muscles.map((m) => (
            <button
              key={m}
              onClick={() => setFilter(m)}
              className={`px-3 py-1 rounded-xl whitespace-nowrap text-sm ${
                filter === m
                  ? "bg-green-500 text-black"
                  : "bg-zinc-800"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* ADD EXERCÍCIO */}
        <div className="flex gap-2 mb-4">
          <input
            value={newExercise}
            onChange={(e) => setNewExercise(e.target.value)}
            placeholder="Novo exercício"
            className="flex-1 p-3 rounded-xl bg-zinc-800"
          />

          <button
            onClick={addExercise}
            className="bg-green-500 text-black px-4 rounded-xl font-bold"
          >
            +
          </button>
        </div>

        {/* BIBLIOTECA */}
        <div className="mb-5">

          <p className="text-zinc-400 text-sm mb-2">
            Biblioteca
          </p>

          <div className="space-y-2 max-h-60 overflow-auto">

            {filteredLibrary.map((exercise, index) => (

              <div
                key={index}
                className="bg-zinc-800 p-3 rounded-xl flex justify-between items-center"
              >

                <div>
                  <div>{exercise.name}</div>

                  <div className="text-xs text-zinc-400">
                    {exercise.muscle}
                  </div>
                </div>

                <div className="flex gap-2 items-center">

                  <button
                    onClick={() =>
                      toggleFavorite(exercise.name)
                    }
                    className="text-yellow-400 text-lg"
                  >
                    {favorites.includes(exercise.name)
                      ? "★"
                      : "☆"}
                  </button>

                  <button
                    onClick={() =>
                      addToWorkout(exercise)
                    }
                    className="text-green-400 text-xl"
                  >
                    +
                  </button>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TREINO */}
        <div className="space-y-3">

          {workouts[selectedWorkout].map((exercise) => (

            <div
              key={exercise.id}
              className="bg-zinc-800 p-3 rounded-xl"
            >

              <div className="flex justify-between items-center mb-2">

                <button
                  onClick={() =>
                    toggleCheck(exercise.id)
                  }
                  className="text-left flex-1"
                >
                  <div
                    className={
                      checked[exercise.id]
                        ? "line-through text-zinc-500"
                        : ""
                    }
                  >
                    {exercise.name}
                  </div>
                </button>

                <button
                  onClick={() =>
                    removeExercise(exercise.id)
                  }
                  className="text-red-400"
                >
                  ✕
                </button>

              </div>

              <div className="flex gap-2">

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
                  className="w-1/2 p-2 rounded bg-zinc-900"
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
                  className="w-1/2 p-2 rounded bg-zinc-900"
                />

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
     }
