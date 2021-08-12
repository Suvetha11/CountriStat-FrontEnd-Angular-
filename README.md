# CountriStat-Frontend(Angular9)
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#application-preview">Application Preview</a></li>
    <li><a href="#step-by-step-guide-to-setup-the-angular-app-and-connect-it-to-spring-boot">Step by Step guide to setup the Angular App and connect it to Spring Boot</a></li>
  </ol>
</details>

## About the project

This is an CRUD Angular application that consumes from the Spring Boot backend with H2 as the database. The application will display countries of the world, and the user can manipulate them via different operations (Create, Read, Update, Delete Country/Countries). I have included how I created the project. This contains how to setup the Angular App,
adding some UI libraries, creating the components, configuring some Angular Routes, setup the the template, and setup the main page. Please visit the following link to check how to build an API in Spring Boot : https://github.com/Suvetha11/CountriStat-Backend-Spring-Boot-

## Application Preview

![App Screenshot](https://github.com/Suvetha11/CountriStat-FrontEnd-Angular-/blob/main/Images/CountriStat_Preview_Screenshot.png)

## Step by Step guide to setup the Angular App and connect it to Spring Boot

### Step 1 : Setup an Angular App
#### Step 1.1 : Create a folder you’ll like your application to be in. Open the terminal, navigate to this folder and run the command to create an Angular app in this folder.

```
ng new AngularDemo
```
#### Step 1.2 : After the app is created, navigate into the folder. Then run the command below

```
ng serve
```

#### Step 1.3 : Then add Bootstrap, JQuery, ngx-bootstrap and AngularMaterial and Font-Awesome. Run the commands below one after the other.

```
npm install bootstrap --save

npm install font-awesome --save

npm install angular-material --save

ng add @ng-bootstrap/ng-bootstrap
```

## Step 2 : Create the Component
Components are simply different parts of the user interface. They can also be different pages. In this project only one component is created to display the list of countries. To create a component, run the command below.

```
ng generate component country
```

## Step 3 : Add Routing
Routing is simply a way to add navigation to the application. If a user visits /countries, the country component would render. if a user does not enter any path, then also it should go to the country component. These settings are made in the file, app-routing.module.ts. You can find it inside the src/app folder. Open this file and add the following routes:

```
const routes: Routes = [
  {path: 'country', component: CountryComponent},
  {path: '', component: CountryComponent}
];
```

## Step 4 : Setting up the Template
Add the header just once, and make it appear in all the pages. For this Open the the app.components.html file.Delete all the code in it except the '<router-outlet></router-outlet>'. Just above the '<router-outlet></router-outlet>' tag, paste the template code below.

``` 
<nav class="navbar navbar-expand-md navbar-dark bg-dark">
  <a class="navbar-brand" href="/home">Home</a>
</nav>
```

## Step 5 : Fetch Data From the API
The HttpClient module is used make a HTTP GET request. To fetch date from an API, you need to follow these steps:
#### Step 5.1 : Add the HttpClientModule to the app.module.ts file in the imports section

```
import {HttpClient} from '@angular/common/http';
```

#### Step 5.2 : Add parameter to the constructor as well.

```
constructor(
    private httpClient: HttpClient
  ) { }
```

#### Step 5.3 : In your country.compont.ts file, write the Country class, just after the import statement. The Country class is shown below:

```
export class Country {
  constructor(
    public id: number,
    public country_name: string,
    public capital_name: string
  ) {
  }
}
```
#### Step 5.4 : In same file, on the CountryComponent class, add countries variable of type Country[] and write the getCountries function as shown below.

```
getCountries(){
    this.httpClient.get<any>('http://localhost:8080/rest/v2/countries').subscribe(
      response => {
        console.log(response);
        this.countries = response;
      }
    );
  }
```

#### Step 5.5 : Call this function on the ngOnInit() method using this.getCountries()

## Step 6 : Display Data in HTML Table
Countries variable now contain the list retrieved from the API. So we would iterate through this list using ngFor and display each record in HTML table. refer to the code from country.component.html file.

## Step 7 : Add new country, Details, Edit and Delete Buttons
Add new button should be placed above the table and details, edit and delete buttons should be added to the table by creating a column. 

#### Code to add Buttons
![buttons](https://github.com/Suvetha11/CountriStat-FrontEnd-Angular-/blob/main/Images/buttons.png)

#### Preview of the Buttons
![buttons preview](https://github.com/Suvetha11/CountriStat-FrontEnd-Angular-/blob/main/Images/buttons_preview.png)
