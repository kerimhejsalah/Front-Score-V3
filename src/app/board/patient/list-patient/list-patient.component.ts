import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EndpointService } from 'src/app/services/endpoint.service';
import { LayoutService } from '../../services/layout.service';
import { DataPatientService } from '../services/data-patient.service';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css']
})



export class ListPatientComponent implements OnInit {

  @HostListener('window:resize', ['$event'])

  screenWidth: any;
  allPatients: any;
  allPatientsToFilter: any;
  p: number = 1;
  page:number=1;
  totalLength:any;
  constructor(
    private _patient: DataPatientService,
    private router: Router,
    private modalService: NgbModal,
    public path: EndpointService,
    public layout: LayoutService,
  ) {
    this.getScreenSize();
  }



ngOnInit(): void {



}


ngAfterViewInit(){


    this._patient.getAllPatient().subscribe(
      res => {
  /*       console.log("reee",res) */
        this.allPatients = res;
        this.allPatientsToFilter = res;
        this.totalLength=res.length;
      },
      err => { }
    );

  }

  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
  }

  open(id: any, l: any, i: Number) {
/*     console.log(id,l,i) */
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.i = i;
    modalRef.componentInstance.l = l;
  }

  filterItem(value) {
    this.allPatients = this.allPatientsToFilter.filter(p => {
      return (
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.lastname.toLowerCase().includes(value.toLowerCase()) ||
        p.email.toLowerCase().includes(value)
      )
    })
  }

}


@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Confirmation !</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p >tu es sure d'effectuer cette action ?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">non</button>
      <button type="button" class="btn btn-danger" (click)="action(); activeModal.close()">oui</button>
    </div>
  `
})
export class NgbdModalContent {

  @Input() id;
  @Input() i;
  @Input() l;

  constructor(
    public activeModal: NgbActiveModal,
    private _patient: DataPatientService,
    private router: Router,
  ) { }

  action() {
    if (this.i === 1) {
      this.deletepatient();
    } else {
      this.lockunlock(this.id);
    }
  }

  public deletepatient() {

    this._patient.archivePatient(this.id).subscribe(
      res => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/admin/patients']));
      },
      err => { }
    );

  }

  lockunlock(id: any) {
    let lock = {
      lock: this.l
    }
    this._patient.lockunlock(id, lock).subscribe(
      res => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/admin/patients']));
      }, err => { }
    );
  }

}