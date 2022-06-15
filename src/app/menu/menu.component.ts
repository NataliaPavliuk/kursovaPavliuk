import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    let AccordionMenu = function(selector:any) {
      var colMenu = document.querySelectorAll(`${selector} li`);
      colMenu.forEach(function(items:any) {
          if (items.querySelector('ul')) {
              items.firstElementChild.insertAdjacentHTML('beforeend', '<svg class="svg_class" version="1.1" style="width: 13px; fill: white;" x="0px" y="0px" viewBox="0 0 451.847 451.847" xml:space="preserve"> <g> <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751 c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0 c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/> </g> </svg>');
  
              items.firstElementChild.onclick = function(e:any) {
                  e.preventDefault();
                  
                  let isTrue = this.parentElement.classList.toggle('open');
  
                  if (isTrue) {
                    AccordionMenu.prototype.show(this.nextElementSibling);
                  } else {
                    AccordionMenu.prototype.hide(this.nextElementSibling);
                  }
              }
          } 
      })
    }
    
    // Show an element
    AccordionMenu.prototype.show = function(elem:any) {
      // Get the natural height of the element

      var getHeight = function() {
          elem.style.display = 'block'; // Make it visible
          var height = elem.scrollHeight + 'px'; // Get it's height
          return height;
      };
  
      var height = getHeight(); // Get the natural height
      elem.style.height = height; // Update the height
      
      setTimeout(function() {
          elem.style.height = 'auto';
      }, 350);
    };
  
    // Hide an element
    AccordionMenu.prototype.hide = function(elem:any) {
      // Give the element a height to change from
      elem.style.height = elem.scrollHeight + 'px';
  
      // Set the height back to 0
      setTimeout(function() {
          elem.style.height = '0';
      }, 110);
  
      setTimeout(function() {
          elem.style.display = '';
      }, 700);

    };
    
    AccordionMenu('.col-menu');
  }

}
