import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm : FormGroup;
  forbiddenUsername = ['suraj','chand','taare']


  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
          'username' : new FormControl('',[Validators.required, this.getforbiddenNames.bind(this)]),
          'email' : new FormControl('',[Validators.required, Validators.email],this.getforbiddenEmails)
      }),
      'gender' : new FormControl('male'),
      'hobbies' : new FormArray([])
    })
    this.signupForm.statusChanges.subscribe((value)=>{
      console.log(this.signupForm)
    })
    // this.signupForm.valueChanges.subscribe((value)=>{
    //   console.log(this.signupForm)
    // })
  }

  onSubmit(){
    console.log(this.signupForm)
  }

  getControls(){
    return (this.signupForm.get('hobbies') as FormArray).controls
  }
  
  addHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
}

  getforbiddenNames(control : FormControl) : {[s:string]:boolean}{
    if(this.forbiddenUsername.indexOf(control.value) !== -1){
      return {['User name is forbidden'] : true}
    }
    return null;
  }

  getforbiddenEmails(control : FormControl): Promise<any> | Observable<any>{
      const promise = new Promise<any>((resolve,reject)=>{
        setTimeout(()=>{
          if(control.value === 'test@test.com'){
            console.log("resolve")
            resolve({'emailIsForbidden':true})
          }else{
            resolve(null);
          }
        }, 1500)
      });
      return promise
  }
}
