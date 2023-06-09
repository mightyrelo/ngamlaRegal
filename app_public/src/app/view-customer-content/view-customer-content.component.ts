import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Customer, QuoteItem, Quote, Invoice } from '../customer';

import { QuotationDataService } from '../quotation-data.service';
import { CustomerDataService } from '../customer-data.service';
import { ProductDataService } from '../product-data.service';
import { Product } from '../product';
import { InvoiceDataService } from '../invoice-data.service';
import { AuthenticationService } from '../authentication.service';
import { UserDataService } from '../user-data.service';


@Component({
  selector: 'app-view-customer-content',
  templateUrl: './view-customer-content.component.html',
  styleUrls: ['./view-customer-content.component.css']
})
export class ViewCustomerContentComponent implements OnInit {

  @Input() dbCustomer: Customer;

  //form processing
  public formError  = '';
  public displayForm : boolean = false;
  public displayForm3 : boolean = true;

  public formQuoteItem : QuoteItem = {
    product: '',
    quantity: null,
    productAmount: null,
    description: 'd',
    summary: '',
    productExpense: null,
    category: null
  } 

  //form processing
  public formError2  = '';
  public displayForm2 : boolean = false;
  public formCustomer : Customer = {
    _id: '',
    name: '',
    address: '',
    rating: null,
    email: '',
    contact: null,
    gender: '',
    facilities: [],
    quotations: [],
    invoices: [],
    createdOn: '',
    flagged: false,
    userId: '',
  };

  public newQuotation = {
    quoteItems: [],
    summary: '',
    amount: null,
    expense: null,
    profit:null,
    author: '',
    flagged: false,
    _id: ''
  };

  public counts = [];

  public itemAdded : boolean;

  public formCat = {
    category: ''
  };
  public categories = ['user','suv','aut','intr','pow','cab','tool','int','acc','fir','swt','efe','auto'];
  public categoriesFull = ['user','surveillance','automation','intrusion','power','cabling','tools','intercom','access control','fire','switches','electric fencing', 'automation advanced'];

  public categorySelected = false;
  

  private customers: Customer[] = [];

  public products : Product[];
  public acProducts : Product[];
  public wireProducts : Product[];
  public battProducts : Product[];
  public otherProducts : Product[];
  public protProducts : Product[];
  public cabProducts : Product[];



  public currentProduct: Product;

  public newInvoice: Invoice;

  constructor(
    private quoteDataService: QuotationDataService,
    private customerDataService: CustomerDataService,
    private productDataService: ProductDataService,
    private invoiceDataService: InvoiceDataService,
    private authService: AuthenticationService,
    private userDataService: UserDataService,
    private router: Router
  ) { }

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  public getUserName() : string {
    if(this.isLoggedIn())
    {
      const {name} = this.authService.getCurrentUser();
     return name ? name : 'Guest'
    }
    return 'Guest';
    
  }

  public readProducts(): void {
    
    this.productDataService.getProducts(this.getUserName())
      .then(foundProducts => {this.products = foundProducts;});
  }

  getCustomers() : void {
    this.customerDataService.getCustomers(this.getUserName())
      .then(response => this.customers = response);
  }


  //deleting quote
  flagged(customerId: string, quoteId: string) {
    
    for(let i = 0; i < this.customers.length; i++){
      if(this.customers[i]._id == customerId){
        for(let j = 0; j < this.customers[i].quotations.length; j++){
            if(this.customers[i].quotations[j]._id == quoteId){
              this.customers[i].quotations[j].flagged = true;
            }
        }
      }
    }
  }

  isFlagged(customerId: string, quoteId: string) {
    for(let i = 0; i < this.customers.length; i++){
      if(this.customers[i]._id == customerId){
        for(let j = 0; j < this.customers[i].quotations.length; j++){
            if(this.customers[i].quotations[j]._id == quoteId){
              if(this.customers[i].quotations[j].flagged){
                return true;
              } else return false;
            }
        }
      }
    }
  }

  setFlagOff(customerId: string, quoteId: string) {
    for(let i = 0; i < this.customers.length; i++) {
      if(this.customers[i]._id === customerId) {
        for(let j = 0; j < this.customers[i].quotations.length; j++){
          if(this.customers[i].quotations[j]._id === quoteId) {
            this.customers[i].quotations[j].flagged = false;
          }
        }
      }
    }
  }

  getCustomer(id: string) : void {
    this.customerDataService.getCustomer(id)
        .then(resp => this.dbCustomer = resp);
  }

  deleteQuote(customerId: string, quoteId: string) {
    for(let i = 0; i < this.customers.length; i++) {
      if(this.customers[i]._id === customerId) {
        for(let j = 0; j < this.customers[i].quotations.length; j++){
          if(this.customers[i].quotations[j]._id === quoteId) {
            this.quoteDataService.deleteQuote(customerId, quoteId)
             .then(resp => {
              if(!resp){
                let quotes = this.dbCustomer.quotations.slice(0);
                this.dbCustomer.quotations = quotes;
                this.getCustomer(customerId);       
              }});
          }
        }
      }
    }
  }

  private generateInvoice(cId: string, qId: string, quote: Quote){
    //now we can finally post invoice
    this.invoiceDataService.addInvoice(cId, qId)
      .then(response => {

        let invoices = this.dbCustomer.invoices.slice(0);
        invoices.unshift(response);
        this.dbCustomer.invoices = invoices;
        this.userDataService.getUserByName(this.getUserName())
            .then(response => {
              response.completedInvoices = response.completedInvoices + 1;
              this.userDataService.updateInvoices(response)
                .then(usr => {

                    window.location.reload();
                });
            });
      });
  }

  public invoice(cusId: string, qId: string) {
    //from qId we can get
    this.quoteDataService.readQuote(cusId, qId)
      .then(response => {
        //from quote we can generate invoice
        this.generateInvoice(cusId, qId, response);
        let url = `/customers/${cusId}`;
        this.router.navigateByUrl(url);
      });
  }

  public flaggedInvoice(customerId: string, invoiceId: string) {
    
    for(let i = 0; i < this.customers.length; i++){
      if(this.customers[i]._id == customerId){
        for(let j = 0; j < this.customers[i].invoices.length; j++){
            if(this.customers[i].invoices[j]._id == invoiceId){
              this.customers[i].invoices[j].flagged = true;
            }
        }
      }
    }
  }
   public isFlaggedInvoice(customerId: string, invoiceId: string) {
    for(let i = 0; i < this.customers.length; i++){
      if(this.customers[i]._id == customerId){
        for(let j = 0; j < this.customers[i].invoices.length; j++){
            if(this.customers[i].invoices[j]._id == invoiceId){
              if(this.customers[i].invoices[j].flagged){
                return true;
              } else return false;
            }
        }
      }
    }
  }

  public setFlagOffInvoice(customerId: string, invoiceId: string) {
    for(let i = 0; i < this.customers.length; i++) {
      if(this.customers[i]._id === customerId) {
        for(let j = 0; j < this.customers[i].invoices.length; j++){
          if(this.customers[i].invoices[j]._id === invoiceId) {
            this.customers[i].invoices[j].flagged = false;
          }
        }
      }
    }
  }


  public deleteInvoice(customerId: string, invoiceId: string) {
    
    for(let i = 0; i < this.customers.length; i++) {
      if(this.customers[i]._id === customerId) {
        for(let j = 0; j < this.customers[i].invoices.length; j++){
          if(this.customers[i].invoices[j]._id === invoiceId) {
            this.invoiceDataService.deleteInvoice(customerId, invoiceId)
             .then(resp => {
              if(!resp){
                let invoices = this.dbCustomer.invoices.slice(0);
                this.dbCustomer.invoices = invoices;
                this.getCustomer(customerId);       
              }});
          }
        }
      }
    }
  }

  onCustomerSubmit(customerId: string){
    if(true){
      this.customerDataService.updateCustomer(this.formCustomer, customerId)
       .then (dbCus =>  {
        let customers = this.customers.slice(0);
        customers.unshift(dbCus);
        this.customers = customers;
        this.resetAndHideCustomerForm();
        this.getCustomer(customerId);
       })
    } 
  }

  public resetAndHideCustomerForm() : void {
    this.formError2 = '';
    this.displayForm2 = false;
    this.displayForm3 = false;
    this.formCustomer.name = '',
    this.formCustomer.contact = null;
    this.formCustomer.address = '';
    this.formCustomer.rating = null;
    this.formCustomer.gender = '';
    this.formCustomer.facilities = [];
    this.formCustomer.quotations = [];
    this.formCustomer.invoices = [];
    this.formCustomer.email = '';
    this.formCustomer.flagged = false;
    this.getCustomers();
  }

  

  public openQuoteForm() : void {
    this.displayForm = true;
  }

  public onFormClosedEvent(eventData : boolean) {
    this.displayForm = eventData;
  }
  public onFormClosedEvent2(eventData : boolean) {
    this.displayForm = eventData;
  }
  

  public resetAndHideQuoteForm(){
    this.formError = '';
   // this.displayForm = false;
    this.formQuoteItem.product = '';
    this.formQuoteItem.quantity = null;
    this.newQuotation.quoteItems.splice(0, this.newQuotation.quoteItems.length);
    this.newQuotation.summary = '';
    this.newQuotation.profit = 0;
    this.newQuotation.expense = 0;
    this.newQuotation.amount = 0;
    this.currentProduct = null;
    this.formQuoteItem.summary = '';
    this.formQuoteItem.productAmount = null;
    this.formQuoteItem.productExpense = null;
    this.formQuoteItem.category = null;
    this.itemAdded = false;
    this.displayForm = false;
  }


  ngOnInit() {
    this.getCustomers();
    this.productDataService.getCategoryProducts(this.getUserName(), 'PV')
      .then(rsp => this.products = rsp);
    this.productDataService.getCategoryProducts(this.getUserName(), 'AC')
      .then(rsp => this.acProducts = rsp);
    this.productDataService.getCategoryProducts(this.getUserName(), 'PVCABLE')
      .then(rsp => this.wireProducts = rsp);
    this.productDataService.getCategoryProducts(this.getUserName(), 'battery')
      .then(rsp => this.battProducts = rsp);
    this.productDataService.getCategoryProducts(this.getUserName(), 'TRVLAB')
      .then(rsp => this.otherProducts = rsp);
    this.productDataService.getCategoryProducts(this.getUserName(), 'PVPROT')
      .then(rsp => this.protProducts = rsp);
    this.productDataService.getCategoryProducts(this.getUserName(), 'ACCABLE')
      .then(rsp => this.cabProducts = rsp);
    for(let i = 1; i <= 100;i++){
        this.counts[i] = i;
    }
  }

}
