import axios from "axios";

export default {
  login(data) {
    return axios.post("/app_login", {
      username:     data.username,
      password:     data.password
    }, {
      headers: {
        "accept":       "application/ld+json",
        "Content-Type": "application/ld+json"
      }
    });
  },
  find(iri) {
    return axios.get(iri, {
      headers: {
        "accept": "application/ld+json"
      }
    });
  }
};
