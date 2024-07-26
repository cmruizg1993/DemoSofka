import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CristianRuiz';
  subscription = new Subscription();
  loading = true;
  constructor(private loaderService: LoaderService){
    
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subscription = this.loaderService.loaderStatus.subscribe(state => this.loading = state);
    setTimeout(()=>{
      this.loaderService.currentStatus();
    }, 0)
  }

}
