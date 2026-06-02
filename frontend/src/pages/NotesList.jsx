import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchNotes = async (currentPage = 1) => {
    try {
      const res = await api.get(
        `/notes?page=${currentPage}&limit=2`
      );

      setNotes(res.data.data);
      setPage(res.data.current_page);
      setLastPage(res.data.last_page);
    } catch (err) {
      console.error(err);
    }
  };

  const searchNotes = async () => {
    if (!search.trim()) {
      fetchNotes(1);
      return;
    }

    try {
      const res = await api.get(
        `/notes/search?q=${encodeURIComponent(search)}`
      );

      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm("Delete note?")) return;

    await api.delete(`/notes/${id}`);

    fetchNotes(page);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>📝 AI Notes Management</h1>

        <Link to="/create">
          <button>Create Note</button>
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
          }}
        />

        <button onClick={searchNotes}>
          Search
        </button>

        <button
          onClick={() => {
            setSearch("");
            fetchNotes(1);
          }}
        >
          Reset
        </button>
      </div>

      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        notes.map((note) => (
          <div
            key={note.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              boxShadow:
                "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{note.title}</h3>

            <p>
              {note.content.length > 150
                ? note.content.substring(0, 150) +
                  "..."
                : note.content}
            </p>

            {note.similarity_score && (
              <small>
                Score:{" "}
                {Number(
                  note.similarity_score
                ).toFixed(3)}
              </small>
            )}

            <div
              style={{
                marginTop: "10px",
              }}
            >
              <Link to={`/edit/${note.id}`}>
                <button>Edit</button>
              </Link>

              <button
                onClick={() =>
                  deleteNote(note.id)
                }
                style={{
                  marginLeft: "10px",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {search === "" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            disabled={page === 1}
            onClick={() =>
              fetchNotes(page - 1)
            }
          >
            Previous
          </button>

          <span>
            Page {page} of {lastPage}
          </span>

          <button
            disabled={page === lastPage}
            onClick={() =>
              fetchNotes(page + 1)
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}