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
  findAll(params) {
    let query = params !== undefined ? params : "";
    console.log("/api/contacts" + query);
    return axios.get("/api/contacts" + query, {
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
    }).catch(error => {
      console.log(error);
      return null;
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
    let url;
    if(contact.id) {
      url = "api/contacts/" + contact.id;
    } else {
      url = contact['@id'];
    }
    return axios.put(url, JSON.parse(JSON.stringify(contact)), {
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
