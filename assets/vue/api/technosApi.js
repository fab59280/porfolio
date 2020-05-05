import axios from "axios";

export default {
  create(techno) {
    console.log({
      name: techno.name,
      tjmRegion: parseInt(techno.tjmRegion, 10),
      tjmFrance: parseInt(techno.tjmFrance, 10)
    });
    return axios.post("/api/technologies", {
      name: techno.name,
      tjmRegion: parseInt(techno.tjmRegion, 10),
      tjmFrance: parseInt(techno.tjmFrance, 10)
    }, {
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      }
    });
  },
  findAll() {
    return axios.get("/api/technologies", {
      headers: {
        accept: "application/json",
      }
    });
  }
};
