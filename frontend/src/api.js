const API_URL = "http://localhost:5000/api/books";

//GET all books
export async function getBooks()
{
    const res = await fetch (API_URL);
    return res.json();
}

//Create Book Function
export async function createBook(book)
{
    const res = await fetch (API_URL,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(book)
        });
        return res.json();
}

//Update Book Function
export async function updateBook(id, updatedBook)
{
    const res = await fetch(`${API_URL}/${id}`,
        {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedBook),
        });
        return res.json();
}

//Delete Book Function
export async function deleteBook(id)
{
    await fetch(`${API_URL}/${id}`, 
        { 
            method: "DELETE"
        });
}