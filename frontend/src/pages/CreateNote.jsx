import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CreateNote() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//         setErrors({});

//         await api.post("/notes", form);

//         navigate("/");
//     } catch (error) {
//         if (error.response?.status === 422) {
//         setErrors(error.response.data.errors);
//         }

//         console.error(error);
//     }
//   };


const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

  if (!form.title.trim()) {
    newErrors.title = ["Title is required"];
  }

  if (!form.content.trim()) {
    newErrors.content = ["Content is required"];
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    setErrors({});

    await api.post("/notes", form);

    navigate("/");
  } catch (error) {
    if (error.response?.status === 422) {
      setErrors(error.response.data.errors);
    }
  }
};


  // return (
  //   <div style={{ padding: "20px" }}>
  //     <h2>Create Note</h2>

  //     <form onSubmit={handleSubmit}>
  //       <input
  //         placeholder="Title"
  //         value={form.title}
  //         onChange={(e) => {
  //               setForm({ ...form, title: e.target.value });

  //               if (errors.title) {
  //               setErrors({ ...errors, title: null });
  //               }
  //           }}
  //       />

  //       {errors.title && (
  //           <p style={{ color: "red" }}>
  //               {errors.title[0]}
  //           </p>
  //       )}

  //       <br />
  //       <br />

  //       <textarea
  //         rows="8"
  //         cols="50"
  //         placeholder="Content"
  //         value={form.content}
  //         onChange={(e) => {
  //               setForm({ ...form, content: e.target.value });

  //               if (errors.content) {
  //               setErrors({ ...errors, content: null });
  //               }
  //           }}
  //       />

  //       {errors.content && (
  //           <p style={{ color: "red" }}>
  //               {errors.content[0]}
  //           </p>
  //       )}

  //       <br />
  //       <br />

  //       <button type="submit">Save</button>
  //     </form>
  //   </div>
  // );

  return (
  <div
    style={{
      maxWidth: "700px",
      margin: "40px auto",
      padding: "64px",
      border: "1px solid #ddd",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      background: "#fff",
    }}
  >
    <h2 style={{ marginBottom: "20px" }}>
      📝 Create New Note
    </h2>

    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
          }}
        >
          Title
        </label>

        <input
          type="text"
          placeholder="Enter note title"
          value={form.title}
          onChange={(e) => {
            setForm({ ...form, title: e.target.value });

            if (errors.title) {
              setErrors({ ...errors, title: null });
            }
          }}
          style={{
            width: "100%",
            padding: "12px",
            border:
              errors.title
                ? "1px solid red"
                : "1px solid #ccc",
            borderRadius: "6px",
          }}
        />

        {errors.title && (
          <p
            style={{
              color: "red",
              marginTop: "5px",
            }}
          >
            {errors.title[0]}
          </p>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
          }}
        >
          Content
        </label>

        <textarea
          rows="8"
          placeholder="Write your note here..."
          value={form.content}
          onChange={(e) => {
            setForm({
              ...form,
              content: e.target.value,
            });

            if (errors.content) {
              setErrors({
                ...errors,
                content: null,
              });
            }
          }}
          style={{
            width: "100%",
            padding: "12px",
            border:
              errors.content
                ? "1px solid red"
                : "1px solid #ccc",
            borderRadius: "6px",
            resize: "vertical",
          }}
        />

        {errors.content && (
          <p
            style={{
              color: "red",
              marginTop: "5px",
            }}
          >
            {errors.content[0]}
          </p>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          type="submit"
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Save Note
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            padding: "12px 20px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: "pointer",
            background: "#fff",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
);
}