import { Component, OnInit } from '@angular/core';
import { Global } from '../global';
import { ApiGenericService } from '../services/api-generic.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SnackBarDefaultsService } from '../services/snack-bar-defaults.service';
import { Router } from '@angular/router';
import { SWObject } from '../interfaces/swobject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoadingResults: boolean = false;

  displayedColumns: string[] = [
    'id',
    'name',
    'climate',
    'terrain',
    'quantityShowedFilms',
    'edit',
    'exclude',
  ];

  public searchForm = new FormGroup({
    nameSearch: new FormControl(''),
    idSearch: new FormControl(''),
  });

  dataSource!: SWObject[];

  constructor(
    private apiGenericService: ApiGenericService,
    private snackBar: SnackBarDefaultsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isLoadingResults = true;
    this.apiGenericService.get(Global.API_URL).subscribe({
      next: (response: SWObject[]) => {
        this.dataSource = response;
        this.isLoadingResults = false;
      },
      error: (err) => {
        this.snackBar.messageDefaultError();
      },
    });
  }

  getDataByName() {
    if (this.searchForm.get('nameSearch')?.value) {
      this.isLoadingResults = true;
      this.apiGenericService
        .get(
          Global.API_URL + 'name/' + this.searchForm.get('nameSearch')?.value
        )
        .subscribe({
          next: (response: SWObject[]) => {
            this.dataSource = response;
            this.isLoadingResults = false;
          },
          error: (err) => {
            this.snackBar.messageDefaultError();
          },
        });
    } else {
      this.getData();
    }
  }

  getDataById() {
    if (this.searchForm.get('idSearch')?.value) {
      this.isLoadingResults = true;
      this.apiGenericService
        .get(
          Global.API_URL +
            'id-containing/' +
            this.searchForm.get('idSearch')?.value
        )
        .subscribe({
          next: (response: SWObject[]) => {
            this.dataSource = response;
            this.isLoadingResults = false;
          },
          error: (err) => {
            this.snackBar.messageDefaultError();
          },
        });
    } else {
      this.getData();
    }
  }

  deleteRow(id: string) {
    if (id) {
      this.isLoadingResults = true;
      this.apiGenericService.delete(Global.API_URL + 'delete/' + id).subscribe({
        next: (value) => {
          this.snackBar.messageDefaultOK();
          this.isLoadingResults = false;
          if (this.searchForm.get('nameSearch')?.value) {
            this.getDataByName();
            return;
          }
          if (this.searchForm.get('idSearch')?.value) {
            this.getDataById();
            return;
          }
          this.getData();
        },
        error: (err) => {
          this.snackBar.messageDefaultError();
        },
      });
    }
  }

  editRow(id: string) {
    this.router.navigate(['/save', id]);
  }
}
