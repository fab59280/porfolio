import axios from "axios";

export default {
  create(techno) {
    return axios.post("/api/technologies", {
      name: techno.name,
      tjmRegion: parseInt(techno.tjmRegion, 10),
      tjmFrance: parseInt(techno.tjmFrance, 10)
    }, {
      headers: {
        "accept": "application/ld+json",
        "Content-Type": "application/ld+json"
      }
    });
  },
  update(techno) {
    return axios.put("/api/technologies/" + techno.id, {
      name: techno.name,
      tjmRegion: parseInt(techno.tjmRegion, 10),
      tjmFrance: parseInt(techno.tjmFrance, 10)
    }, {
      headers: {
        "accept":       "application/ld+json",
        "Content-Type": "application/ld+json"
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
        accept: "application/ld+json",
      }
    });
  }
};
