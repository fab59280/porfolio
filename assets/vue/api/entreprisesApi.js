import axios from "axios";

export default {
  create(entreprise) {
    console.log(entreprise);
    return axios.post("/api/entreprises", {
      entreprise
    }, {
      headers: {
        "accept":       "application/ld+json",
        "Content-Type": "application/ld+json"
      }
    });
  },
  findAll() {
    return axios.get("/api/entreprises", {
      headers: {
        accept: "application/ld+json",
      }
    });
  },
  findOneById(id) {
    let data =  axios.get("/api/entreprises/" + id, {
      headers: {
        accept: "application/ld+json",
      }
    });
    return data;
  },
  update(entreprise) {
    return axios.put(entreprise['@id'], JSON.parse(JSON.stringify(entreprise)), {
      headers: {
        "accept":       "application/ld+json",
        "Content-Type": "application/ld+json"
      }
    }
    )
  },
  delete(id) {
    return axios.delete("/api/entreprises/" + id,
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
