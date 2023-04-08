import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { SalesService } from '../sales.service';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  dealsData: any[] = [];
  potential_value: any[] = [];
  focus: any[] = [];
  contact_made: any[] = [];
  offer_sent: any[] = [];
  getting_ready: any[] = [];
  currentDate:any;
  term:any;
  constructor(private _salesService: SalesService) { }

  ngOnInit(): void {
    this.getData()
    this.currentDate = new Date();
  }

  getData() {
    this._salesService.getDeals().subscribe({
      next: (res) => {
        this.dealsData = res.deals;
        this.filterData()
        this.term='';
      }
    })
  }
  filterData(){
    if (this.dealsData) {
      for (let i = 0; i < this.dealsData.length; i++) {
        if (this.dealsData[i].status == 'Potential Value') {
          this.potential_value.push(this.dealsData[i])
        }
        else if (this.dealsData[i].status == 'Focus') {
          this.focus.push(this.dealsData[i])
        }
        else if (this.dealsData[i].status == 'Contact Made') {
          this.contact_made.push(this.dealsData[i])
        }
        else if (this.dealsData[i].status == 'Offer Sent') {
          this.offer_sent.push(this.dealsData[i])
        }
        else if (this.dealsData[i].status == 'Getting Ready') {
          this.getting_ready.push(this.dealsData[i])
        }
      }
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.filterData()
  }
  isFutureDate(idate:any){
    var today = new Date().getTime(),
        idate = idate.split("/");
    idate = new Date(idate[2], idate[1] - 1, idate[0]).getTime();
    return (today - idate) < 0 ? true : false;
    }
}
