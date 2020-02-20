import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/core/services/hospital.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  lista = [];
  model = {
    nombre: '',
    id: 0
  }

  constructor(private hospitalService: HospitalService) { }

  ngOnInit() {
    this.getListHospital();
  }

  getListHospital() {
    this.hospitalService.getHospitalService().subscribe((res: any) => {
      console.log(res, 'response');
      this.lista = res.data;
    }, error => {

    })
  }

  getHospital(data?) {
    console.log(data);
    if (data) {
      this.model.id = data._id;
      this.model.nombre = data.nombre;
    } else {
      this.model.id = 0;
      this.model.nombre = '';
    }
  }

  guardar() {
    console.log(this.model, 'this.model');
    if (this.model.id == 0) {
      this.hospitalService.postHospitalService({ nombre: this.model.nombre }).subscribe((res: any) => {
        if (res.success) {
          this.getListHospital();
          this.model = {
            nombre: '',
            id: 0
          }

          console.log(res, 'res data ');

          document.getElementById('closeButtom').click();
        } else {

        }
      }, error => {

      });
    } else {
      this.hospitalService.putHospitalService(this.model.id, { nombre: this.model.nombre }).subscribe((res: any) => {
        if (res.success) {
          this.getListHospital();
          this.model = {
            nombre: '',
            id: 0
          }
          document.getElementById('closeButtom').click();
        } else {

        }
      }, error => {

      });
    }
  }

  removeHospital(id) {
    this.hospitalService.deleteHospitalService(id).subscribe((res: any) => {
      if(res.success) {
        this.getListHospital();
      } else {

      }
    }, error => {

    });
  }
}
