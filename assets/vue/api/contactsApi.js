import axios from "axios";

export default {
  create(entreprise) {
    return axios.post("/api/contacts", {
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
    return axios.get("/api/contacts", {
      headers: {
        accept: "application/json",
      }
    });
  },
  findOneById(id) {
    return axios.get("/api/contacts/" + id, {
      headers: {
        accept: "application/json",
      }
    })
  },
  update(entreprise) {
    return axios.patch("/api/contacts/" + entreprise.id, {
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
    return axios.delete("/api/contacts/" + id,
      {
        headers: {
          "accept":       "application/json"
        }
      }
    )
  }
};
