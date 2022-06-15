import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'; 
import {MDCList} from '@material/list';
import {MDCRipple} from '@material/ripple';
import {MDCTextField} from '@material/textfield';
import JsonData from '../../assets/data.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  UserStatus = JsonData.UserStatus;
  Sales = JsonData.Sales;
  PageViews = JsonData.PageViews;

  constructor() { }

  ngOnInit(): void {
    const mdc_list = new MDCList(document.querySelector('.mdc-list'));
    const accordion_list = document.querySelectorAll('.list-accordion');
    const textField = new MDCTextField(document.querySelector('.mdc-text-field'));
    const DATA_COUNT = (JsonData.chart_line.labels).length;
    const labels = [];
    var chart_line_element = (document.getElementById("line-chart") as HTMLCanvasElement).getContext("2d");
    var chart_doughnut_element = (document.getElementById("doughnut-chart") as HTMLCanvasElement).getContext("2d");

    var gradient = chart_line_element.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(83,1,1,1)');   
    gradient.addColorStop(1, 'rgba(249,14,2,1)');

    for (let i = 0; i < DATA_COUNT; ++i) {
        labels.push(i.toString());
    }

    var chart_line = new Chart(chart_line_element, {
      type: 'line',
      data: {
        labels: JsonData.chart_line.labels,
        datasets: [{
            data: JsonData.chart_line.points,
            borderColor: 'white',
            borderWidth : 2,
            fill: true,
            steppedLine: false,
            pointBackgroundColor: '#f90e02',
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 5,
            cubicInterpolationMode: 'monotone',
            backgroundColor: gradient
        }, {
            fill: true,
            data: [100, 100, 100, 100, 100, 100],
            backgroundColor: '#f90e02',
            pointBorderWidth: 0,
            pointRadius: 0,
        }]
      },
      options: {
          responsive: true,
          title: {
            display: false
          },
          legend: {
            display: false
          },
          scales: {
            yAxes:[{
              ticks: { reverse: false, stepSize: JsonData.chart_line.stepSize }
            }]
          }
        }
        
    });
  
    var chart_doughnut = new Chart(chart_doughnut_element, {
      type: 'doughnut',
      data: {
        labels: JsonData.chart_doughnut.labels,
        datasets: [{
          label: '# of Tomatoes',
          data: JsonData.chart_doughnut.points,
          pointRadius: 20,
          backgroundColor: JsonData.chart_doughnut.backgroundColor,
          borderColor: JsonData.chart_doughnut.borderColor,
        }]
      },
      options: {
        cutoutPercentage: JsonData.chart_doughnut.cutoutPercentage,
        responsive: false,
        legend: {
          display: false
        }
      }
    });
    
    const list2 = new MDCList(document.querySelector('.mdc-list'));
    const listItemRipples = list2.listElements.map((listItemEl) => new MDCRipple(listItemEl));
  }
}