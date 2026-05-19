  export default function WorkoutChecklistApp() { const { useState, useEffect } = React;

const [screen, setScreen] = useState('home'); const [activeWorkout, setActiveWorkout] = useState(null); const { useState, useEffect } = React;

const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });

// ===================== // BASE DE EXERCÍCIOS // ===================== const defaultLibrary = [ // PEITO { name: "Supino reto barra", muscle: "Peito" }, { name: "Supino reto halter", muscle: "Peito" }, { name: "Supino inclinado barra", muscle: "Peito" }, { name: "Supino inclinado halter", muscle: "Peito" }, { name: "Supino declinado", muscle: "Peito" }, { name: "Crucifixo reto", muscle: "Peito" }, { name: "Crucifixo inclinado", muscle: "Peito" }, { name: "Crucifixo máquina", muscle: "Peito" }, { name: "Crossover alto", muscle: "Peito" }, { name: "Crossover médio", muscle: "Peito" }, { name: "Crossover baixo", muscle: "Peito" }, { name: "Peck deck", muscle: "Peito" }, { name: "Flexão de braço", muscle: "Peito" }, { name: "Flexão inclinada", muscle: "Peito" }, { name: "Flexão declinada", muscle: "Peito" },

// COSTAS
{ name: "Puxada frontal aberta", muscle: "Costas" },
{ name: "Puxada frontal fechada", muscle: "Costas" },
{ name: "Barra fixa", muscle: "Costas" },
{ name: "Barra fixa assistida", muscle: "Costas" },
{ name: "Remada curvada barra", muscle: "Costas" },
{ name: "Remada curvada halter", muscle: "Costas" },
{ name: "Remada baixa", muscle: "Costas" },
{ name: "Remada unilateral", muscle: "Costas" },
{ name: "Remada máquina", muscle: "Costas" },
{ name: "Pulldown", muscle: "Costas" },
{ name: "Pullover halter", muscle: "Costas" },
{ name: "Pullover máquina", muscle: "Costas" },
{ name: "Encolhimento trapézio", muscle: "Costas" },
{ name: "Levantamento terra", muscle: "Costas" },

// PERNAS
{ name: "Agachamento livre", muscle: "Pernas" },
{ name: "Agachamento smith", muscle: "Pernas" },
{ name: "Agachamento hack", muscle: "Pernas" },
{ name: "Leg press 45°", muscle: "Pernas" },
{ name: "Leg press horizontal", muscle: "Pernas" },
{ name: "Cadeira extensora", muscle: "Pernas" },
{ name: "Cadeira flexora", muscle: "Pernas" },
{ name: "Mesa flexora", muscle: "Pernas" },
{ name: "Stiff barra", muscle: "Pernas" },
{ name: "Stiff halter", muscle: "Pernas" },
{ name: "Afundo", muscle: "Pernas" },
{ name: "Passada", muscle: "Pernas" },
{ name: "Hip thrust", muscle: "Pernas" },
{ name: "Abdução máquina", muscle: "Pernas" },
{ name: "Panturrilha em pé", muscle: "Pernas" },
{ name: "Panturrilha sentado", muscle: "Pernas" },
{ name: "Panturrilha leg press", muscle: "Pernas" },

// OMBROS
{ name: "Desenvolvimento barra", muscle: "Ombros" },
{ name: "Desenvolvimento halter", muscle: "Ombros" },
{ name: "Desenvolvimento máquina", muscle: "Ombros" },
{ name: "Elevação lateral", muscle: "Ombros" },
{ name: "Elevação frontal", muscle: "Ombros" },
{ name: "Elevação posterior", muscle: "Ombros" },
{ name: "Crucifixo inverso", muscle: "Ombros" },
{ name: "Arnold press", muscle: "Ombros" },

// BÍCEPS
{ name: "Rosca direta barra", muscle: "Bíceps" },
{ name: "Rosca direta W", muscle: "Bíceps" },
{ name: "Rosca alternada", muscle: "Bíceps" },
{ name: "Rosca martelo", muscle: "Bíceps" },
{ name: "Rosca concentrada", muscle: "Bíceps" },
{ name: "Rosca Scott", muscle: "Bíceps" },
{ name: "Rosca no cabo", muscle: "Bíceps" },

// TRÍCEPS
{ name: "Tríceps pulley", muscle: "Tríceps" },
{ name: "Tríceps corda", muscle: "Tríceps" },
{ name: "Tríceps francês", muscle: "Tríceps" },
{ name: "Tríceps testa", muscle: "Tríceps" },
{ name: "Mergulho banco", muscle: "Tríceps" },
{ name: "Mergulho paralela", muscle: "Tríceps" },

// CORE
{ name: "Abdominal supra", muscle: "Core" },
{ name: "Abdominal infra", muscle: "Core" },
{ name: "Abdominal oblíquo", muscle: "Core" },
{ name: "Prancha", muscle: "Core" },
{ name: "Prancha lateral", muscle: "Core" },
{ name: "Elevação de pernas", muscle: "Core" },
{ name: "Abdominal bicicleta", muscle: "Core" },

// CARDIO
{ name: "Esteira corrida", muscle: "Cardio" },
{ name: "Esteira caminhada inclinada", muscle: "Cardio" },
{ name: "Bicicleta ergométrica", muscle: "Cardio" },
{ name: "Escada (stair climber)", muscle: "Cardio" },
{ name: "Pular corda", muscle: "Cardio" },
{ name: "HIIT corrida", muscle: "Cardio" }

];

const defaultWorkouts = { "Treino A - Peito e Tríceps": [ { id: 1, name: "Supino reto barra", sets: 4, reps: 10 }, { id: 2, name: "Supino inclinado halter", sets: 3, reps: 12 }, { id: 3, name: "Crucifixo reto", sets: 3, reps: 12 }, { id: 4, name: "Tríceps pulley", sets: 3, reps: 12 } ], "Treino B - Costas e Bíceps": [ { id: 5, name: "Puxada frontal aberta", sets: 4, reps: 10 }, { id: 6, name: "Remada baixa", sets: 3, reps: 12 }, { id: 7, name: "Rosca direta", sets: 3, reps: 12 } ], "Treino C - Pernas": [ { id: 8, name: "Agachamento livre", sets: 4, reps: 10 }, { id: 9, name: "Leg press", sets: 4, reps: 12 }, { id: 10, name: "Mesa flexora", sets: 3, reps: 12 } ], "Treino D - Ombros e Core": [ { id: 11, name: "Desenvolvimento halter", sets: 4, reps: 10 }, { id: 12, name: "Elevação lateral", sets: 3, reps: 15 }, { id: 13, name: "Prancha", sets: 3, reps: 60 } ] };

// ===================== // STATES // ===================== const [library, setLibrary] = useState(() => { const saved = localStorage.getItem("library_v5"); return saved ? JSON.parse(saved) : defaultLibrary; });

const [workouts, setWorkouts] = useState(() => { const saved = localStorage.getItem("workouts_v5"); return saved ? JSON.parse(saved) : defaultWorkouts; });

const [checked, setChecked] = useState(() => { const saved = localStorage.getItem("checked_v5"); return saved ? JSON.parse(saved) : {}; });

const [selectedWorkout, setSelectedWorkout] = useState(Object.keys(defaultWorkouts)[0]); const [newExercise, setNewExercise] = useState("");

// FILTRO + FAVORITOS const [filter, setFilter] = useState("Todos"); const [favorites, setFavorites] = useState(() => { const saved = localStorage.getItem("favorites_v5"); return saved ? JSON.parse(saved) : []; });

// ===================== // SAVE // ===================== useEffect(() => { localStorage.setItem("library_v5", JSON.stringify(library)); }, [library]);

useEffect(() => { localStorage.setItem("workouts_v5", JSON.stringify(workouts)); }, [workouts]);

useEffect(() => { localStorage.setItem("checked_v5", JSON.stringify(checked)); }, [checked]);

useEffect(() => { localStorage.setItem("favorites_v5", JSON.stringify(favorites)); }, [favorites]);

// ===================== // FUNCTIONS // ===================== const toggleCheck = (id) => { setChecked((prev) => ({ ...prev, [id]: !prev[id] })); };

const toggleFavorite = (name) => { setFavorites((prev) => prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name] ); };

const addExerciseToLibrary = () => { if (!newExercise.trim()) return; setLibrary((prev) => [...prev, { name: newExercise, muscle: "Livre" }]); setNewExercise(""); };

const addToWorkout = (exercise) => { setWorkouts((prev) => ({ ...prev, [selectedWorkout]: [ ...prev[selectedWorkout], { id: Date.now() + Math.random(), name: exercise.name, sets: 3, reps: 12 } ] })); };

const removeFromWorkout = (id) => { setWorkouts((prev) => ({ ...prev, [selectedWorkout]: prev[selectedWorkout].filter((ex) => ex.id !== id) })); };

const updateExercise = (id, field, value) => { setWorkouts((prev) => ({ ...prev, [selectedWorkout]: prev[selectedWorkout].map((ex) => ex.id === id ? { ...ex, [field]: value } : ex ) })); };

// ===================== // FILTERED LIBRARY // ===================== const filteredLibrary = library.filter((ex) => { if (filter === "Favoritos") return favorites.includes(ex.name); if (filter === "Todos") return true; return ex.muscle === filter; });

const muscles = ["Todos", "Favoritos", ...new Set(library.map((l) => l.muscle))];

const completedCount = workouts[selectedWorkout].filter( (ex) => checked[ex.id] ).length;

const progress = workouts[selectedWorkout].length ? Math.round((completedCount / workouts[selectedWorkout].length) * 100) : 0;

// ===================== // UI // ===================== return ( <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-4 flex justify-center"> <div className="w-full max-w-md">

{/* HEADER */}
    <div className="mb-4">
      <p className="text-zinc-400 text-sm capitalize">{today}</p>
      <h1 className="text-3xl font-black">Treino do Rafa</h1>
      <div className="text-sm text-zinc-400">Progresso: {progress}%</div>
    </div>

    {/* SELECT TREINO */}
    <select
      className="w-full p-3 rounded-xl bg-zinc-800 mb-3"
      value={selectedWorkout}
      onChange={(e) => setSelectedWorkout(e.target.value)}
    >
      {Object.keys(workouts).map((w) => (
        <option key={w}>{w}</option>
      ))}
    </select>

    {/* FILTER */}
    <div className="flex gap-2 overflow-auto mb-3">
      {muscles.map((m) => (
        <button
          key={m}
          onClick={() => setFilter(m)}
          className={`px-3 py-1 rounded-xl text-sm whitespace-nowrap ${
            filter === m ? "bg-green-500 text-black" : "bg-zinc-800"
          }`}
        >
          {m}
        </button>
      ))}
    </div>

    {/* ADD EXERCISE */}
    <div className="flex gap-2 mb-4">
      <input
        value={newExercise}
        onChange={(e) => setNewExercise(e.target.value)}
        placeholder="Novo exercício"
        className="flex-1 p-3 rounded-xl bg-zinc-800"
      />
      <button
        onClick={addExerciseToLibrary}
        className="bg-green-500 text-black px-4 rounded-xl font-bold"
      >
        +
      </button>
    </div>

    {/* LIBRARY */}
    <div className="mb-5">
      <p className="text-sm text-zinc-400 mb-2">Biblioteca</p>
      <div className="space-y-2 max-h-40 overflow-auto">
        {filteredLibrary.map((ex, i) => (
          <div key={i} className="flex justify-between bg-zinc-800 p-2 rounded-xl">
            <div>
              <span className="block">{ex.name}</span>
              <span className="text-xs text-zinc-400">{ex.muscle}</span>
            </div>

            <div className="flex gap-2 items-center">
              <button
                onClick={() => toggleFavorite(ex.name)}
                className="text-yellow-400"
              >
                {favorites.includes(ex.name) ? "★" : "☆"}
              </button>

              <button
                onClick={() => addToWorkout(ex)}
                className="text-green-400"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* WORKOUT */}
    <div className="space-y-3">
      {workouts[selectedWorkout].map((ex) => (
        <div key={ex.id} className="bg-zinc-800 p-3 rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <button
              onClick={() => toggleCheck(ex.id)}
              className="text-left flex-1"
            >
              <div className={checked[ex.id] ? "line-through text-zinc-500" : ""}>
                {ex.name}
              </div>
            </button>

            <button
              onClick={() => removeFromWorkout(ex.id)}
              className="text-red-400"
            >
              ✕
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              value={ex.sets}
              onChange={(e) => updateExercise(ex.id, "sets", Number(e.target.value))}
              className="w-1/2 p-2 rounded bg-zinc-900"
            />

            <input
              type="number"
              value={ex.reps}
              onChange={(e) => updateExercise(ex.id, "reps", Number(e.target.value))}
              className="w-1/2 p-2 rounded bg-zinc-900"
            />
          </div>

          <div className="text-xs text-zinc-400">
            {ex.sets}x{ex.reps}
          </div>
        </div>
      ))}
    </div>

  </div>
</div>

); }
