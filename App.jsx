import React, { useState, useEffect, useRef } from "react";

// ─── VERSÃO DA BIBLIOTECA ────────────────────────────────────────────────────
// Aumente este número sempre que adicionar exercícios ao defaultLibrary
// O app vai fazer merge automático sem apagar customizações do usuário
const LIBRARY_VERSION = 3;

// ─── BIBLIOTECA COMPLETA ─────────────────────────────────────────────────────
const defaultLibrary = [
  // PEITO
  { name: "Supino reto barra", muscle: "Peito" },
  { name: "Supino reto halter", muscle: "Peito" },
  { name: "Supino inclinado barra", muscle: "Peito" },
  { name: "Supino inclinado halter", muscle: "Peito" },
  { name: "Supino declinado barra", muscle: "Peito" },
  { name: "Supino declinado halter", muscle: "Peito" },
  { name: "Supino fechado", muscle: "Peito" },
  { name: "Supino máquina", muscle: "Peito" },
  { name: "Supino máquina inclinado", muscle: "Peito" },
  { name: "Crucifixo reto", muscle: "Peito" },
  { name: "Crucifixo inclinado", muscle: "Peito" },
  { name: "Crucifixo declinado", muscle: "Peito" },
  { name: "Crucifixo máquina", muscle: "Peito" },
  { name: "Peck deck", muscle: "Peito" },
  { name: "Crossover alto", muscle: "Peito" },
  { name: "Crossover médio", muscle: "Peito" },
  { name: "Crossover baixo", muscle: "Peito" },
  { name: "Pull over halter", muscle: "Peito" },
  { name: "Pull over polia", muscle: "Peito" },
  { name: "Flexão", muscle: "Peito" },
  { name: "Flexão inclinada", muscle: "Peito" },
  { name: "Paralelas", muscle: "Peito" },

  // COSTAS
  { name: "Puxada frontal aberta", muscle: "Costas" },
  { name: "Puxada frontal fechada", muscle: "Costas" },
  { name: "Puxada neutra", muscle: "Costas" },
  { name: "Puxada triângulo", muscle: "Costas" },
  { name: "Puxada articulada", muscle: "Costas" },
  { name: "Barra fixa pronada", muscle: "Costas" },
  { name: "Barra fixa supinada", muscle: "Costas" },
  { name: "Barra fixa neutra", muscle: "Costas" },
  { name: "Remada baixa aberta", muscle: "Costas" },
  { name: "Remada baixa triângulo", muscle: "Costas" },
  { name: "Remada baixa corda", muscle: "Costas" },
  { name: "Remada curvada barra", muscle: "Costas" },
  { name: "Remada curvada supinada", muscle: "Costas" },
  { name: "Remada unilateral halter", muscle: "Costas" },
  { name: "Remada unilateral polia", muscle: "Costas" },
  { name: "Remada máquina", muscle: "Costas" },
  { name: "Remada articulada", muscle: "Costas" },
  { name: "Remada cavalinho", muscle: "Costas" },
  { name: "Serrote", muscle: "Costas" },
  { name: "Levantamento terra", muscle: "Costas" },
  { name: "Terra romeno", muscle: "Costas" },

  // PERNAS
  { name: "Agachamento livre", muscle: "Pernas" },
  { name: "Agachamento frontal", muscle: "Pernas" },
  { name: "Agachamento sumô", muscle: "Pernas" },
  { name: "Agachamento no smith", muscle: "Pernas" },
  { name: "Agachamento hack", muscle: "Pernas" },
  { name: "Leg press 45", muscle: "Pernas" },
  { name: "Leg press horizontal", muscle: "Pernas" },
  { name: "Afundo com halter", muscle: "Pernas" },
  { name: "Afundo com barra", muscle: "Pernas" },
  { name: "Passada", muscle: "Pernas" },
  { name: "Agachamento búlgaro", muscle: "Pernas" },
  { name: "Cadeira extensora", muscle: "Pernas" },
  { name: "Mesa flexora", muscle: "Pernas" },
  { name: "Flexora sentado", muscle: "Pernas" },
  { name: "Flexora deitado unilateral", muscle: "Pernas" },
  { name: "Stiff barra", muscle: "Pernas" },
  { name: "Stiff halter", muscle: "Pernas" },
  { name: "Panturrilha sentado", muscle: "Pernas" },
  { name: "Panturrilha em pé", muscle: "Pernas" },
  { name: "Panturrilha no leg press", muscle: "Pernas" },
  { name: "Abdução de quadril polia", muscle: "Pernas" },

  // GLÚTEOS
  { name: "Hip thrust barra", muscle: "Glúteos" },
  { name: "Hip thrust halter", muscle: "Glúteos" },
  { name: "Hip thrust máquina", muscle: "Glúteos" },
  { name: "Elevação pélvica no chão", muscle: "Glúteos" },
  { name: "Coice na polia", muscle: "Glúteos" },
  { name: "Coice na polia joelho dobrado", muscle: "Glúteos" },
  { name: "Glúteo máquina", muscle: "Glúteos" },
  { name: "Cadeira abdutora", muscle: "Glúteos" },
  { name: "Cadeira adutora", muscle: "Glúteos" },
  { name: "Afundo reverso", muscle: "Glúteos" },
  { name: "Agachamento sumô com halter", muscle: "Glúteos" },

  // OMBROS
  { name: "Desenvolvimento barra", muscle: "Ombros" },
  { name: "Desenvolvimento halter", muscle: "Ombros" },
  { name: "Desenvolvimento máquina", muscle: "Ombros" },
  { name: "Desenvolvimento Arnold", muscle: "Ombros" },
  { name: "Elevação lateral halter", muscle: "Ombros" },
  { name: "Elevação lateral polia", muscle: "Ombros" },
  { name: "Elevação lateral máquina", muscle: "Ombros" },
  { name: "Elevação frontal halter", muscle: "Ombros" },
  { name: "Elevação frontal barra", muscle: "Ombros" },
  { name: "Elevação frontal polia", muscle: "Ombros" },
  { name: "Crucifixo invertido halter", muscle: "Ombros" },
  { name: "Crucifixo invertido polia", muscle: "Ombros" },
  { name: "Crucifixo invertido máquina", muscle: "Ombros" },
  { name: "Face pull corda", muscle: "Ombros" },
  { name: "Remada alta barra", muscle: "Ombros" },
  { name: "Remada alta halter", muscle: "Ombros" },
  { name: "Remada alta polia", muscle: "Ombros" },

  // BÍCEPS
  { name: "Rosca direta barra", muscle: "Bíceps" },
  { name: "Rosca direta barra W", muscle: "Bíceps" },
  { name: "Rosca alternada halter", muscle: "Bíceps" },
  { name: "Rosca martelo halter", muscle: "Bíceps" },
  { name: "Rosca martelo polia", muscle: "Bíceps" },
  { name: "Rosca concentrada", muscle: "Bíceps" },
  { name: "Rosca Scott barra", muscle: "Bíceps" },
  { name: "Rosca Scott barra W", muscle: "Bíceps" },
  { name: "Rosca Scott máquina", muscle: "Bíceps" },
  { name: "Rosca máquina", muscle: "Bíceps" },
  { name: "Rosca polia alta", muscle: "Bíceps" },
  { name: "Rosca polia baixa", muscle: "Bíceps" },
  { name: "Rosca inversa barra", muscle: "Bíceps" },
  { name: "Rosca 21 barra", muscle: "Bíceps" },

  // TRÍCEPS
  { name: "Tríceps polia barra reta", muscle: "Tríceps" },
  { name: "Tríceps polia barra V", muscle: "Tríceps" },
  { name: "Tríceps polia corda", muscle: "Tríceps" },
  { name: "Tríceps polia unilateral", muscle: "Tríceps" },
  { name: "Tríceps francês barra", muscle: "Tríceps" },
  { name: "Tríceps francês barra W", muscle: "Tríceps" },
  { name: "Tríceps francês halter", muscle: "Tríceps" },
  { name: "Tríceps francês unilateral", muscle: "Tríceps" },
  { name: "Tríceps testa barra", muscle: "Tríceps" },
  { name: "Tríceps testa barra W", muscle: "Tríceps" },
  { name: "Tríceps testa halter", muscle: "Tríceps" },
  { name: "Tríceps coice halter", muscle: "Tríceps" },
  { name: "Tríceps coice polia", muscle: "Tríceps" },
  { name: "Tríceps banco", muscle: "Tríceps" },
  { name: "Tríceps máquina", muscle: "Tríceps" },
  { name: "Supino fechado tríceps", muscle: "Tríceps" },

  // CORE
  { name: "Prancha", muscle: "Core" },
  { name: "Prancha lateral", muscle: "Core" },
  { name: "Abdominal supra", muscle: "Core" },
  { name: "Abdominal infra", muscle: "Core" },
  { name: "Abdominal oblíquo", muscle: "Core" },
  { name: "Abdominal máquina", muscle: "Core" },
  { name: "Abdominal bicicleta", muscle: "Core" },
  { name: "Elevação de pernas suspenso", muscle: "Core" },
  { name: "Elevação de pernas deitado", muscle: "Core" },
  { name: "Roda abdominal", muscle: "Core" },
  { name: "Torção russa", muscle: "Core" },

  // CARDIO
  { name: "Esteira caminhada", muscle: "Cardio" },
  { name: "Esteira corrida", muscle: "Cardio" },
  { name: "Bike ergométrica", muscle: "Cardio" },
  { name: "Escada ergométrica", muscle: "Cardio" },
  { name: "Elíptico", muscle: "Cardio" },
  { name: "Remo ergométrico", muscle: "Cardio" },
  { name: "Pular corda", muscle: "Cardio" },
  { name: "HIIT esteira", muscle: "Cardio" },
];

// ─── TREINOS PADRÃO ──────────────────────────────────────────────────────────
const defaultWorkouts = {
  "Treino A — Peito e Tríceps": [
    { id: 1, name: "Supino reto barra", sets: 4, reps: 10 },
    { id: 2, name: "Supino inclinado halter", sets: 4, reps: 12 },
    { id: 3, name: "Crucifixo reto", sets: 3, reps: 12 },
    { id: 4, name: "Crossover médio", sets: 3, reps: 15 },
    { id: 5, name: "Peck deck", sets: 3, reps: 15 },
    { id: 6, name: "Tríceps pulley", sets: 3, reps: 12 },
    { id: 7, name: "Tríceps corda", sets: 3, reps: 15 },
    { id: 8, name: "Tríceps francês barra W", sets: 3, reps: 12 },
    { id: 9, name: "Esteira caminhada", sets: 1, reps: 20 },
  ],
  "Treino B — Costas e Bíceps": [
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
  "Treino C — Pernas": [
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
  "Treino D — Ombros e Core": [
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

// ─── MERGE VERSIONADO ────────────────────────────────────────────────────────
// Quando LIBRARY_VERSION aumenta, adiciona novos exercícios ao localStorage
// sem apagar customizações que o usuário já fez
function getMergedLibrary() {
  try {
    const savedVersion = Number(localStorage.getItem("libraryVersion") || "0");
    const savedLibrary = localStorage.getItem("library");

    if (!savedLibrary) {
      localStorage.setItem("libraryVersion", String(LIBRARY_VERSION));
      return defaultLibrary;
    }

    const parsed = JSON.parse(savedLibrary);

    if (savedVersion >= LIBRARY_VERSION) return parsed;

    // Merge: adiciona exercícios novos que ainda não existem
    const existingNames = new Set(parsed.map((e) => e.name));
    const newExercises = defaultLibrary.filter(
      (e) => !existingNames.has(e.name)
    );
    const merged = [...parsed, ...newExercises];

    localStorage.setItem("library", JSON.stringify(merged));
    localStorage.setItem("libraryVersion", String(LIBRARY_VERSION));
    return merged;
  } catch {
    return defaultLibrary;
  }
}

// ─── MUSCLE COLOR MAP ────────────────────────────────────────────────────────
const muscleColor = {
  Peito: "#f97316",
  Costas: "#3b82f6",
  Pernas: "#a855f7",
  Glúteos: "#ec4899",
  Ombros: "#14b8a6",
  Bíceps: "#eab308",
  Tríceps: "#ef4444",
  Core: "#22c55e",
  Cardio: "#06b6d4",
};

// ─── ICONS ───────────────────────────────────────────────────────────────────
const icons = {
  Peito: "🏋️",
  Costas: "🔙",
  Pernas: "🦵",
  Glúteos: "🍑",
  Ombros: "💪",
  Bíceps: "💪",
  Tríceps: "💪",
  Core: "⚡",
  Cardio: "🔥",
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function WorkoutApp() {
  const [screen, setScreen] = useState("home"); // home | workout | newWorkout
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [userName, setUserName] = useState(
    () => localStorage.getItem("userName") || ""
  );
  const [showNameModal, setShowNameModal] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const [library, setLibrary] = useState(getMergedLibrary);

  const [workouts, setWorkouts] = useState(() => {
    try {
      const saved = localStorage.getItem("workouts");
      return saved ? JSON.parse(saved) : defaultWorkouts;
    } catch {
      return defaultWorkouts;
    }
  });

  const [checked, setChecked] = useState({});
  const [collapsed, setCollapsed] = useState({});
  const [filter, setFilter] = useState("Todos");
  const [libSearch, setLibSearch] = useState("");
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Bom dia";
    if (h < 18) return "Boa tarde";
    return "Boa noite";
  })();

  // Persiste
  useEffect(() => {
    localStorage.setItem("library", JSON.stringify(library));
  }, [library]);

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    if (!userName) setShowNameModal(true);
  }, []);

  const saveName = () => {
    const n = nameInput.trim();
    if (!n) return;
    setUserName(n);
    localStorage.setItem("userName", n);
    setShowNameModal(false);
    setNameInput("");
  };

  // ── Treino ──────────────────────────────────────────────────────────────────
  const addToWorkout = (exercise) => {
    setWorkouts((prev) => ({
      ...prev,
      [activeWorkout]: [
        ...prev[activeWorkout],
        { id: Date.now(), name: exercise.name, sets: 3, reps: 12 },
      ],
    }));
  };

  const removeExercise = (id) => {
    setDeleteConfirm(null);
    setWorkouts((prev) => ({
      ...prev,
      [activeWorkout]: prev[activeWorkout].filter((e) => e.id !== id),
    }));
  };

  const updateExercise = (id, field, value) => {
    setWorkouts((prev) => ({
      ...prev,
      [activeWorkout]: prev[activeWorkout].map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    }));
  };

  const toggleCheck = (id) => {
    const next = !checked[id];
    setChecked((prev) => ({ ...prev, [id]: next }));
    setCollapsed((prev) => ({ ...prev, [id]: next }));
  };

  const deleteWorkout = (name) => {
    setWorkouts((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
    if (activeWorkout === name) setScreen("home");
  };

  const createWorkout = () => {
    const n = newWorkoutName.trim();
    if (!n || workouts[n]) return;
    setWorkouts((prev) => ({ ...prev, [n]: [] }));
    setNewWorkoutName("");
    setActiveWorkout(n);
    setScreen("workout");
  };

  const finishWorkout = () => {
    setChecked({});
    setCollapsed({});
    setScreen("home");
  };

  // ── Biblioteca filtrada ─────────────────────────────────────────────────────
  const muscles = ["Todos", ...new Set(library.map((e) => e.muscle))];

  const filteredLibrary = library.filter((e) => {
    const matchMuscle = filter === "Todos" || e.muscle === filter;
    const matchSearch =
      !libSearch || e.name.toLowerCase().includes(libSearch.toLowerCase());
    return matchMuscle && matchSearch;
  });

  const progress = activeWorkout
    ? workouts[activeWorkout]?.filter((e) => checked[e.id]).length || 0
    : 0;
  const total = activeWorkout ? workouts[activeWorkout]?.length || 0 : 0;
  const pct = total ? Math.round((progress / total) * 100) : 0;

  // ── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          -webkit-tap-highlight-color: transparent;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }

        .display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }

        .card {
          background: #141414;
          border: 1px solid #222;
          border-radius: 20px;
          transition: all 0.2s ease;
        }
        .card:hover { border-color: #333; background: #181818; }

        .card-checked {
          background: #0d1f0d;
          border-color: #22c55e44;
        }

        .btn-primary {
          background: #22c55e;
          color: #000;
          border: none;
          border-radius: 14px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .btn-primary:hover { background: #16a34a; transform: translateY(-1px); }
        .btn-primary:active { transform: translateY(0); }

        .btn-ghost {
          background: transparent;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          color: #aaa;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
          padding: 8px 14px;
        }
        .btn-ghost:hover { border-color: #444; color: #fff; }

        .pill {
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
          border: 1px solid transparent;
        }
        .pill-inactive {
          background: #1a1a1a;
          border-color: #2a2a2a;
          color: #888;
        }
        .pill-inactive:hover { border-color: #444; color: #ccc; }

        .input {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          padding: 10px 14px;
          outline: none;
          transition: border-color 0.15s;
          width: 100%;
        }
        .input:focus { border-color: #22c55e; }
        .input::placeholder { color: #555; }

        .progress-bar {
          height: 4px;
          background: #1e1e1e;
          border-radius: 2px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: #22c55e;
          border-radius: 2px;
          transition: width 0.4s ease;
        }

        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.85);
          display: flex; align-items: center; justify-content: center;
          z-index: 100; padding: 20px;
          backdrop-filter: blur(4px);
        }
        .modal {
          background: #141414;
          border: 1px solid #2a2a2a;
          border-radius: 24px;
          padding: 28px;
          width: 100%; max-width: 380px;
        }

        .muscle-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .fade-in {
          animation: fadeUp 0.3s ease;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .workout-card {
          position: relative;
          overflow: hidden;
        }
        .workout-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          border-radius: 0 2px 2px 0;
          background: var(--accent);
        }
      `}</style>

      {/* ── MODAL NOME ── */}
      {showNameModal && (
        <div className="modal-overlay">
          <div className="modal fade-in">
            <div style={{ fontSize: 40, marginBottom: 16 }}>👋</div>
            <h2
              className="display"
              style={{ fontSize: 32, color: "#fff", marginBottom: 8 }}
            >
              Qual é o seu nome?
            </h2>
            <p style={{ color: "#777", fontSize: 14, marginBottom: 24 }}>
              Vamos personalizar sua experiência
            </p>
            <input
              className="input"
              placeholder="Digite seu nome..."
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveName()}
              style={{ marginBottom: 12 }}
              autoFocus
            />
            <button
              className="btn-primary"
              onClick={saveName}
              style={{ width: "100%", padding: "14px" }}
            >
              Vamos treinar 💪
            </button>
          </div>
        </div>
      )}

      {/* ── MODAL CONFIRMAR DELETE ── */}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal fade-in">
            <p style={{ color: "#fff", marginBottom: 20, fontSize: 15 }}>
              Remover <strong>{deleteConfirm.name}</strong>?
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="btn-ghost"
                onClick={() => setDeleteConfirm(null)}
                style={{ flex: 1 }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (deleteConfirm.type === "exercise") {
                    removeExercise(deleteConfirm.id);
                  } else {
                    deleteWorkout(deleteConfirm.id);
                    setDeleteConfirm(null);
                  }
                }}
                style={{
                  flex: 1,
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── APP ── */}
      <div
        style={{
          minHeight: "100vh",
          background: "#0a0a0a",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: 440, padding: "0 16px 100px" }}>

          {/* ════════════════ HOME ════════════════ */}
          {screen === "home" && (
            <div className="fade-in">
              {/* Header */}
              <div
                style={{
                  padding: "48px 0 28px",
                  borderBottom: "1px solid #1a1a1a",
                  marginBottom: 28,
                }}
              >
                <p
                  style={{
                    color: "#555",
                    fontSize: 12,
                    textTransform: "capitalize",
                    marginBottom: 4,
                    letterSpacing: "0.08em",
                  }}
                >
                  {today}
                </p>
                <h1
                  className="display"
                  style={{ fontSize: 44, color: "#fff", lineHeight: 1.05 }}
                >
                  {greeting}
                  {userName && (
                    <span style={{ color: "#22c55e" }}>, {userName}</span>
                  )}
                  !
                </h1>
                <p style={{ color: "#555", fontSize: 14, marginTop: 8 }}>
                  Qual o treino de hoje?
                </p>
              </div>

              {/* Treinos */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {Object.entries(workouts).map(([name, exercises]) => {
                  const firstMuscle =
                    exercises[0] &&
                    library.find((l) => l.name === exercises[0].name)?.muscle;
                  const accent = muscleColor[firstMuscle] || "#22c55e";

                  return (
                    <div
                      key={name}
                      className="card workout-card"
                      style={{
                        "--accent": accent,
                        display: "flex",
                        alignItems: "center",
                        padding: "16px 14px 16px 24px",
                        gap: 10,
                      }}
                    >
                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 3 }}>
                          {name}
                        </div>
                        <div style={{ fontSize: 12, color: "#555" }}>
                          {exercises.length} exercício{exercises.length !== 1 ? "s" : ""}
                        </div>
                      </div>

                      {/* Iniciar */}
                      <button
                        onClick={() => {
                          setActiveWorkout(name);
                          setChecked({});
                          setCollapsed({});
                          setScreen("workout");
                        }}
                        style={{
                          background: accent + "18",
                          border: `1px solid ${accent}44`,
                          borderRadius: 10,
                          padding: "7px 13px",
                          fontSize: 12,
                          fontWeight: 700,
                          color: accent,
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                          flexShrink: 0,
                        }}
                      >
                        Iniciar →
                      </button>

                      {/* Lixeira */}
                      <button
                        onClick={() =>
                          setDeleteConfirm({ type: "workout", id: name, name })
                        }
                        style={{
                          background: "transparent",
                          border: "1px solid #2a2a2a",
                          borderRadius: 10,
                          color: "#444",
                          cursor: "pointer",
                          fontSize: 13,
                          padding: "7px 9px",
                          flexShrink: 0,
                          lineHeight: 1,
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#ef4444";
                          e.currentTarget.style.borderColor = "#ef444455";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#444";
                          e.currentTarget.style.borderColor = "#2a2a2a";
                        }}
                      >
                        🗑
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Novo treino */}
              <div style={{ marginTop: 20 }}>
                <p style={{ fontSize: 11, color: "#444", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 10 }}>
                  NOVO TREINO
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="input"
                    placeholder="Ex: Treino E — Glúteos"
                    value={newWorkoutName}
                    onChange={(e) => setNewWorkoutName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && createWorkout()}
                  />
                  <button
                    className="btn-primary"
                    onClick={createWorkout}
                    style={{
                      padding: "10px 18px",
                      borderRadius: 12,
                      flexShrink: 0,
                      fontSize: 20,
                      opacity: newWorkoutName.trim() ? 1 : 0.35,
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Editar nome */}
              <button
                className="btn-ghost"
                onClick={() => {
                  setNameInput(userName);
                  setShowNameModal(true);
                }}
                style={{ marginTop: 16, width: "100%" }}
              >
                ✏️ Editar meu nome
              </button>
            </div>
          )}

          {/* ════════════════ WORKOUT ════════════════ */}
          {screen === "workout" && activeWorkout && (
            <div className="fade-in">
              {/* Header */}
              <div style={{ padding: "32px 0 20px" }}>
                <button
                  onClick={() => setScreen("home")}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#666",
                    cursor: "pointer",
                    fontSize: 14,
                    marginBottom: 20,
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  ← Voltar
                </button>

                <h1
                  className="display"
                  style={{ fontSize: 36, color: "#fff", lineHeight: 1.1, marginBottom: 12 }}
                >
                  {activeWorkout}
                </h1>

                {/* Progress */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <span style={{ fontSize: 13, color: "#555" }}>
                    {progress} / {total} concluídos
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: pct === 100 ? "#22c55e" : "#777",
                    }}
                  >
                    {pct}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>

              {/* Lista de exercícios */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                {workouts[activeWorkout].map((exercise) => {
                  const isChecked = checked[exercise.id];
                  const isCollapsed = collapsed[exercise.id];
                  const muscle =
                    library.find((l) => l.name === exercise.name)?.muscle;
                  const accent = muscleColor[muscle] || "#22c55e";

                  return (
                    <div
                      key={exercise.id}
                      className={`card ${isChecked ? "card-checked" : ""}`}
                      style={{ overflow: "hidden" }}
                    >
                      {/* Header do card */}
                      <div
                        style={{
                          padding: "14px 14px 14px 16px",
                          cursor: isChecked ? "pointer" : "default",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          if (isChecked) {
                            setCollapsed((prev) => ({
                              ...prev,
                              [exercise.id]: !isCollapsed,
                            }));
                          }
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            {muscle && (
                              <div
                                className="muscle-dot"
                                style={{ background: accent }}
                              />
                            )}
                            <span
                              style={{
                                fontSize: 15,
                                fontWeight: 600,
                                color: isChecked ? "#555" : "#fff",
                                textDecoration: isChecked ? "line-through" : "none",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {exercise.name}
                            </span>
                          </div>
                          <div style={{ fontSize: 12, color: "#555", paddingLeft: 16 }}>
                            {exercise.sets} séries · {exercise.reps} reps
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 12 }}>
                          {isChecked && (
                            <span style={{ color: "#22c55e", fontSize: 16 }}>✓</span>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirm({
                                type: "exercise",
                                id: exercise.id,
                                name: exercise.name,
                              });
                            }}
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "#333",
                              cursor: "pointer",
                              fontSize: 14,
                              padding: "4px 6px",
                              borderRadius: 8,
                              transition: "color 0.15s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      {/* Detalhes */}
                      {!isCollapsed && (
                        <div
                          style={{
                            padding: "0 14px 14px",
                            borderTop: "1px solid #1e1e1e",
                          }}
                        >
                          <div style={{ display: "flex", gap: 8, margin: "12px 0 10px" }}>
                            <div style={{ flex: 1 }}>
                              <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 4 }}>
                                SÉRIES
                              </label>
                              <input
                                type="number"
                                className="input"
                                value={exercise.sets}
                                onChange={(e) =>
                                  updateExercise(exercise.id, "sets", Number(e.target.value))
                                }
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 4 }}>
                                REPS
                              </label>
                              <input
                                type="number"
                                className="input"
                                value={exercise.reps}
                                onChange={(e) =>
                                  updateExercise(exercise.id, "reps", Number(e.target.value))
                                }
                              />
                            </div>
                          </div>
                          <button
                            className="btn-primary"
                            onClick={() => toggleCheck(exercise.id)}
                            style={{
                              width: "100%",
                              padding: "11px",
                              background: isChecked ? "#1a3a1a" : "#22c55e",
                              color: isChecked ? "#22c55e" : "#000",
                              border: isChecked ? "1px solid #22c55e33" : "none",
                            }}
                          >
                            {isChecked ? "↩ Refazer" : "✓ Concluir exercício"}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* ─ Biblioteca ─ */}
              <div
                style={{
                  background: "#0f0f0f",
                  border: "1px solid #1e1e1e",
                  borderRadius: 20,
                  padding: 16,
                  marginBottom: 16,
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    color: "#555",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  ADICIONAR EXERCÍCIO
                </p>

                <input
                  className="input"
                  placeholder="Buscar exercício..."
                  value={libSearch}
                  onChange={(e) => setLibSearch(e.target.value)}
                  style={{ marginBottom: 10 }}
                />

                {/* Filtros */}
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    overflowX: "auto",
                    paddingBottom: 8,
                    marginBottom: 10,
                    scrollbarWidth: "none",
                  }}
                >
                  {muscles.map((m) => {
                    const active = filter === m;
                    const color = muscleColor[m] || "#22c55e";
                    return (
                      <button
                        key={m}
                        onClick={() => setFilter(m)}
                        className="pill"
                        style={
                          active
                            ? {
                                background: color + "22",
                                borderColor: color + "55",
                                color,
                              }
                            : { background: "#1a1a1a", borderColor: "#2a2a2a", color: "#666" }
                        }
                      >
                        {m === "Todos" ? "Todos" : `${icons[m] || ""} ${m}`}
                      </button>
                    );
                  })}
                </div>

                {/* Lista */}
                <div
                  style={{
                    maxHeight: 260,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {filteredLibrary.length === 0 && (
                    <p style={{ color: "#444", fontSize: 13, textAlign: "center", padding: 16 }}>
                      Nenhum exercício encontrado
                    </p>
                  )}
                  {filteredLibrary.map((exercise, i) => {
                    const color = muscleColor[exercise.muscle] || "#22c55e";
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: "#141414",
                          border: "1px solid #1e1e1e",
                          borderRadius: 12,
                          padding: "10px 12px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div
                            className="muscle-dot"
                            style={{ background: color }}
                          />
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 500, color: "#ddd" }}>
                              {exercise.name}
                            </div>
                            <div style={{ fontSize: 11, color: "#555" }}>
                              {exercise.muscle}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => addToWorkout(exercise)}
                          style={{
                            background: color + "22",
                            border: `1px solid ${color}44`,
                            color,
                            borderRadius: 10,
                            width: 32,
                            height: 32,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: 18,
                            cursor: "pointer",
                            flexShrink: 0,
                            transition: "all 0.15s",
                          }}
                        >
                          +
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Finalizar */}
              <button
                className="btn-primary"
                onClick={finishWorkout}
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: 16,
                  borderRadius: 16,
                  opacity: pct === 100 ? 1 : 0.7,
                }}
              >
                {pct === 100 ? "🔥 Treino concluído!" : `Finalizar treino · ${pct}%`}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
