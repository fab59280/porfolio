import axios from "axios";

export default {
  create(entreprise) {
    console.log(entreprise);
    return axios.post("/api/entreprises",
      JSON.parse(JSON.stringify(entreprise))
      , {
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
    let url;
    if(typeof id === 'string') {
      url = "/api/entreprises/" + id;
    } else {
      url = id;
    }
    let data =  axios.get(url, {
      headers: {
        accept: "application/ld+json",
      }
    });
    return data;
  },
  update(entreprise) {
    let url;
    if(entreprise.id) {
      url = "api/entreprises/" + entreprise.id;
    } else {
      url = entreprise['@id'];
    }

    return axios.put(url, JSON.parse(JSON.stringify(entreprise)), {
      headers: {
        "accept":       "application/ld+json",
        "Content-Type": "application/ld+json"
      }
    }
    )
  },
  delete(entreprise) {
    return axios.delete("/api/entreprises/" + entreprise.id,
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
