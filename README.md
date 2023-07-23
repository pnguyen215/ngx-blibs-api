# Ngx-Api-Sdk

Ngx-API-SDK is an Angular package that provides support for handling HTTP requests. It offers user-friendly tools to make HTTP requests and process API responses.

## Installation

Use npm to install the Ngx-API-SDK package:

```bash
npm install ngx-api-sdk --force
```

## Usage

Import the Ngx-API-SDK package into your AppModule:

```ts
import { NgxApiSdkModule } from "ngx-api-sdk";

@NgModule({
  imports: [
    NgxApiSdkModule.forRoot({
      apiUrl: "https://api.example.com", // Replace with your API URL
    }),
  ],
  // ...
})
export class AppModule {}
```

```ts
import { Component, OnInit } from "@angular/core";
import { ApiService } from "ngx-api-sdk";

@Component({
  selector: "app-my-component",
  templateUrl: "./my-component.component.html",
  styleUrls: ["./my-component.component.css"],
})
export class MyComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Send a GET request to the API
    this.apiService.get("/users").subscribe(
      (response) => {
        console.log("Data from API:", response);
      },
      (error) => {
        console.error("Error sending request:", error);
      }
    );
  }
}
```

## Configuration

Before using the Ngx-API-SDK package, you need to configure your API URL in the AppModule as shown in the above instructions. You can also modify other configuration options such as timeout, headers, etc.
