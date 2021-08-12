# <p align="center">CountriStat-Frontend(Angular9)</p>
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#application-preview">Application Preview</a></li>
    <li><a href="#step-by-step-guide-to-setup-the-angular-app-and-connect-it-to-spring-boot">Step by Step guide to setup the Angular App and connect it to Spring Boot</a></li>
  </ol>
</details>

## <p align="center">About the project</p>

This is an CRUD Angular application that consumes from the Spring Boot backend with H2 as the database. The application will display countries of the world, and the user can manipulate them via different operations (Create, Read, Update, Delete Country/Countries). I have included how I created the project. This contains how to setup the Angular App,
adding some UI libraries, creating the components, configuring some Angular Routes, setup the the template, and setup the main page. Please visit the following link to check how to build an API in Spring Boot : https://github.com/Suvetha11/CountriStat-Backend-Spring-Boot-

## <p align="center">Application Preview</p>

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
  <a class="navbar-brand" href="/home">CountriStat</a>
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

![buttons](https://github.com/Suvetha11/CountriStat-FrontEnd-Angular-/blob/main/Images/buttons.png)
#### <p align="center">Code to add Buttons</p>

![buttons preview](https://github.com/Suvetha11/CountriStat-FrontEnd-Angular-/blob/main/Images/buttons_preview.png)
#### <p align="center">Preview of the Buttons</p>

## Step 8 : Check the REST Endpoint
Should have to check the the endpoint for processing POST request works fine. This is in the Spring Boot API application.

## Step 9 : Setup the Modules
#### Step 9.1 : First add click event to the Add-New button. Add the following code to Add new Country button.

```
(click)="open(content)"
```

#### Step 9.2 :  In the app.module.ts, add  FormsModule and NgbModule to the imports section

```
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

```

#### Step 9.3 :  In your countries ts file, import ModalDismissReasons and NgbModal

```
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
```

#### Step 9.4 :  Add NgbModal variable as parameter to the constructor. That is in addition to HTTPClient.

```
private modalService: NgbModal
```

## Step 10 : Code to Display Modal Popup
Find the code for this from line 35 to 68 in country.component.html file and from line 52 to 68 in country.component.ts file.

## Step 11 : Handling Form Submission
Similar to the way function for GET request, we can also write a function for post request. This function will be executed when a submit button inside the form is clicked. Add a new Submit button inside the form. And add the submit markup in the form tag. Find the code for this from line70 to 77 in country.component.ts file. 

![add new country form](https://github.com/Suvetha11/CountriStat-FrontEnd-Angular-/blob/main/Images/form_preview.png)
#### <p align="center">Preview of the Form</p>

## Step 12 : Setup Details Modal for Selected Record and Display Selected Record in the Form
This is same as the the modal form displayed to add new country. However, this form would not allow for any editing. Only to view the details of selected country from the displayed list to the user. When edit button is clicked a form will apear but that is not editable. It is a readonly form just to view details. You can find the code for this from line 72 to 108 in country.component.html file and from line 79 to 88 in country.component.ts file. 

![details](https://github.com/Suvetha11/CountriStat-FrontEnd-Angular-/blob/main/Images/details.png)
#### <p align="center"> Preview of details form when Details button of a selected country is clicked</p>

## Step 13 : Setup the Edit Modal Form, Setup the Form Submission and save the edited details
Next is to display an edit modal form. The user could make some changes and save. What we used to create add new country form is called Template-Driven form. For editing, we should use Reactive form. Reactive form is more feature rich than template-driven form. Check the codes from line 112 to 149 in country.component.html file to setup the edit modal form.

#### Step 13.1 : To open the form first add the following code to edit button.
```
(click)="openEdit(contentEdit, country)"
```
#### Step 13.2 : And then Add the below code to the ngOnInit() just below this.getCountries() statement.
```
ngOnInit(): void {
    this.getCountries();
    this.editForm = this.fb.group({
      id: [''],
      country_name: [''],
      capital_name: ['']
    } );
  }
```
#### Step 13.3 : To open the edit form refer to the code from line 90 to 101 in country.component.ts file. 

![edit form preview](https://github.com/Suvetha11/CountriStat-FrontEnd-Angular-/blob/main/Images/edit.png)
#### <p align="center">Preview of Edit Form</p>

#### Step 13.4 : Next put the click event on the Save button on the edit modal and refer to the code from line 103 to 111 in country.component.ts file for this onSave method.
```
(click)="onSave()" 
```

## Step 14 : HTTP DELETE Operation

#### Step 14.1 : Check the code from line 153 to 169 in country.component.html file for delete template. And add the below click event to the Delete button in the html table and refer to code from line 113 to 119 in country.component.ts file for openDelete method.
```
(click)="openDelete(contentDelete, country)"
```

#### Step 14.2 : Add the below code to click event to the confirm delete button and refer to code from line 121 to 129 in country.component.ts file for onDelete method to delete the record data.
```
(click)="onDelete()"
```

![delete preview](https://github.com/Suvetha11/CountriStat-FrontEnd-Angular-/blob/main/Images/delete.png)
#### <p align="center">Preview of Delete Modal</p>








