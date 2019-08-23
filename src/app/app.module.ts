import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CollapseModule} from 'ngx-bootstrap';


import { FormBuilderModule } from './form-builder/form-builder.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [ BrowserModule, ReactiveFormsModule ,FlexLayoutModule, FormBuilderModule,CollapseModule.forRoot()],
    exports:[],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule{

}