import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor( private service:ApiserviceService,private router:ActivatedRoute) { }
  errormsg:any
  successmsg:any
  getparamid:any

  ngOnInit(): void {
    console.log("checking for update ", this.getparamid=this.router.snapshot.paramMap.get('id'),'getid')
    this.getparamid=this.router.snapshot.paramMap.get('id')
    // if(this.getparamid){
      this.service.getSingleData(this.getparamid).subscribe((res)=>{
        console.log(res,"response")
        this.userForm.patchValue({
          id:res.data[0].id,
          fullname:res.data[0].fullname,
          email:res.data[0].email,
          mobile:res.data[0].mobile,
         
          
        });
  
      });
      
    // }
    
  }

  userForm=new FormGroup({
    id:new FormControl('',Validators.required),
  fullname:new FormControl('',Validators.required),
  email:new FormControl('',Validators.email),
  mobile:new FormControl('',Validators.minLength(10),),
  
  })

  // createnew user
  userSubmit(){
    console.log(this.userForm.valid)
    if(this.userForm.valid){
      console.log(this.userForm.value)
      this.service.createData(this.userForm.value).subscribe((res)=>{
      this.userForm.reset();
      this.successmsg=res.message
      })
    }else{
     this.errormsg='All field is required'
    }

  }

  // update user
  userUpdate(){

    console.log(this.userForm.value,'updateform')
    if(this.userForm.valid){
      this.service.updateData(this.userForm.value,this.getparamid).subscribe((res)=>{
        console.log("resupdated",res)
        this.successmsg=res.message

      })
    }else{
      console.log("user is not updated")
      this.errormsg="all field is required"
    }
  }
}
