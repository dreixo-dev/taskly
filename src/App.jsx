import { useState } from "react";

function Logo() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white shadow-sm">
      <svg
        width="21"
        height="21"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </div>
  );
}

function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <Logo />

          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-950">
              Taskly
            </h1>
            <p className="text-xs text-gray-500">Simple. Focused. Done.</p>
          </div>
        </div>

        <div className="hidden rounded-full bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600 sm:block">
          To-Do List
        </div>
      </div>
    </header>
  );
}

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div
      className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all ${
        task.completed
          ? "border-green-200 bg-green-50/60"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      <button
        onClick={() => onToggle(task.id)}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
          task.completed
            ? "border-green-500 bg-green-500 text-white"
            : "border-gray-300 hover:border-black"
        }`}
        aria-label="Toggle task"
      >
        {task.completed && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`break-words text-sm font-medium ${
            task.completed
              ? "text-gray-400 line-through"
              : "text-gray-800"
          }`}
        >
          {task.text}
        </p>

        <span
          className={`mt-1 inline-block text-xs ${
            task.completed ? "text-green-600" : "text-gray-400"
          }`}
        >
          {task.completed ? "Done" : "Not Done"}
        </span>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="rounded-lg p-2 text-gray-400 opacity-100 transition hover:bg-red-50 hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100"
        aria-label="Delete task"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4h8v2" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v5" />
          <path d="M14 11v5" />
        </svg>
      </button>
    </div>
  );
}

function Instructions() {
  return (
    <section className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          User Guide
        </p>

        <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-950">
          How to use Taskly
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Manage your daily tasks using a simple and organized interface.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-gray-50 p-5">
          <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm">
            01
          </div>

          <h3 className="font-semibold text-gray-900">Add a task</h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Type your task in the input field and click Add Task.
          </p>
        </div>

        <div className="rounded-2xl bg-gray-50 p-5">
          <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm">
            02
          </div>

          <h3 className="font-semibold text-gray-900">Mark as Done</h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Click the circle beside a task to switch between Done and Not
            Done.
          </p>
        </div>

        <div className="rounded-2xl bg-gray-50 p-5">
          <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm">
            03
          </div>

          <h3 className="font-semibold text-gray-900">Delete a task</h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Click the trash icon when you want to permanently remove a task.
          </p>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [taskInput, setTaskInput] = useState("");

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Finish laboratory activity",
      completed: false,
    },
    {
      id: 2,
      text: "Review React concepts",
      completed: true,
    },
  ]);

  const addTask = () => {
    const trimmedTask = taskInput.trim();

    if (!trimmedTask) return;

    const newTask = {
      id: Date.now(),
      text: trimmedTask,
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
    setTaskInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  };

  const clearCompleted = () => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => !task.completed)
    );
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedCount / totalTasks) * 100);

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900">
      <Header />

      <main className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
        {/* Hero */}
        <section className="mb-10">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-500">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
              Stay organized
            </div>

            <h2 className="text-4xl font-bold tracking-[-0.04em] text-gray-950 sm:text-5xl">
              Get things done.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              A simple and focused task manager designed to help you organize
              your work and keep track of what matters.
            </p>
          </div>
        </section>

        {/* Main Todo Card */}
        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          {/* Card Header */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                My Tasks
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-tight text-gray-950">
                Today
              </h3>
            </div>

            <div className="sm:text-right">
              <p className="text-sm font-semibold text-gray-700">
                {completedCount} of {totalTasks} completed
              </p>

              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 sm:w-36">
                <div
                  className="h-full rounded-full bg-black transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Add Task */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={taskInput}
              onChange={(event) => setTaskInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What needs to be done?"
              className="h-12 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
            />

            <button
              onClick={addTask}
              className="h-12 rounded-xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
            >
              + Add Task
            </button>
          </div>

          {/* Tasks */}
          <div className="mt-6 space-y-3">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 px-5 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>

                <h4 className="mt-4 font-semibold text-gray-800">
                  No tasks yet
                </h4>

                <p className="mt-1 text-sm text-gray-400">
                  Add your first task above.
                </p>
              </div>
            )}
          </div>

          {/* Bottom actions */}
          {tasks.length > 0 && (
            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
              <p className="text-xs text-gray-400">
                {totalTasks} {totalTasks === 1 ? "task" : "tasks"} total
              </p>

              <button
                onClick={clearCompleted}
                className="text-xs font-medium text-gray-500 transition hover:text-red-500"
              >
                Clear completed
              </button>
            </div>
          )}
        </section>

        {/* Instructions */}
        <Instructions />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-7 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <Logo />

            <div>
              <p className="text-sm font-semibold text-gray-900">
                Taskly
              </p>

              <p className="text-xs text-gray-400">
                Application Development & Emerging Technologies
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">
              Ryan Andrei Obedientes
            </p>

            <p className="text-xs text-gray-400">
              BSIT 3-4 
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;