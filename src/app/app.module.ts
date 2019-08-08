import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';



import { FormBuilderModule } from './form-builder/form-builder.module';
import { AppComponent } from './app.component';

@NgModule({
    imports: [ BrowserModule, ReactiveFormsModule , FormBuilderModule],
    exports:[],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule{

}