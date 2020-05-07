import axios from "axios";

export default {
  create(techno) {
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
  update(techno) {
    console.log(techno);
    return axios.patch("/api/technologies/" + techno.id, {
      name: techno.name,
      tjmRegion: parseInt(techno.tjmRegion, 10),
      tjmFrance: parseInt(techno.tjmFrance, 10)
    }, {
      headers: {
        "accept":       "application/json",
        "Content-Type": "application/merge-patch+json"
      }
    });
  },
  delete(techno) {
    return axios.delete("/api/technologies/" + techno.id)
      .catch(error => {
        console.log(error);
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
