import axios from "axios";

export default {
  create(date) {
    return axios.post("/api/dates",
      date
      , {
        headers: {
          "accept":       "application/ld+json",
          "Content-Type": "application/ld+json"
        }
      });
  },
  findAll() {
    return axios.get("/api/dates", {
      headers: {
        accept: "application/ld+json",
      }
    });
  },
  findOneById(id) {
    let data =  axios.get("/api/dates/" + id, {
      headers: {
        accept: "application/ld+json",
      }
    });
    return data;
  },
  update(date) {
    return axios.put("api/dates/" + date.id, JSON.parse(JSON.stringify(date)), {
      headers: {
        "accept":       "application/ld+json",
        "Content-Type": "application/ld+json"
      }
    }
    )
  },
  delete(id) {
    return axios.delete("/api/dates/" + id,
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
