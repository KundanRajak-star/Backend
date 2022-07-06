import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  router: any;

  constructor(private service:ApiserviceService) { }

  readData:any;
  successmsg:any;
  getparamid:any
  ngOnInit(): void {  
    this.service.getAllData().subscribe((res)=>{
      console.log(res,"res===>  ll")
      this.readData=res.data
    })
   
  }
  delete(id:any){
    this.service.deleteData(id).subscribe(res=>{
      console.log(res,"delete data")
      this.successmsg=res.message

      this.service.getAllData().subscribe(res=>{
        console.log(res,"res===>  ll")
        this.readData=res.data
      })
    })
  }

}