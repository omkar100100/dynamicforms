import {Component} from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { Validators } from "@angular/forms";

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

    public fields:any = [
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
            fields: new FormControl(JSON.stringify(this.fields))
        });
        this.unsubscribe = this.form.valueChanges.subscribe( (update)=> {
            console.log(update);
            this.fields = JSON.parse(update.fields);
        });
    }

    onUpload(event){
        console.log(event);
    }

    getFields(){
        return this.fields;
    }

    ngDestroy(){
        this.unsubscribe();
    }
}