import { Component,Input,Output,EventEmitter,OnInit} from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import {FieldErrorDisplayComponent} from '../field-error-display/field-error-display.component';
@Component({
    selector:'form-builder',
    template:`
      <!--  <form (ngSubmit)="onSubmit($event)" [formGroup]="form" class="form-horizontal" > -->
    <div class="card" >
     <div class="card-header">{{formTitle}}</div>
      <div class="card-body">
        <form (submit)="onsubmit.emit(this.form.value)" [formGroup]="form"  >
            <div fxLayout="row wrap" >
              <div 
                fxFlex.md="33"
                fxFlex.sm="50"
                fxFlex.xs="100"
                fxLayout="column"
                style="padding: 5px;"
                fxFlex="0 1 calc(50.3% - 32px)"
                *ngFor="let field of fields" >
                    <field-builder  [field]="field" [form]="form" ></field-builder> 
              </div>
           </div>

            
            <div class="col-md-3">
              <div class="col-md-9">
                <button type="submit"  class="btn btn-warning">Save</button>
              </div>
            </div>
              
        </form>
      </div>
      </div>
    `
})
export class FormBuilderComponent {

 @Input() fields: any[]=[];
 @Input() formTitle: any;

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