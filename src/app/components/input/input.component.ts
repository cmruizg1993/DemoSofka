import { Type } from '@angular/compiler';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() class: string = '';
  @Input() formControlName?: string;
  
  @Output() modelUpdate = new EventEmitter<any>();
  
  private privateModel: any;

  set model(newModel: any){
    this.privateModel = newModel;
    this.onModelChange();
  }
  get model(){
    return this.privateModel;
  }
  onModelChange(){
    //console.log(this.model);
    this.modelUpdate.emit(this.model);
  }
}
