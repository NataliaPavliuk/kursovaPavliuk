import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';
import { AppBarComponent } from './app-bar/app-bar.component';
import { RightBarComponent } from './right-bar/right-bar.component';
import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MenuComponent } from './menu/menu.component';


const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    WeatherWidgetComponent,
    AppBarComponent,
    RightBarComponent,
    HomeComponent,
    NotFoundComponent,
    MenuComponent
  ],
  imports: [
    [ BrowserModule, RouterModule.forRoot(appRoutes)]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
