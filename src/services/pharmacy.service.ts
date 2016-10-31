import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {FilterPharmyVar} from "../model/mock/filter-pharmy-mock";

@Injectable()
export class PharmacyService {
  data: any;
  static get parameters() {
    return [[Http]];
  }
  filterPharmacy = FilterPharmyVar;
  constructor(private http: Http){}

  getAll(): Observable<any>{
    var url = 'http://pulse.kg/api/v1/pharmacies/';
    let headers = new Headers({
      'Content-Type': 'application/json',
      "cache-control": "no-cache"
    });

    var response = this.http.get(url, {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
    return response;
  }

  filterForPharmacies(): Observable<any>{
    var url = "http://pulse.kg/api/v1/pharmacies/?format=json&" +
      "company="+this.filterPharmacy.companyId+
      "&opening_hours="+this.filterPharmacy.openhoursId+
      "&country="+this.filterPharmacy.countryId+
      "&region="+this.filterPharmacy.regionId+
      "&city="+this.filterPharmacy.cityId;

    var response = this.http.get(url).map(res => res.json()).catch(this.handleError);
    return response;
  }

  filterSearchCompanyDrug(searchText: string, compnayId: number): Observable<any> {
    var url = "http://pulse.kg/api/v1/drugs/?format=json&search="+searchText+"&pharmacy__company="+compnayId;
    var response = this.http.get(url)
                    .map(res => res.json())
                    .catch(this.handleError);
    return response;
  }

  filterPharmacies(searchText: string, companyId: number, openning_hours: number, countryId: number, regionId: number, cityId: number): Observable<any> {
    var url = "http://pulse.kg/api/v1/pharmacies/?format=json&company="+companyId+"&opening_hours="+openning_hours+"&country="+countryId+"&region="+regionId+"&city="+cityId;
    var response = this.http.get(url)
                    .map(res => res.json())
                    .catch(this.handleError);
    return response;
  }

  findDrugs(drug_name: string): Observable<any> {
    var url = "http://pulse.kg/api/v1/drugs/?format=json&search="+drug_name;
    var response = this.http.get(url)
                    .map(res => res.json())
                    .catch(this.handleError);
    return response;
  }

  getDetailsDrug(id: number): Observable<any> {
    var url = "http://pulse.kg/api/v1/drugs/"+id+"/?format=json";
    var response = this.http.get(url)
                    .map(res => res.json())
                    .catch(this.handleError);
    return response;
  }

  private handleError (error: any): any{
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
