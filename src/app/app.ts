import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'div[app-root]',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('identity');
  ngOnInit() {
    console.log('🚀 App Version: 2.0.0');  
    console.log('🔧 Environment:', environment);
    console.log('🌐 API URL:', environment.apiUrl);
    console.log('📦 Production:', environment.production);
  }
}
