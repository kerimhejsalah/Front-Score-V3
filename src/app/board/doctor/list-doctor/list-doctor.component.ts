import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EndpointService } from 'src/app/services/endpoint.service';
import { LayoutService } from '../../services/layout.service';
import { DoctorDataService } from '../services/doctor-data.service';

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
    private _doctor: DoctorDataService,
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

    this._doctor.archiveDoctor(this.id).subscribe(
      res => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/admin/doctors']));
      },
      err => { }
    );
  }

  lockunlock(id: any) {
    let lock = {
      lock: this.l
    }
    this._doctor.lockunlock(id, lock).subscribe(
      res => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/admin/doctors']));

      }, err => {


      }
    );

  }
}





@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.css']
})
export class ListDoctorComponent implements OnInit , AfterViewInit {

  constructor(private _docor: DoctorDataService,
    private router: Router,
    private modalService: NgbModal,
    public path: EndpointService,
    public layout: LayoutService,
  ) {
    this.getScreenSize();
  }
  p: number = 1;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
  }

  screenWidth: any;
  allDoctors: any;
  allDoctorsToFilter: any;
  page:number=1;
  totalLength:any;
  open(id: any, state: any, i: any) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.i = i;
    modalRef.componentInstance.l = state;
  }


  ngOnInit(): void {

  }

  ngAfterViewInit(){
/*     console.log("dd") */
    this._docor.getAllDoctor().subscribe(
      res => {
      /*   console.log("dd",res) */
        this.allDoctors = res;
        this.allDoctorsToFilter = res;
        this.totalLength=res.length;
       /*  console.log("this.totalLength",this.totalLength);  */
        
      },
      err => { }
    );

  }

  filterItem(value) {
    this.allDoctors = this.allDoctorsToFilter.filter(d => {
      return (
        d.name.toLowerCase().includes(value.toLowerCase()) ||
        d.lastname.toLowerCase().includes(value.toLowerCase()) ||
        d.email.toLowerCase().includes(value)
      )
    })
  }

}