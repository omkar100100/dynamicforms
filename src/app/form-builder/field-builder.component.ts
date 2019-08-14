import { Component,Input,OnInit} from '@angular/core';

@Component({
    selector: 'field-builder',
    template: `
       
        <div  [formGroup]="form" fxFlexOrder={{field.order}} fxLayout="row nowrap" fxLayoutGap="5px">
            <label class="col-md-3 form-control-label" [attr.for]="field.label">{{field.label}}</label>
            <strong class="text-danger" *ngIf="field.required">*</strong>
            <div class="col-mod-9" [ngSwitch]="field.type" >
                <textbox *ngSwitchCase="'text'" [field]="field" [form]="form"></textbox>
                <dropdown *ngSwitchCase="'dropdown'" [field]="field" [form]="form"></dropdown>
                <checkbox *ngSwitchCase="'checkbox'" [field]="field" [form]="form"></checkbox>
                <radio *ngSwitchCase="'radio'" [field]="field" [form]="form"></radio>
                <file *ngSwitchCase="'file'" [field]="field" [form]="form"></file>
    
               <!-- <div class="alert alert-danger my-1 p-2 fadeInDown animated" *ngIf="!isValid && isDirty">{{field.label}} is required</div> -->
                <div class="alert alert-danger my-1 p-2 fadeInDown animated" *ngIf="!isValid && isDirty">{{field.label}} is required</div>
            </div>
        </div>
     
    `
})
export class FieldBuilderComponent implements OnInit {
    
    @Input() field:any;
    @Input() form: any;

    ngOnInit(){

    }

    get isValid() { return this.form.controls[this.field.name].valid; }
    get isDirty() { return this.form.controls[this.field.name].dirty; }

    constructor() { }
}