import { Component, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { BrowserModule } from "@angular/platform-browser"; 
import { BrowserAnimationsModule }  
    from "@angular/platform-browser/animations"; 
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ButtonModule, TooltipModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  date = new Date().getFullYear();
  constructor() {}

  ngOnInit(): void {}

}
