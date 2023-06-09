import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '../customer';

@Component({
  selector: 'app-po-items-sp',
  templateUrl: './po-items-sp.component.html',
  styleUrls: ['./po-items-sp.component.css']
})
export class PoItemsSpComponent implements OnInit {

  @Input() po : Invoice;

  public pvPo : Invoice = new Invoice();
  public pvwPo : Invoice = new Invoice();
  public acPo : Invoice = new Invoice();
  public battPo : Invoice = new Invoice();
  public otPo : Invoice = new Invoice();
  public protPo : Invoice = new Invoice();
  public cabPo : Invoice = new Invoice();

  public revealPV : boolean = false;
  public revealPVW : boolean = false;
  public revealAC : boolean = false;
  public revealBATT : boolean = false;
  public revealOT : boolean = false;
  public revealCab : boolean = false;
  public revealProt : boolean = false;

  constructor() { }

  private splitMainIntoSubPos() : void {
    
    for(let i = 0; i < this.po.invoiceItems.length; i++){

      if(this.po.invoiceItems[i].category == 'pv')
      {
          
          this.pvPo.invoiceItems.push(this.po.invoiceItems[i]);
          this.pvPo.amount += this.po.invoiceItems[i].productAmount*this.po.invoiceItems[i].quantity;
          this.pvPo.expense += this.po.invoiceItems[i].productExpense*this.po.invoiceItems[i].quantity;
          
          this.pvPo.profit += (this.po.invoiceItems[i].productAmount - this.po.invoiceItems[i].productExpense)*this.po.invoiceItems[i].quantity;
      }
      else if(this.po.invoiceItems[i].category == 'ac')
      {
          this.acPo.invoiceItems.push(this.po.invoiceItems[i]);
          this.acPo.amount += this.po.invoiceItems[i].productAmount*this.po.invoiceItems[i].quantity;
          this.acPo.expense += this.po.invoiceItems[i].productExpense*this.po.invoiceItems[i].quantity;
          this.acPo.profit += (this.po.invoiceItems[i].productAmount - this.po.invoiceItems[i].productExpense)*this.po.invoiceItems[i].quantity;
      }
      else if(this.po.invoiceItems[i].category == 'pvw')
      {
          this.pvwPo.invoiceItems.push(this.po.invoiceItems[i]);
          this.pvwPo.amount += this.po.invoiceItems[i].productAmount*this.po.invoiceItems[i].quantity;
          this.pvwPo.expense += this.po.invoiceItems[i].productExpense*this.po.invoiceItems[i].quantity;
          this.pvwPo.profit += (this.po.invoiceItems[i].productAmount - this.po.invoiceItems[i].productExpense)*this.po.invoiceItems[i].quantity;
      }
      if(this.po.invoiceItems[i].category == 'batt')
      {
          this.battPo.invoiceItems.push(this.po.invoiceItems[i]);
          this.battPo.amount += this.po.invoiceItems[i].productAmount*this.po.invoiceItems[i].quantity;
          this.battPo.expense += this.po.invoiceItems[i].productExpense*this.po.invoiceItems[i].quantity;
          this.battPo.profit += (this.po.invoiceItems[i].productAmount - this.po.invoiceItems[i].productExpense)*this.po.invoiceItems[i].quantity;
      }
      if(this.po.invoiceItems[i].category == 'ot')
      {
          this.otPo.invoiceItems.push(this.po.invoiceItems[i]);
          this.otPo.amount += this.po.invoiceItems[i].productAmount*this.po.invoiceItems[i].quantity;
          this.otPo.expense += this.po.invoiceItems[i].productExpense*this.po.invoiceItems[i].quantity;
          this.otPo.profit += (this.po.invoiceItems[i].productAmount - this.po.invoiceItems[i].productExpense)*this.po.invoiceItems[i].quantity;
      }
      if(this.po.invoiceItems[i].category == 'prot')
      {
          this.protPo.invoiceItems.push(this.po.invoiceItems[i]);
          this.protPo.amount += this.po.invoiceItems[i].productAmount*this.po.invoiceItems[i].quantity;
          this.protPo.expense += this.po.invoiceItems[i].productExpense*this.po.invoiceItems[i].quantity;
          this.protPo.profit += (this.po.invoiceItems[i].productAmount - this.po.invoiceItems[i].productExpense)*this.po.invoiceItems[i].quantity;
      }
      if(this.po.invoiceItems[i].category == 'cab')
      {
          this.cabPo.invoiceItems.push(this.po.invoiceItems[i]);
          this.cabPo.amount += this.po.invoiceItems[i].productAmount*this.po.invoiceItems[i].quantity;
          this.cabPo.expense += this.po.invoiceItems[i].productExpense*this.po.invoiceItems[i].quantity;
          this.cabPo.profit += (this.po.invoiceItems[i].productAmount - this.po.invoiceItems[i].productExpense)*this.po.invoiceItems[i].quantity;
      }
    }
    this.pvPo.summary = 'PV SETUP';
    this.acPo.summary = 'AC';
    this.pvwPo.summary = 'PV CABLING';
    this.battPo.summary = 'BATTERY';
    this.otPo.summary = 'ADDITIONAL';
    this.protPo.summary = 'PV PROTECTION';
    this.cabPo.summary = 'CABLEWAY';
  }

  ngOnInit() : void{
    this.pvPo.invoiceItems = [];
    this.pvwPo.invoiceItems = [];
    this.acPo.invoiceItems = [];
    this.battPo.invoiceItems = [];
    this.otPo.invoiceItems = [];
    this.protPo.invoiceItems = [];
    this.cabPo.invoiceItems = [];
    this.pvPo.amount = 0;
    this.acPo.amount = 0;
    this.pvwPo.amount = 0;
    this.battPo.amount = 0;
    this.otPo.amount = 0;
    this.protPo.amount = 0;
    this.cabPo.amount = 0;

    this.pvPo.expense = 0;
    this.acPo.expense = 0;
    this.pvwPo.expense = 0;
    this.battPo.expense = 0;
    this.otPo.expense = 0;
    this.protPo.expense = 0;
    this.cabPo.expense = 0;

    this.pvPo.profit = 0;
    this.acPo.profit = 0;
    this.pvwPo.profit = 0;
    this.battPo.profit = 0;
    this.otPo.profit = 0;
    this.protPo.profit = 0;
    this.cabPo.profit = 0;
    this.splitMainIntoSubPos();
  }

}
