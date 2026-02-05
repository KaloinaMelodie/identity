import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
   standalone: false,
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() fullscreen: boolean = false;
  @Input() color: 'primary' | 'success' = 'primary';
}