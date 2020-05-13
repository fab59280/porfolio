import axios from "axios";

export default {
  create(contact) {
    return axios.post("/api/contacts", JSON.parse(JSON.stringify(contact)), {
      headers: {
        "accept":       "application/ld+json",
        "Content-Type": "application/ld+json"
      }
    });
  },
  findAll() {
    return axios.get("/api/contacts", {
      headers: {
        accept: "application/ld+json",
      }
    });
  },
  findEntreprise(id) {
    return axios.get("/api/contacts/" + id + "/entreprises", {
      headers: {
        accept: "application/ld+json",
      }
    });
  },
  findOneById(id) {
    return axios.get("/api/contacts/" + id, {
      headers: {
        accept: "application/ld+json",
      }
    })
  },
  update(contact) {
    return axios.put("/api/contacts/" + contact.id, JSON.parse(JSON.stringify(contact)), {
      headers: {
        "accept":       "application/ld+json",
        "Content-Type": "application/ld+json"
      }
    }
    )
  },
  delete(id) {
    return axios.delete("/api/contacts/" + id,
      {
        headers: {
          "accept":       "application/ld+json"
        }
      }
    )
  }
};
