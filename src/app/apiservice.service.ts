import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }


  // here we connect from frontend to backend

  apiUrl='http://localhost:3000/user'


  // now getting the all data thrugh api ew
  getAllData():Observable<any>{
     return this._http.get(`${this.apiUrl}`);
  }

  // create data
  createData(data:any):Observable<any>{
    return this._http.post(`${this.apiUrl}`,data)
  }

  // for delete data
  deleteData(id:any):Observable<any>{
    let ids=id
    return this._http.delete(`${this.apiUrl}/${ids}`)
  }

  updateData(data:any,id:any):Observable<any>{
    let ids=id;
    return this._http.put(`${this.apiUrl}/${ids} `,data)
  }
  getSingleData(id:any):Observable<any>{
    let ids=id;
    return this._http.get(`${this.apiUrl}/${ids} `)
  }

}
