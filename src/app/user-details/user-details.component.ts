import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user.model';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userid:any;
  loader:boolean = false;
  userDetails:User = {};
  error:boolean = false;
  constructor(private route: ActivatedRoute, private crudService: CrudService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params)
      this.userid = params['id'];
      console.log(this.userid)
      this.loader = true;
      this.getUser();
    });
  }

  getUser() {
    this.crudService.getUser(this.userid).subscribe((user:User) => {
      console.log(user)
      this.userDetails = user;
      this.loader = false;
    },
    (error)=> {
      this.loader = false;
      this.error = true;
    })
  }
}
