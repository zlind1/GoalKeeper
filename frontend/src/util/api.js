
const inProduction = true;
const endpointURL = inProduction ? 'https://zlind-goalkeeper.herokuapp.com'
  : 'http://localhost:5000';

const api = {
  get: async (route, token=null) => {
    const headers = {}
    if (token !== null) {
      headers.Authorization = `Bearer ${token}`;
    }
    const apiResponse = await fetch(endpointURL+route, {
      method: 'GET',
      headers: headers
    });
    const response = {
      ok: apiResponse.ok
    }
    const data = await apiResponse.json();
    for (const key of Object.keys(data)) {
      response[key] = data[key];
    }
    return response;
  },
  post: async (route, body, token=null) => {
    const headers = {
      'content-type': 'application/json'
    }
    if (token !== null) {
      headers.Authorization = `Bearer ${token}`;
    }
    const apiResponse = await fetch(endpointURL+route, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });
    const response = {
      ok: apiResponse.ok
    }
    const data = await apiResponse.json();
    for (const key of Object.keys(data)) {
      response[key] = data[key];
    }
    return response;
  },
  put: async (route, body, token=null) => {
    const headers = {
      'content-type': 'application/json'
    }
    if (token !== null) {
      headers.Authorization = `Bearer ${token}`;
    }
    const apiResponse = await fetch(endpointURL+route, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(body)
    });
    const response = {
      ok: apiResponse.ok
    }
    const data = await apiResponse.json();
    for (const key of Object.keys(data)) {
      response[key] = data[key];
    }
    return response;
  }
}

export default api;
