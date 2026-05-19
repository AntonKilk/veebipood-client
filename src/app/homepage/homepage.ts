import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {
  products: any[] = [];

  ngOnInit() {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(json => this.products = json.content)
  }


}
