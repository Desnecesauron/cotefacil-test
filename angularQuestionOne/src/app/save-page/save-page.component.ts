import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiGenericService } from '../services/api-generic.service';
import { Global } from '../global';
import { SWObject } from '../interfaces/swobject';
import { SnackBarDefaultsService } from '../services/snack-bar-defaults.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-save-page',
  templateUrl: './save-page.component.html',
  styleUrls: ['./save-page.component.scss'],
})
export class SavePageComponent implements OnInit {
  id!: string;
  isLoadingResults: boolean = false;
  SWRow: SWObject = {
    climate: '',
    id: '',
    name: '',
    quantityShowedFilms: Number(null),
    terrain: '',
  };

  public sWObjectForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    climate: new FormControl('', Validators.required),
    terrain: new FormControl('', Validators.required),
    quantityShowedFilms: new FormControl(),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiGenericService,
    private snackBar: SnackBarDefaultsService
  ) {}

  ngOnInit(): void {
    this.isLoadingResults = true;
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.getSWObjectById();
    } else {
      this.isLoadingResults = false;
    }
  }

  getSWObjectById() {
    this.isLoadingResults = true;
    this.apiService.get(Global.API_URL + 'id/' + this.id).subscribe({
      next: (response: SWObject) => {
        //check if has this unit stored in db
        if (!response) {
          this.router.navigate(['/']);
          return;
        }

        this.SWRow = response;
        this.isLoadingResults = false;
        this.setDataForForm();
      },
      error: (err) => {
        this.isLoadingResults = false;
        this.snackBar.messageDefaultError();
      },
    });
  }

  save() {
    if (!this.sWObjectForm.valid) {
      this.snackBar.messageDefaultFormError();
      return;
    }

    this.getDataFromForm();

    this.isLoadingResults = true;

    this.apiService.post(Global.API_URL, this.SWRow).subscribe({
      next: (response: SWObject) => {
        this.SWRow = response;
        this.isLoadingResults = false;
        this.snackBar.messageDefaultOK();
      },
      error: (err) => {
        this.isLoadingResults = false;
        this.snackBar.messageDefaultError();
      },
    });
  }

  getDataFromForm() {
    if (this.sWObjectForm.value.id) {
      this.SWRow.id = this.sWObjectForm.value.id;
    }

    if (this.sWObjectForm.value.name) {
      this.SWRow.name = this.sWObjectForm.value.name;
    }

    if (this.sWObjectForm.value.climate) {
      this.SWRow.climate = this.sWObjectForm.value.climate;
    }

    if (this.sWObjectForm.value.terrain) {
      this.SWRow.terrain = this.sWObjectForm.value.terrain;
    }

    if (this.sWObjectForm.value.quantityShowedFilms) {
      this.SWRow.quantityShowedFilms =
        this.sWObjectForm.value.quantityShowedFilms;
    }
  }

  setDataForForm() {
    this.sWObjectForm = new FormGroup({
      id: new FormControl(this.SWRow.id, Validators.required),
      name: new FormControl(this.SWRow.name, Validators.required),
      climate: new FormControl(this.SWRow.climate, Validators.required),
      terrain: new FormControl(this.SWRow.terrain, Validators.required),
      quantityShowedFilms: new FormControl(this.SWRow.quantityShowedFilms),
    });
  }
}
