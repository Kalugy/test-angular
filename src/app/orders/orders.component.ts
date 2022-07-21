import { Component, OnInit , ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { OrdersService } from '../orders.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogOverviewExampleDialog} from './dialog/dialog'
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass'],
})
export class OrdersComponent implements OnInit {
  //Table
  data: any;
  params: any;
  displayedColumns: string[] = ['number', 'type', 'status', 'total'];
  //Tabs  
  tabs = [{
    title:'All Orders',
    filter:{status:'',type:'',currency:''},
    saved:true
  }];
  panelOpenState= false
  panelOpenStateCurrency=false
  panelOpenStateType=false
  previousSelectedTab : number=0; 
  selected : number = 0;
  currentSelected:number=0
  tabtitle : string = '';
  //Filter
  selectedStatusFilter: string='';
  statusFilters: string[] = ['open','archived'];

  selectedCurrencyFilter: string='';
  currencyFilters: string[] = ['USD','EUR'];

  selectedTypeFilter: string='';
  typeFilters: string[] = ['order','proposal'];

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.params = {};
    for (const param in this.route.snapshot.params) {
      this.params[param] = this.route.snapshot.params[param];
    }
    this.params.status ??= 'open';
    this.params.type ??= 'order';
    this.params.currency ??= '';
    this.tabs[0].filter.status = this.params.status;
    this.tabs[0].filter.type = this.params.type;
    this.tabs[0].filter.currency = this.params.currency;
    this.data = await lastValueFrom(
      this.ordersService.fetch({ params: this.params })
    );
  }
  addTab() {
    let newJson = this.validateData();
    if(newJson.error != undefined){
      return
    }
    if(this.tabtitle != ''){
       newJson.saved = true;
       this.tabs[this.selected] = newJson;
       this.tabtitle = ''; 
       this.selected = this.selected;
       this.savedTab = true
       this.cleanFilter()  
    }else{
       newJson.title = "Information Filter(No Save)"
       this.tabs.push(newJson);
       this.selected = this.tabs.length-1; 
    }
  }
  setValue(number:number){   
    this.previousSelectedTab = this.currentSelected; 
    this.currentSelected=number;
    this.selected=number;
    this.changeTab();
  }
  savedTab : boolean =false
  changeTab(){
    if(!this.tabs[this.previousSelectedTab].saved==true){
      this.removeTab(this.previousSelectedTab)
    }
    this.savedTab=this.tabs[this.selected].saved
    this.refreshData()
  }
  async refreshData(){
    let currentTab=this.selected == null? 0 : this.selected;
    const json = {
      status: this.tabs[currentTab].filter.status,
      type: this.tabs[currentTab].filter.type,
      currency: this.tabs[currentTab].filter.currency
    }
    console.log("params tab filtering" , json)
    this.data = await lastValueFrom(
      this.ordersService.fetch({ params: json })
    );
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  //Filter
  validateData(){
    let status = ""
    let currency = ""
    let type = ""
    if(this.selectedStatusFilter!=''){
      status=this.selectedStatusFilter;  
    }
    if(this.selectedCurrencyFilter!=''){
      currency=this.selectedCurrencyFilter;  
    }
    if(this.selectedTypeFilter!=''){
      type=this.selectedTypeFilter;  
    }
    if(status == '' && currency == '' && type == ''){
      return {error:"Nothing to filter"}
    }
    return {
      title : this.tabtitle,
      filter : {
          status : status,
          currency: currency,
          type : type
      },
      saved : false}
  }
  cleanFilter(){
    this.panelOpenState=false
    this.panelOpenStateCurrency=false
    this.panelOpenStateType=false
    this.selectedStatusFilter=''
    this.selectedCurrencyFilter=''  
    this.selectedTypeFilter=''  
  }
  //Dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {newTabName: ""},
    });
    dialogRef.afterClosed().subscribe(result => {
      //Dialog Closed Save Data
      this.tabtitle = result;
      this.addTab()
    });
  }

}