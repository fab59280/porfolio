import axios from "axios";

export default {
  create(addresse) {
    console.log(addresse);
    return axios.post("/api/addresses", {
      addresse
    }, {
      headers: {
        "accept":       "application/ld+json",
        "Content-Type": "application/ld+json"
      }
    });
  },
  findAll() {
    return axios.get("/api/addresses", {
      headers: {
        accept: "application/ld+json",
      }
    });
  },
  findOneById(id) {
    let data =  axios.get("/api/addresses/" + id, {
      headers: {
        accept: "application/ld+json",
      }
    });
    return data;
  },
  update(addresse) {
    return axios.put("api/addresses/" + addresse.id, JSON.parse(JSON.stringify(addresse)), {
      headers: {
        "accept":       "application/ld+json",
        "Content-Type": "application/ld+json"
      }
    }
    )
  },
  delete(id) {
    return axios.delete("/api/addresses/" + id,
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
