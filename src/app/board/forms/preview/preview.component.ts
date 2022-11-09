import { AfterViewInit, Component, HostListener, Input, OnInit,ChangeDetectorRef } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EndpointService } from 'src/app/services/endpoint.service';
import { FormsDataService } from '../services/forms-data.service';
import { Options,LabelType,ChangeContext,PointerType   } from 'ng5-slider';



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
      <p>Êtes-vous sûr de supprimer ce formulaire?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">non</button>
      <button type="button" class="btn btn-danger" (click)="deleteForm(); activeModal.close()">oui</button>
   
    </div>
  `
})
export class NgbdModalContent {
  @Input() id;

  constructor(public activeModal: NgbActiveModal, private _formData: FormsDataService,
    private route : Router,
    ) {}

  public deleteForm(){

    this._formData.archiveForm(this.id).subscribe(
      res=>{
          this.route.navigate(['/admin/forms']);
      },
      err=>{
        this.route.navigate(['/admin/forms']);
        
      }
    );

}


}








@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit , AfterViewInit {

  constructor(private _formData: FormsDataService, 
    private router: ActivatedRoute,
    private modalService: NgbModal,
    public endpoint: EndpointService,
    private cdref: ChangeDetectorRef ,
    ) {  
     this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
       
        this.screenWidth = window.innerWidth;

  }
  sliderOptions(slider): Options { 
  
    return {
      floor: 10,
      ceil: 100,
      step: 10,
      showTicks: true,
      
 stepsArray:slider.dataRange,  
 translate: (value: number): string => {
   if(slider.dataRange!=undefined){
      if(slider.dataRange[0].nameRange!=undefined)
 
        return  value + slider.dataRange[0].nameRange;}
},
/*  getPointerColor: (value: number): string => {
   if (value == 30) {
       return 'red';
   }
   if (value == 60) {
       return 'orange';
   }
   if (value == 90) {
       return 'yellow';
   }
   return '#333';
}, */

    };
  
    
  }

screenWidth: any;
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
    }

    return '';
  }
  
  id: any;

  form:any;

  ngOnInit(): void {

   

  }

  ngAfterViewInit(){
    this.id = this.router.snapshot.paramMap.get('id');

    this._formData.getFormById(this.id).subscribe(
      res=>{
        this.form = res;
  /*    console.log("res",res) */
        if(this.form.questions!=undefined)
        for(let f of this.form.questions){
          f.hint ? null : f.hint = '';
          
          for(let o of f.options){
            o.hint ? null : o.hint = ''
          }
      }
        
      },
      err=>{
   
        
      }
    );
    this.cdref.detectChanges();
  }


  
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.id = this.id ;

    modalRef.dismissed.subscribe(value=>{
     //this.deleteForm();
  
      
    });
  }


}
