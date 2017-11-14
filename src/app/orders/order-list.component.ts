import {Component, OnInit} from '@angular/core';
import {IOrder} from './order';

@Component({
    selector: 'pm-orders',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit { 
    orderListTitle: string = "Available Orders";
    shipmentGroupTitle: string = "Shipment Group";
    filterText: string = "Filtered by Order:"
    _listFilter: string;

    get listFilter():string{
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter = value;
        this.filteredOrders = this.listFilter ? this.performFilter(this.listFilter) : this.availableOrders;
    }

    shipmentGroup: IOrder[] = [];
    filteredOrders: IOrder[];
    availableOrders: IOrder[] = [
        {
            "orderNumber": "3172349094",
            "product": "Saxophone",
            "customerName": "Dave Sanborn",
            "customerAddress": "88 Saxophone Lane",
            "shipDate": "12/8/2017",
            "priority" : 0
        },
        {
            "orderNumber": "3245678901",
            "product": "Free Weights",
            "customerName": "Arnold Schwarzenegger",
            "customerAddress": "7 Pumping Iron Drive",
            "shipDate": "12/9/2017",
            "priority" : 0
        },
        {
            "orderNumber": "2345660009",
            "product": "Paints",
            "customerName": "Bob Ross",
            "customerAddress": "12 Artistic Avenue",
            "shipDate": "12/10/2017",
            "priority" : 0
        },
        {
            "orderNumber": "3459080921",
            "product": "Books",
            "customerName": "Milton Friedman",
            "customerAddress": "1 Economics Way",
            "shipDate": "12/11/2017",
            "priority" : 0
        },
        {
            "orderNumber": "2304982340",
            "product": "Tennis Racket",
            "customerName": "Rafael Nadal",
            "customerAddress": "11 Spanish Island Street",
            "shipDate": "12/15/2017",
            "priority" : 0
        },
    ];
    constructor(){
        this.filteredOrders = this.availableOrders
        this.listFilter = "";
    }

    performFilter(filterBy: string): IOrder[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.availableOrders.filter((order: IOrder) =>
            order.orderNumber.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    addOrderToShipmentGroup(event: Event): void{
        let orderNumber: string = (event.target as Element).id;
        //Add order to shipment group
        this.shipmentGroup.push(this.availableOrders.find(order => order.orderNumber === orderNumber));
        //Remove order from available orders
        this.availableOrders.splice(
            this.availableOrders.indexOf(
                this.availableOrders.find(order => order.orderNumber === orderNumber)), 1) 

        if (this.availableOrders.length !== this.filteredOrders.length){
            this.filteredOrders.splice(
                this.filteredOrders.indexOf(
                    this.filteredOrders.find(order => order.orderNumber === orderNumber)), 1) 
        }      
    }

    removeOrderFromShipmentGroup(event: Event): void{
        let orderNumber: string = (event.target as Element).id;
        //Add order to available orders
        this.availableOrders.push(this.shipmentGroup.find(order => order.orderNumber === orderNumber));
        if (this.availableOrders.length !== this.filteredOrders.length){
            this.filteredOrders.push(this.shipmentGroup.find(order => order.orderNumber === orderNumber));
        }
        //Remove order from shipment group
        this.shipmentGroup.splice(
            this.shipmentGroup.indexOf(
                this.shipmentGroup.find(order => order.orderNumber === orderNumber)), 1)
        //Reset Filter        
        this.filteredOrders = this.listFilter ? this.performFilter(this.listFilter) : this.availableOrders;
    }
    
    shipOrders(): void{
        alert("Not implemented");
    }

    ngOnInit(): void{
        console.log('In OnInit');
    }
}
