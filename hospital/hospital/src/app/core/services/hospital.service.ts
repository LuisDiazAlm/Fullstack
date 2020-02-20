import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TOKEN } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  constructor(private http: HttpClient) { }

  getHospitalService() {

    const params: HttpParams = new HttpParams()
      .set('index', '0')
      .set('limit', '100');

    return this.http.get('hospital', { params: params });
  }

  postHospitalService(model: any) {
    const params: HttpParams = new HttpParams()
      .set('token', TOKEN);

    return this.http.post('hospital', model, { params: params});
  }

  putHospitalService(id: number, model) {
    const params: HttpParams = new HttpParams()
    .set('token', TOKEN);

    return this.http.put(`hospital/${id}`, model, { params: params});
  }

  deleteHospitalService(id: number) {
    const params: HttpParams = new HttpParams()
    .set('token', TOKEN);

    return this.http.delete(`hospital/${id}`, {params: params});
  }
}
