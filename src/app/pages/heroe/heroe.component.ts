import { Component,OnInit } from '@angular/core';
import {HeroeModel}from '../../models/heroe.model'
import { NgForm } from '@angular/forms';
import { HeroesService }from '../../services/heroes.service';

import {Observable }from 'rxjs';
import  Swal  from 'sweetalert2';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit{

  heroe:HeroeModel = new HeroeModel();

  constructor(private heroesService: HeroesService){ }

  ngOnInit(){

  }

  guardar( form: NgForm){

    if(form.invalid){
      console.log('formulario no válido');
    return;
    }

    Swal.fire({
      title:'Espere',
      text:'Guardando informacion',
      icon: 'info',
      allowOutsideClick:false
    });

    Swal.showLoading();


    let peticion:Observable<any>;

    if(this.heroe.id){
     peticion= this.heroesService.actualizarHeroe( this.heroe);

    }else{
      peticion=this.heroesService.createHeroe( this.heroe);

    }
      peticion.subscribe(resp=>{

        Swal.fire({
          title:this.heroe.nombre,
          text:'se actualizo correctamente',
          icon:'success'
        });

      });


  }
}
