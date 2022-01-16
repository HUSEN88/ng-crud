import { Component, OnInit, TemplateRef } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  modalRef?: BsModalRef;
  users:User[] = []
  loader:boolean = false;
  searchText:string = "";
  searching:boolean = false;
  filteredUsers:User[] = [];
  error:boolean = false;
  createFailed:boolean = false;

  // form controls for creating user
  createForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    location: new FormControl('', Validators.required),
  });
  constructor(private crudService: CrudService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  // open create user modal
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // getting list of users
  getUsers() {
    this.loader = true;
    this.crudService.getUsers().subscribe((users:any) => {
      this.users = users;
      console.log(this.users);
      if(this.searching) {
        this.searchInput();
      }
      this.error = false;
      this.loader = false;
    },
    (error) => {
      this.loader = false;
      this.error = true;
    })
  }

  // deleting user
  deleteUser(id: number) {
    console.log('hi')
    this.crudService.deleteUser(id).subscribe(() => {
      this.error = false;
      this.getUsers();
    },(error) => {
      this.error = true;
    });
  }

  //search by email method
  searchInput() {
    if (this.searchText) {
      this.searching = true;
      this.searchText = this.searchText.toLocaleLowerCase();
      return this.filteredUsers = this.users.filter((item:any) => {
        if (item.hasOwnProperty('email')) {
          let value = item['email'];
          if (typeof value === "string") {
            value = value.toLocaleLowerCase();
          }
          return value.toString().indexOf(this.searchText) !== -1;
        }
      });
    } else {
      this.searching = false;
      return this.getUsers();
    }
  }

  // create user method
  createUser(form:any) {
    let id = new Date().valueOf();
    form['id'] = id;
    this.crudService.createUser(form).subscribe((res:any) => {
      this.createForm.reset();
      this.modalRef?.hide();
      this.createFailed = false;
      this.getUsers();
    },
    (error) => {
      this.createFailed = true;
    })
  }
}
