import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  genders = ['male', 'female'];
  signupForm:FormGroup;
  forbiddenUsernames=['Chris','Anna']
  ngOnInit()
  {
    this.signupForm=new FormGroup({
      'userData': new FormGroup({
      'username':new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),
      'email':new FormControl(null,[Validators.required,Validators.email])
      }),
      'gender':new FormControl('male'),
      'hobbies':new FormArray([])
    });
  }
  onSubmit()
  {
    console.log(this.signupForm);
    this.signupForm.reset(); 
  }
  onAddHobby()
  {
    const control=new FormControl(null,Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  
  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }
  forbiddenNames(control:FormControl):{[s:string]:boolean}{
    if(this.forbiddenUsernames.indexOf(control.value))
    {
      return {'nameIsForbidden':true};
    }
    return null; 
  }
  
}
