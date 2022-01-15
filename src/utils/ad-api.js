export class AdApi {
  constructor() {
    this.myHeader = new Headers();
    this.myHeader.append('Content-Type', 'application/json');
    this.myHeader.append('Access-Control-Allow-Origin', '*');
    this.myHeader.append('usereid', '');
  }
  __handleErrors() {}
  deleteCall(url, userEid) {
    this.myHeader.set('usereid', userEid);
    let options = {
      headers: this.myHeader,
      method: 'DELETE',
    };
    return fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }
  postCall(url, data, userEid) {
    if (userEid) {
      this.myHeader.set('usereid', userEid);
    }
    let options = {
      headers: this.myHeader,
      method: 'POST',
      body: JSON.stringify(data),
    };
    return fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw res;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
  patchCall(url, data, userEid) {
    this.myHeader.set('usereid', userEid);
    let options = {
      headers: this.myHeader,
      method: 'PATCH',
      body: JSON.stringify(data),
    };
    return fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }
  putCall(url, data, userEid) {
    this.myHeader.set('usereid', userEid);
    let options = {
      headers: this.myHeader,
      method: 'PUT',
      body: JSON.stringify(data),
    };
    return fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw res;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
  getCall(url) {
    let options = {
      headers: this.myHeader,
      // mode: 'no-cors',
    };
    return fetch(url, options)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }
  /**
   *
   * @param {URL} url Url to send data to.
   * @param {File} files Files to be upload
   * @param {Object} userEid UserId for the files.
   */
  uploadFile(url, files, userEid) {
    const formData = new FormData();
    formData.append('file', files);
    if (userEid) {
      this.myHeader.set('usereid', userEid);
    }
    // this.myHeader.set('Content-Type', 'multipart/form-data');
    let options = {
      method: 'POST',
      body: formData,
    };
    return fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }
}
