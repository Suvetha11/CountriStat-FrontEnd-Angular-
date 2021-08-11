import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
export class Country {
  constructor(
    public id: number,
    public country_name: string,
    public capital_name: string
  ) {
  }

}
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countries: Country[];
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCountries();
    this.editForm = this.fb.group({
      id: [''],
      country_name: [''],
      capital_name: ['']
    } );
  }

  getCountries(){
    this.httpClient.get<any>('http://localhost:8080/rest/v2/countries').subscribe(
      response => {
        console.log(response);
        this.countries = response;
      }
    );
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(c: NgForm) {
    const url = 'http://localhost:8080/rest/v2/countries/addnew';
    this.httpClient.post(url, c.value)
      .subscribe((result) => {
        this.ngOnInit();
      });
    this.modalService.dismissAll();
  }

  openDetails(targetModal, country: Country) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('d_edited_id').setAttribute('value', country.id);
    document.getElementById('d_country_name').setAttribute('value', country.country_name);
    document.getElementById('d_capital_name').setAttribute('value', country.capital_name);
  }

  openEdit(targetModal, country: Country) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: country.id,
      country_name: country.country_name,
      capital_name: country.capital_name
    });
  }

  onSave() {
    const editURL = 'http://localhost:8080/rest/v2/countries/' + this.editForm.value.id + '/edit';
    console.log(this.editForm.value);
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal, country: Country) {
    this.deleteId = country.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = 'http://localhost:8080/rest/v2/countries/' + this.deleteId + '/delete';
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }
}
