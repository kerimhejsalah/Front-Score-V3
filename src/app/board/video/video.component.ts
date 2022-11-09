import { Component, OnInit } from '@angular/core';
import { UrlvideoService } from './services/urlvideo.service';
import { UploadimageService } from 'src/app/services/uploadimage.service';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  constructor(  private _urlVideo: UrlvideoService,  private _iploadImg: UploadimageService,) { }
 video = {
  url :"",
  etat:false,
  title:"",
  desc:"",
  role: false,
   created_date:"Mon Jul 11 2022 09:56:11 GMT+0100"

}
tableVideo=[]
tableVideod=[]
testUrl ="jpv2tMJJuz0"
 apiLoaded = false;
testtable:any;
selectedtab = 1;
roleP ={
  role:true
}
  ngOnInit(): void {
    if(!this.apiLoaded) {
      const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
         this.apiLoaded = true;
       } 
       /* console.log(this._domsantitizer.bypassSecurityTrustHtml("https://www.youtube.com/watch?v=GYAB4Td62zI")) */
    this._urlVideo.getAllVideo().subscribe((result)=>{
/*       console.log("resdddddddddddddddss",result) */
     this.tableVideo=result.dataUrlP 
     this.tableVideod=result.dataUrlD

    })
   
  }
  addVideo(){
  /*   console.log("jjj") */
    /* console.log("https://www.youtube.com/watch?v".length,this.video.url.slice(0,31),"https://www.youtube.com/watch?v"==this.video.url.slice(0,31)) */
    if("https://www.youtube.com/watch?v"==this.video.url.slice(0,31)&&this.video.title.length>3&&this.video.desc.length >5)
{   this._urlVideo.createNewVideo(this.video).subscribe((result)=>{
     /*  console.log("resdddddddddddddddss",result) */
      if(result){
        this.ngOnInit()
      }
    }) 

 /*  this.reloadPage()  */}
  }
  url : any;
fileToUpload: any;
imageUrl: any;
handleFileInput(file: FileList) {
  console.log("file",file)
  this.fileToUpload = file.item(0);

  //Show image preview
  let reader = new FileReader();
  reader.onload = (event: any) => {
    this.imageUrl = event.target.result;
  /*   console.log('hhh', this.imageUrl); */
   console.log("this.imageUrl",this.imageUrl)
  };
  reader.readAsDataURL(this.fileToUpload);
}
/* url2;
format;
onSelectFile(event) {
  const file = event.target.files && event.target.files[0];
  if (file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    if(file.type.indexOf('image')> -1){
      this.format = 'image';
    } else if(file.type.indexOf('video')> -1){
      this.format = 'video';
    }
    reader.onload = (event) => {
      this.url2 = (<FileReader>event.target).result;
      this._iploadImg.uploadImage(this.url2).subscribe((result)=>{
      

      })
      console.log("this.url2 ",this.url2 )
    }
  }
} */
  roleVideo(role:any){
/*     console.log(role) */
    if(role==1){
      this.video.role=true
    }else{
      this.video.role=false
    }
 /*    console.log(" this.video", this.video) */
  }
  reloadPage(){
    if(!this.apiLoaded) {
      const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
         this.apiLoaded = true;
       } 
/*        console.log(this._domsantitizer.bypassSecurityTrustHtml("https://www.youtube.com/watch?v=GYAB4Td62zI")) */
    this._urlVideo.getAllVideo().subscribe((result)=>{
    /*   console.log("resdddddddddddddddss",result) */
     this.tableVideo=result.dataUrlP 
     this.tableVideod=result.dataUrlD

    })
  }
  affectVideo(id,role){
    this.roleP.role=role
    this._urlVideo.affectVideo(id,this.roleP).subscribe((result)=>{
     /*  console.log("affectVideo",result) */
      if(result){
        this.ngOnInit()
      }
    }) 
  }
  deleteAffectVideo(id,role){
    this._urlVideo.deleteAffect(id,this.roleP).subscribe((result)=>{
     /*  console.log("affectVideo",result) */
      if(result){
        this.ngOnInit()
      }
    }) 
  }
  deleteVideo(id){
    this._urlVideo.deleteVideo(id,this.roleP).subscribe((result)=>{
     /*  console.log("affectVideo",result) */
      if(result){
        this.ngOnInit()
      }
    }) 
  }
}
