import {Component, OnInit} from '@angular/core';
import {IOrder} from './order';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'pm-orders',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
    orderListTitle: string = 'Available Orders';
    shipmentGroupTitle: string = 'Shipment Group';
    filterText: string = 'Filtered by Order:';
    _listFilter: string;

    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter = value;
        this.filteredOrders = this.listFilter ? this.performFilter(this.listFilter) : this.availableOrders;
    }

    shipmentGroup: IOrder[] = [];
    filteredOrders: IOrder[];
    availableOrders: IOrder[] = [];

    constructor(private productService: ProductService) {
        this.filteredOrders = this.availableOrders;
        this.listFilter = '';
    }

    ngOnInit(): void {
        this.productService.getProducts()
        .subscribe((products) =>  {
            this.availableOrders = products;
            this.filteredOrders = this.availableOrders;
        });
    }

    public addOrderToShipmentGroup(event: Event): void {
        const orderNumber: string = (event.target as Element).id;
        // Add order to shipment group
        this.shipmentGroup.push(this.availableOrders.find(order => order.orderNumber === orderNumber));
        // Remove order from available orders
        this.availableOrders.splice(
            this.availableOrders.indexOf(
                this.availableOrders.find(order => order.orderNumber === orderNumber)), 1);

        if (this.availableOrders.length !== this.filteredOrders.length) {
            this.filteredOrders.splice(
                this.filteredOrders.indexOf(
                    this.filteredOrders.find(order => order.orderNumber === orderNumber)), 1);
        }
    }

    public removeOrderFromShipmentGroup(event: Event): void {
        const orderNumber: string = (event.target as Element).id;
        // Add order to available orders
        this.availableOrders.push(this.shipmentGroup.find(order => order.orderNumber === orderNumber));
        if (this.availableOrders.length !== this.filteredOrders.length) {
            this.filteredOrders.push(this.shipmentGroup.find(order => order.orderNumber === orderNumber));
        }
        // Remove order from shipment group
        this.shipmentGroup.splice(
            this.shipmentGroup.indexOf(
                this.shipmentGroup.find(order => order.orderNumber === orderNumber)), 1);
        // Reset Filter
        this.filteredOrders = this.listFilter ? this.performFilter(this.listFilter) : this.availableOrders;
    }

    public shipOrders(): void {
        alert('Not implemented');
    }

    private performFilter(filterBy: string): IOrder[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.availableOrders.filter((order: IOrder) =>
            order.orderNumber.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
}
