import axios from "axios";

export default {
  create(mission) {
    mission.tjm = Number.parseInt(mission.tjm);
    mission.nbJours = Number.parseInt(mission.nbJours);
    return axios.post("/api/missions",
      mission
      , {
        headers: {
          "accept":       "application/ld+json",
          "Content-Type": "application/ld+json"
        }
      });
  },
  findAll() {
    return axios.get("/api/missions", {
      headers: {
        accept: "application/ld+json",
      }
    });
  },
  findOneById(id) {
    let data =  axios.get("/api/missions/" + id, {
      headers: {
        accept: "application/ld+json",
      }
    });
    return data;
  },
  update(mission) {
    mission.tjm = Number.parseInt(mission.tjm);
    mission.nbJours = Number.parseInt(mission.nbJours);
    return axios.put("api/missions/" + mission.id, JSON.parse(JSON.stringify(mission)), {
      headers: {
        "accept":       "application/ld+json",
        "Content-Type": "application/ld+json"
      }
    }
    )
  },
  delete(id) {
    return axios.delete("/api/missions/" + id,
      {
        headers: {
          "accept":       "application/ld+json"
        }
      }
    )
  },
  findSubResource(url) {
    return axios.get(url, {
      headers: {
        "accept":       "application/ld+json"
      }
    })
  }
};
