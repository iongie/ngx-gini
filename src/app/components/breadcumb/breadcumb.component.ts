import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'gx-breadcumb',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './breadcumb.component.html',
  styleUrl: './breadcumb.component.css'
})
export class BreadcumbComponent implements OnInit {
  @Input() home!: string;
  breadcumb!: string[];
  url!: string;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.breadcumb = this.parseUrlToArray(this.router.url);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.breadcumb = this.parseUrlToArray(this.router.url)
      }
    });
  }

  parseUrlToArray(url: string): string[] {
    return url
      .split('/')
      .filter((segment) => segment !== '');
  }

  getBreadcrumbUrl(index: number): string {
    return '/' + this.breadcumb.slice(0, index + 1).join('/');
  }
}
