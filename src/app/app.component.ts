import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import axios from 'axios';

export interface AnimalData {
  API: string;
  Description: string;
  Auth: string;
  Cors: string;
  Category: string;
  HTTPS: boolean;
  Link: string;
}



@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  displayedColumns: string[] = ['API', 'Description', 'HTTPS', 'Cors', 'Link'];
  dataSource!: MatTableDataSource<AnimalData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  // constructor() {

  //   const data: AnimalData[] = 
  //      [
  //       {
  // "API": "AdoptAPet",
  // "Description": "Resource to help get pets adopted",
  // "Auth": "apiKey",
  // "HTTPS": true,
  // "Cors": "yes",
  // "Link": "https://www.adoptapet.com/public/apis/pet_list.html",
  // "Category": "Animals"
  // },
  // {
  // "API": "Axolotl",
  // "Description": "Collection of axolotl pictures and facts",
  // "Auth": "",
  // "HTTPS": true,
  // "Cors": "no",
  // "Link": "https://theaxolotlapi.netlify.app/",
  // "Category": "Animals"
  // }]

  //   // Assign the data to the data source for the table to render
  //   // this.dataSource = new MatTableDataSource(r.data.entries);
    
  //   
  // 
  
  ngAfterViewInit() {
    axios.get('https://api.publicapis.org/entries')
    .then(r => {
      // handle success
      console.log(r.data.entries);
      this.dataSource = new MatTableDataSource(r.data.entries)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}






