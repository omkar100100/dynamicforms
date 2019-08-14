import {Component,ViewChild,ElementRef} from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { Validators } from "@angular/forms";
import {FormBuilderComponent} from './form-builder/form-builder.component'
import {AppConstants} from './constants/AppConstants'



interface User{
  firstName:String,
  lastName:String
}

interface Country{
  key:String,
  label:String
}

@Component({
    selector:'my-app',
    templateUrl:'./app.component.html'
})
export class AppComponent {

 
    isCollapsed=false;
    currentForm=AppConstants.SEARCH_FORM;

    public form:FormGroup;
    unsubscribe:any;

    user:User={
      firstName: 'chandra sekhar',
      lastName: 'avula'
     
    }

    countries:Country[]=[
       { key: 'in', label: 'India' },
       { key: 'us', label: 'USA' },
       { key: 'pak', label: 'Pakistan' },
    ]

     public searchFields:any = [
      {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      value: '',
      required: true,
      order:7,
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "First Name Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z]+$"),
          message: "Accept only text"
        }
        ]

    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      value: '',
      required: false,
      order:6
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      value: '',
      required: false,
      order:5
    }];
     

    public regFields:any = [
      {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      value: this.user.firstName,
      required: true,
      order:7,
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "First Name Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z]+$"),
          message: "Accept only text"
        }
        ]

    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      value: this.user.lastName,
      required: true,
      order:6
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      value: '',
      required: true,
      order:5
    },

    {
      type: 'file',
      name: 'picture',
      label: 'Picture',
      required: true,
      onUpload: this.onUpload.bind(this),
      order:4
    },
    {
      type: 'dropdown',
      name: 'country',
      label: 'Country',
      value: 'in',
      required: true,
      options:this.countries,
      order:3
    },
    {
      type: 'radio',
      name: 'gender',
      label: 'Gender',
      value: 'm',
      required: true,
      options: [
        { key: 'm', label: 'Male' },
        { key: 'f', label: 'Female' }
      ],
      order:2
    },
    {
      type: 'checkbox',
      name: 'hobby',
      label: 'Hobby',
      required: true,
      options: [
        { key: 'f', label: 'Fishing' },
        { key: 'c', label: 'Cooking' }
      ],
      order:1
    }
    ]
    constructor(){
        this.form = new FormGroup({
            fields: new FormControl(JSON.stringify(this.regFields))
        });
        this.unsubscribe = this.form.valueChanges.subscribe( (update)=> {
            console.log(update);
            this.regFields = JSON.parse(update.fields);
        });
    }

    onUpload(event){
        console.log(event);
    }

   getFields(formName:String){
      switch(formName){
        case AppConstants.SEARCH_FORM: 
            return this.searchFields
        case AppConstants.REGISTRATION_FORM:
            return this.regFields

      }
    }

    ngDestroy(){
        this.unsubscribe();
    }
}