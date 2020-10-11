import { Component } from '@angular/core';
import { NgForm, ɵangular_packages_forms_forms_a } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { noUndefined } from '@angular/compiler/src/util';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fiapp';
  allData = []
  msg = ""

  ngOnInit(): void {
    this.getAllData();
  }

  getFormData(formData, event) {

    var formAction = event.submitter.name;
    console.log(formAction);

    if (formAction === "add") {
      console.log(JSON.stringify(formData.value), formAction);
      let data = JSON.stringify({
        "hsncode": formData.value.hsncode,
        "debitgl": formData.value.debitglcode,
        "creditgl": formData.value.creditglcode,
        "debitglname": formData.value.debitglname,
        "creditglname": formData.value.creditglname,
        "igstone": formData.value.igstone,
        "cgstone": formData.value.cgstone,
        "sgstone": formData.value.sgstone,
        "igsttwo": formData.value.igsttwo,
        "cgsttwo": formData.value.cgsttwo,
        "sgsttwo": formData.value.sgsttwo,
        "note": formData.value.note
      });
      console.log(data, formAction);
      var siteHeaders = new Headers();
      siteHeaders.append("Content-Type", "application/json")
      fetch('https://xintern-x.herokuapp.com/add', {
        method: 'POST',
        headers: siteHeaders,
        body: data,
        redirect: 'follow'
      })
        .then(res => {
          console.log(res)
          this.getAllData();
          this.msg = "Record Added Successfully see the table below..."
        })
        .catch(err => {
          console.log(err)
          this.msg = "Server Error: Please try again"
        })
    }

    else if (formAction === "modify") {
      console.log(JSON.stringify(formData.value));
      let data = JSON.stringify({
        "hsncode": formData.value.hsncode,
        "debitgl": formData.value.debitglcode,
        "creditgl": formData.value.creditglcode,
        "debitglname": formData.value.debitglname,
        "creditglname": formData.value.creditglname,
        "igstone": formData.value.igstone,
        "cgstone": formData.value.cgstone,
        "sgstone": formData.value.sgstone,
        "igsttwo": formData.value.igsttwo,
        "cgsttwo": formData.value.cgsttwo,
        "sgsttwo": formData.value.sgsttwo,
        "note": formData.value.note,
        "vouchertype": formData.value.vouchertype
      });
      console.log(data, formAction);
      var siteHeaders = new Headers();
      siteHeaders.append("Content-Type", "application/json")
      fetch('https://xintern-x.herokuapp.com/modify', {
        method: 'PUT',
        headers: siteHeaders,
        body: data,
        redirect: 'follow'
      })
        .then(res => {
          console.log(res)
          this.getAllData();
          this.msg = "Record Modified Successfully see the table below..."
        })
        .catch(err => {
          console.log(err)
          this.msg = "Server Error: Please try again"
        })
    }

    else if (formAction === "delete") {
      console.log(JSON.stringify(formData.value));
      let data = JSON.stringify({
        "vouchertype": formData.value.vouchertype
      });
      console.log(data, formAction);
      var siteHeaders = new Headers();
      siteHeaders.append("Content-Type", "application/json")
      fetch('https://xintern-x.herokuapp.com/remove', {
        method: 'DELETE',
        headers: siteHeaders,
        body: data,
        redirect: 'follow'
      })
        .then(res => {
          console.log(res)
          this.getAllData();
          this.msg = "Record Deleted Successfully see the table below..."
        })
        .catch(err => {
          console.log(err)
          this.msg = "Server Error: Please try again"
        })
    }
  }
  async delete(data) {
    var siteHeaders = new Headers();
    siteHeaders.append("Content-Type", "application/json")

  }

  async getAllData() {
    var siteHeaders = new Headers();
    siteHeaders.append("Content-Type", "application/json")
    let data = await fetch('https://xintern-x.herokuapp.com/')
    data.json().then(res => {
      this.allData = res;
    });
  }
}
