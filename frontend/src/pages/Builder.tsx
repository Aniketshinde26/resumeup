import { useBuilder } from "../hooks/useBuilder";

export default function Builder() {
  const { resume, loading, saving, updateData, handleSave } = useBuilder();

  if (loading) return <div className="p-10 text-center">Loading Resume...</div>;
  if (!resume) return null;

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* TOOLBAR */}
      <header className="h-16 bg-white border-b px-8 flex items-center justify-between">
        <h1 className="font-bold text-lg">{resume.title}</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* LEFT SIDE: INPUT FORMS */}
        <section className="w-1/2 overflow-y-auto p-8 border-r">
          <div className="space-y-8 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold">Personal Info</h2>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-2 rounded"
              value={resume.data.name || ""}
              onChange={(e) => updateData({ name: e.target.value })}
            />
            {/* Add more inputs for Experience, Education, etc. */}
          </div>
        </section>

        {/* RIGHT SIDE: PREVIEW */}
        <section className="w-1/2 bg-slate-200 overflow-y-auto p-12">
          <div className="bg-white shadow-2xl min-h-11in w-full p-8 mx-auto origin-top scale-90">
            {/* This is where the actual Resume Template will be rendered */}
            <h1 className="text-3xl font-bold text-center">
              {resume.data.name}
            </h1>
            <p className="text-center text-slate-500">{resume.data.email}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
