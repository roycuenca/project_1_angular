import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.services';
import { UploadServices } from '../../services/upload.services';
import { Global } from '../../services/global';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers:[ProjectService, UploadServices] 
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public save_project;
  public status:any;
  public filesToUpload: Array <File>;

  constructor(
    private _projectServices: ProjectService,
    private _uploadServices: UploadServices 
  ){ 
    this.title= "Crear Proyecto"
    this.project= new Project('', '', '', '', 2019, '','');
  }

  ngOnInit() {
  }
  onSubmit(form){
    console.log(this.project);
    this._projectServices.save(this.project).subscribe(
      response =>{
          if(response.project){
            
            this._uploadServices.makeFileRequest(Global.url+"upload image/"+response.project._id, [], this.filesToUpload, 'image').then((result: any)=>{
              this.save_project= result.project;

              this.status= 'saccess';
              form.reset();
              console.log(result)
            });
            
          }else{
            this.status= 'failed';
          }
      },
      error =>{
        console.log(<any>error);
      }
    );


    
  }
  filrChangeEvent(fileInput: any){
    this.filesToUpload= <Array<File>>fileInput.target.files;
    }

}
