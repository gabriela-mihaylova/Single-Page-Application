import { Component, OnInit } from '@angular/core';

import {Subject} from 'rxjs';
import {Organization} from '../organization_model';
import {AuthServiceOrganization} from '../auth.service.organization';
import {takeUntil} from 'rxjs/operators';
import {PostService} from '../../post.service';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss']
})
export class OrganizationProfileComponent implements OnInit {
  organizations: Organization;
  destroy$ = new Subject<boolean>();

  constructor(private authServiceOrganization: AuthServiceOrganization, private postService: PostService) { }

  ngOnInit(): void {
    this.getContent();

  }
  private getContent(): void{
    // const user = this.users.find(x =>x.id === id)
    this.authServiceOrganization.getLoggedOrganization();
    // this.users = this.authService.getLoggedUser();

    /* this.authService.getUsers().pipe(takeUntil(this.destroy$))
      .subscribe((stream) => stream.find(x => x.name === this.authService.getLoggedUser().name ));*/
    this.authServiceOrganization.getCurrentOrganization().pipe(takeUntil(this.destroy$)).subscribe((response) => {
      this.organizations = response;
    });
  }

  onDelete(organizationId: number): void{
    this.authServiceOrganization.deleteOrganization(organizationId).pipe(takeUntil(this.destroy$)).
    subscribe(_ => {
      this.getContent();
    }, (error ) => {
      console.log(error);
    } );

  }


}
