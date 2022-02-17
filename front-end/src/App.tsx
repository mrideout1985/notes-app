import React from "react";
import "./App.scss";
import { Layout } from "./components/layout/layout";
import { NoteService } from "./services/noteService";

function App() {
  // const noteData = new NoteService().getData();
  return (
    <Layout>
      <div className="App">App</div>
    </Layout>
  );
}

export default App;
