import { Component, OnInit } from '@angular/core';
import { Global } from '../global';
import { ApiGenericService } from '../services/api-generic.service';

export interface SWObject {
  id: string;
  name: string;
  climate: string;
  terrain: string;
  quantityShowedFilms: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoadingResults: boolean = false;

  displayedColumns: string[] = [
    'name',
    'climate',
    'terrain',
    'quantityShowedFilms',
    'edit',
    'exclude',
  ];

  dataSource!: SWObject[];

  constructor(private apiGenericService: ApiGenericService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    console.log(Global.API_URL);

    this.apiGenericService.get(Global.API_URL).subscribe({
      next: (response: SWObject[]) => {
        this.dataSource = response;
        console.log(response);

        // dataSour
      },
    });
  }
}
