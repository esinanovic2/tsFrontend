import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GroupService} from '../group.service';
import {GroupModel} from '../group.model';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {
  groupForm: FormGroup;
  editMode = false;
  id: number;
  constructor(private groupService: GroupService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  private initForm() {
    let groupName = '';

    if (this.editMode) {
      groupName = this.groupService.getGroup(this.id).groupName;
    }

    this.groupForm = new FormGroup({
      'groupName': new FormControl(groupName, [Validators.required, Validators.maxLength(30), this.differentGroupName.bind(this)]),
    });
  }

  onSubmit() {
    let tempGroup = new GroupModel(null, null);
    if (this.editMode) {
      tempGroup = this.groupService.getGroup(this.id);
      tempGroup.groupName = this.groupForm.get('groupName').value;
      this.groupService.updateGroup(this.id, tempGroup);
    } else {
      tempGroup = new GroupModel(this.groupService.getNextId(), this.groupForm.get('groupName').value);
      this.groupService.addGroup(tempGroup);
    }
    this.router.navigate(['/groups']);
  }

  differentGroupName(control: FormControl): {[s: string]: boolean} {
    if (this.groupService.checkGroupNameExists(control.value)) {
      return {'nameMustBeUnique': true};
    }
    return null;
  }
}
