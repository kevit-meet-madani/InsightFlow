import { HttpClientModule, provideHttpClient, withFetch } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CustomerService } from "../customer.service";


@NgModule({
    imports: [
        HttpClientModule
    ],  
    providers:[
        provideHttpClient(withFetch()),
        CustomerService
    ]
})

export class OrderModule {}