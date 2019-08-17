import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import { Component } from '@angular/Core';
// import {ItemsComponent} from './items/items.component';
// import {PosComponent} from './pos/pos.component';
// import {TablesComponent} from './tables/tables.component';
// import {OrderComponent} from './order/order.component';
// import {ReportingComponent} from './reporting/reporting.component';
//
const routes: Routes = [
  // {path: '', redirectTo: '/reporting', pathMatch: 'full'},
  // {path: 'items', component: ItemsComponent},
  // {path: 'pos', component: PosComponent},
  // {path: 'tables', component: TablesComponent},
  // {path: 'orders', component: OrderComponent},
  // {path: 'reporting', component: ReportingComponent},
  {path: '**', component: AppComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {enableTracing: false}
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
