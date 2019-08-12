import { Component,Input,Output,EventEmitter,OnInit} from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import {FieldErrorDisplayComponent} from '../field-error-display/field-error-display.component';
@Component({
    selector:'form-builder',
    template:`

      <!--  <form (ngSubmit)="onSubmit($event)" [formGroup]="form" class="form-horizontal" > -->
        <form (submit)="onsubmit.emit(this.form.value)" [formGroup]="form" class="form-horizontal" >
            <div fxLayout="row" >
            <div *ngFor="let field of fields" fxLayoutAlign="end" fxFlexOrder="field.order" 
               [ngClass]="displayFieldCss(field.name)">
                <field-builder [field]="field" [form]="form"></field-builder>
                <!--<app-field-error-display [displayError]="isFieldValid(field.name)" 
                [errorMsg]="field.validations[0].message">
				        </app-field-error-display>  -->
            </div>
            </div>
            <div class="form-row"></div>
            <div class="form-group row">
                <div class="col-md-3"></div>
                <div class="col-md-9">
                  <button type="submit"  class="btn btn-warning">Save</button>
                </div>
            </div>
        </form>
    `
})
export class FormBuilderComponent {
  
 @Input() fields: any[]=[];
 @Output() submit= new EventEmitter();
 form:FormGroup

  constructor() { }

  ngOnInit() {
      let fieldControls= {};
      for(let field of this.fields){
        if(field.type!='checkbox'){
           // fieldControls[field.name]=new FormControl(field.value || '',Validators.required);
            fieldControls[field.name]=new FormControl(field.value || '',this.bindValidations(field.validations || []));
        }else{
            let opts = {};
            for(let opt of field.options){
                opts[opt.key]=new FormControl(opt.value);
            }

            fieldControls[field.name]=new FormGroup(opts);
        }
      }

      this.form = new FormGroup(fieldControls);
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
 }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
}

 isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

 validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }

    });
}

 reset(){
    this.form.reset();
  }

}