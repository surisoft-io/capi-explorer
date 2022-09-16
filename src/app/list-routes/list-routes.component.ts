import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CapiRoute } from '../model/capi-route.model';
import { Api } from '../model/api.model';
import UIkit from 'uikit';
import { environment } from '../../environments/environment';

@Component({
  selector: 'list-routes',
  templateUrl: './list-routes.component.html',
  styleUrls: ['./list-routes.component.css']
})
export class ListRoutesComponent implements OnInit {

  searchText: string = "";
  loading: boolean = false;
  routeMap = new Map<string, CapiRoute>();
  displayedColumns: string[] = ['id', 'endpoints'];
  dataSource: CapiRoute[] = [];
  apiDetails: Api = new Api();
  timeLeft: number = 60;
  interval: any;
  openCoverages = false;
  indexSelectedCoverage = 1;

  dataLoaded: boolean = false;
  showSpinner: boolean = true;

  constructor(private http: HttpClient) {
    UIkit.modal("detailsModal",);
  }

  ngOnInit(): void {
    this.getRoutesThreadInfo();
  }

  getDetailsCall(routeId: string) {
    let normalizedRouteId = routeId.substring(0, routeId.lastIndexOf(":"));
    let endpoint = localStorage.getItem("capiEndpoint");
    return this.http.get(endpoint + environment.cachedApiEndpoint + normalizedRouteId);
  }

  getRoutesThreadInfoCall() {
    let endpoint = localStorage.getItem("capiEndpoint");
    return this.http.get(endpoint + environment.allRoutesEndpoint);
  }

  getDetails(routeId: string) {

    this.getDetailsCall(routeId)
      .subscribe((data: any) => {
        this.apiDetails = data;
        UIkit.modal("#detailsModal").show();
      });
  }

  getRoutesThreadInfo() {
    let tempRouteList: CapiRoute[] = [];
    this.getRoutesThreadInfoCall()
      .subscribe((data: any) => {
        let obj = data.value;
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            var val = obj[key];
            var id = val.RouteId;
            if (id.startsWith("rd_")) {

            } else {
              var route = new CapiRoute(id);
              route.exchangesCompleted = val.ExchangesCompleted;
              route.exchangesFailed = val.ExchangesFailed;
              route.exchangesInflight = val.ExchangesInflight;
              route.exchangesTotal = val.ExchangesTotal;
              route.lastProcessingTime = val.LastProcessingTime;
              route.maxProcessingTime = val.MaxProcessingTime;
              route.state = val.State;
              route.uptime = val.Uptime;
              this.routeMap.set(id, route);
              tempRouteList.push(route);
            }
          }
        }
        this.dataSource = tempRouteList;
        this.dataSource.sort((a, b) => a.id > b.id ? 1 : -1)
        this.dataSource.forEach((_routes) => {
          _routes.isExpanded = false;
        });
        this.dataLoaded = true;
        this.showSpinner = false;
      });
  }

  showDetails(route: CapiRoute) {
    if (!route.isExpanded) {
      this.loading = true;
      route.isExpanded = true;
      this.getDetails(route.id);
    } else {
      route.isExpanded = false;
    }
  }

  closeDetailsModal(route: CapiRoute) {
    route.isExpanded = false;
    UIkit.modal("#detailsModal").hide();
  }

  /*startTimer() {
    this.getRoutesThreadInfo();
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.getRoutesThreadInfo();
        this.timeLeft = 60;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }*/
}