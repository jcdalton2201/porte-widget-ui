export class OldPorteApi {
  constructor() {
    this.myHeader = new Headers();
    this.myHeader.append('Content-Type', 'application/json');
    this.myHeader.append('Access-Control-Allow-Origin', '*');
    this.myHeader.append('api_key', 'qpvbwgjvptmf3x59vdx4mc5d');
    this.myHeader.append(
      'SessionToken',
      'c4b25a6f-c346-4fb1-8e43-62c94f978ee8'
    );
    this.myHeader.append(
      'Authorization',
      'Bearer 02867A4975F60CF9CEE39979174C6E5A33ECE5628D8EB27F9F1CC122BBD4CEC6'
    );
  }
  __handleErrors() {}
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
}
