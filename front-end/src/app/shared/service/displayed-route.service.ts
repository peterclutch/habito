import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({providedIn: 'root'})
export class DisplayedRouteService {

  findRouterData(routeSnapshot: ActivatedRouteSnapshot, dataKey: string): any {
    if (routeSnapshot && Object.keys(routeSnapshot.data).length > 0 && routeSnapshot.data[dataKey] !== undefined) {
      return routeSnapshot.data[dataKey];
    } else if (routeSnapshot.firstChild) {
      return this.findRouterData(routeSnapshot.firstChild, dataKey);
    } else {
      return undefined;
    }
  }
}
