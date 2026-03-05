//Sean Clarke 
//c0561639
import { useEffect, useState } from "react";
import { getBooks, createBook, deleteBook, updateBook } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllCommunityModule} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);
function App()
{
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title:"", author:"", year:""});
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() =>
  {
    loadBooks();
  }, []);

  //Loading Booklist
  async function loadBooks()
  {
    const data = await getBooks();
    setBooks(Array.isArray(data) ? data : []);
  }

  async function handleSubmit(e)
  {
    e.preventDefault();
    const yearNum = Number(form.year);

    //Title Validation
    if (!form.title.trim())
    {
      alert("Title is required.");
      return;
    }

    //Author Validation
    if (!form.author.trim())
    {
      alert("Author is required.");
      return;
    }

    //Year Validation
    if (!form.year || yearNum <= 0 || yearNum >= 2100)
    {
      alert("Year must be a valid number between 0 and 2100");
      return;
    }

    const bookData =
    {
      title: form.title,
      author: form.author,
      year: Number(form.year)
    };

    if (editingId)
    {
      //Updating book state
      await updateBook(editingId, bookData);
      setEditingId(null);
    } 
    else
    {
      //Creating book state
      await createBook(bookData);
    }

    //Reset form
    setForm({ title:"", author:"", year:""});

    //Reload book list
    loadBooks();
    
    //Collapse form
    setShowForm(false);
  }

  //Delete Function
  async function handleDelete(id)
  {
    await deleteBook(id);
    loadBooks();
  }

  const filteredBooks = books.filter(b => {
  const q = search.toLowerCase();
  return (
    b.title.toLowerCase().includes(q) ||
    b.author.toLowerCase().includes(q) ||
    String(b.year).includes(q)
  );
});

//Setting up AG-Grid Table
const columns = [
  { headerName: "Title", field: "title", flex: 1, sortable: true, filter: true },
  { headerName: "Author", field: "author", flex: 1, sortable: true, filter: true },
  { headerName: "Year", field: "year", width: 120, sortable: true, filter: "agNumberColumnFilter" },

  {
    headerName: "Actions",
    field: "actions",
    width: 220,
    cellRenderer: (params) => {
      return (
        <div>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => {
              setEditingId(params.data._id);
              setForm(params.data);
              setShowForm(true);
            }}
          >
            Edit
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(params.data._id)}
          >
            Delete
          </button>
        </div>
      );
    }
  }
];

const rowData = filteredBooks.map(b => ({ ...b, id: b._id }));

return (
  <div className="bg-primary min-vh-100 p-3 d-flex flex-column justify-content-center">
    <div className="d-flex justify-content-center mt-2 mb-2">
      <div
        className="card bg-primary-subtle justify-content-center align-items-center 
                   text-center fs-1 shadow"
        style={{ height: "5rem", width: "20rem" }}
      >
        Sean's Book List
      </div>
    </div>

    {/* Search Bar */}
    <div className="text-center">
      <input
        className="mx-auto text-center form-control shadow"
        style={{ maxWidth: "320px" }}
        placeholder="- Search -"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>

    {/* Add New Book button */}
    <div className="text-center mt-2 mb-2 mx-auto">
      <button
        className="btn btn-secondary shadow"
        onClick={() => {
          setEditingId(null);
          setForm({ title: "", author: "", year: "" });
          setShowForm(true);
        }}
      >Add New Book
      </button>
    </div>

    {/* Add/Edit Form */}
    <div className={`slide-wrapper ${showForm ? "open" : ""}`}>
      <div className="mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card shadow p-3 mt-2 mb-2">
          <h4 className="text-center mb-3">
            {editingId ? "Update Book" : "Add Book"}
          </h4>

          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-2"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              className="form-control mb-2"
              placeholder="Author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />

            <input
              className="form-control mb-3"
              type="number"
              placeholder="Year"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            />

            {/* Submit button */}
            <button className="btn btn-primary w-100 mb-2" type="submit">
              {editingId ? "Update Book" : "Add Book"}
            </button>

            {/* Cancel button (only visible in edit mode) */}
              <button
                className="btn btn-secondary w-100"
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setTimeout(() =>
                  {
                    setEditingId(null);          
                    setForm({ title: "", author: "", year: "" });
                  }, 400);
                }}
              >{editingId ? "Cancel Edit" : "Cancel Add"}
              </button>
          </form>
        </div>
      </div>
    </div>

    {/* Table / Grid */}
    <div className="mx-auto" style={{ width: "70%" }}>
      <div className="ag-theme-alpine custom-grid rounded-4 shadow-lg p-2" style={{ height: 487, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={12}
          rowHeight={35}
        />
      </div>
    </div>

    
  </div>
  );
}
export default App;