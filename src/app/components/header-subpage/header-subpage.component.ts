import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-subpage',
  templateUrl: './header-subpage.component.html',
  styleUrls: ['./header-subpage.component.scss'],
})
export class HeaderSubpageComponent  implements OnInit {
@Input()
public titulo:string='';
  constructor() { }

  ngOnInit() {}

}
