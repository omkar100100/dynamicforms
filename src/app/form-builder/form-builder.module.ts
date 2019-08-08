import {NgModule} from '@angular/core';
import { TextBoxComponent } from './controls/input'
import { CheckBoxComponent } from './controls/checkbox';
import { DropDownComponent } from './controls/dropdown';
import { FileComponent } from './controls/file';
import { RadioComponent } from './controls/radio';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './form-builder.component';
import { FieldBuilderComponent } from './field-builder.component';
import { FieldErrorDisplayComponent } from '../field-error-display/field-error-display.component';
//import { FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    imports: [ReactiveFormsModule,CommonModule],
    declarations:[TextBoxComponent,CheckBoxComponent,DropDownComponent,FieldBuilderComponent,
    FileComponent,RadioComponent,FormBuilderComponent,FieldErrorDisplayComponent],
    exports:[FormBuilderComponent],
    providers:[]
})
export class FormBuilderModule{

}