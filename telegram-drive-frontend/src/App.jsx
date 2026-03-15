import "./App.css";

function App() {
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    });

    alert("Image uploaded to Telegram");
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Telegram Drive</h1>
        <p>Your personal media archive</p>
      </header>

      <div className="controls">
        <input type="text" placeholder="Search images..." className="search" />

        <label className="upload-btn">
          Upload Image
          <input type="file" hidden  onChange={uploadImage} />
        </label>
      </div>

      <div className="grid">{/* images will come here */}</div>
    </div>
  );
}

export default App;
