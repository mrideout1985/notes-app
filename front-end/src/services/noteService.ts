import axios from "axios";

class NoteService {
  public async getData(): Promise<any> {
    const res = await axios.get(`http://localhost:3000/notes`);
    return res.data;
  }
}

export { NoteService };
