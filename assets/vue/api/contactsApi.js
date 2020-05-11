import axios from "axios";

export default {
  create(contact) {
    return axios.post("/api/contacts", {
      firstname:     contact.firstname,
      lastname:     contact.lastname,
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
  findEntreprise(id) {
    return axios.get("/api/contacts/" + id + "/entreprises", {
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
  update(contact) {
    return axios.patch("/api/contacts/" + contact.id, {
      firstname:     contact.firstname,
      lastname:     contact.lastname,
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
