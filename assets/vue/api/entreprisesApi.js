import axios from "axios";

export default {
  create(entreprise) {
    return axios.post("/api/entreprises", {
      "type":     entreprise.type,
      "name":     entreprise.name,
      "siret":    entreprise.siret
    }, {
      headers: {
        "accept":       "application/json",
        "Content-Type": "application/json"
      }
    });
  },
  findAll() {
    return axios.get("/api/entreprises", {
      headers: {
        accept: "application/json",
      }
    });
  },
  findOneById(id) {
    let data =  axios.get("/api/entreprises/" + id, {
      headers: {
        accept: "application/json",
      }
    });
    return data;
  },
  update(entreprise) {
    return axios.patch("/api/entreprises/" + entreprise.id, {
      "type":     entreprise.type,
      "name":     entreprise.name,
      "siret":    entreprise.siret
    }, {
      headers: {
        "accept":       "application/json",
        "Content-Type": "application/json"
      }
    }
    )
  },
  delete(id) {
    return axios.delete("/api/entreprises/" + id,
      {
        headers: {
          "accept":       "application/json"
        }
      }
    )
  },
  findSubResource(url) {
    return axios.get(url, {
      headers: {
        "accept":       "application/json"
      }
    })
  }
};
