import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http, Headers } from '@angular/http';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public latitude;
  public latitudeUTF=-23.1863683;

  public longitude;
  public longitudeUTF = -50.6566109;

  public mapa;
  public coordenadas;
  public coordenadasUTF;
  public endereco = '';

  public pesquisa;

  public user={name:'',img:'',location:'',thumbnail:''};
  constructor(public navCtrl: NavController, public geo: Geolocation,
    public alert: AlertController,
    public modal: ModalController,
    public http: Http) {
    this.localizar();

  }

  localizarUTF(){
    this.coordenadasUTF = new google.maps.LatLng(this.latitudeUTF,this.longitudeUTF);
    this.mapa = new google.maps.Map(document.getElementById('mapaView'), {
      center: this.coordenadasUTF,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    })
    let marker = new google.maps.Marker({
      map: this.mapa,
      animation: google.maps.Animation.DROP,
      position: this.coordenadasUTF,
      icon: '../../assets/img/favicon.ico'
    })
  }

  localizar(){
    this.geo.getCurrentPosition().then(
      position=>{
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.abrirMapa();
        this.minhaPosicao();
      }
    ).catch(error => console.log(error));

  }

  abrirMapa(){
    this.coordenadas = new google.maps.LatLng(this.latitude,this.longitude);
    this.mapa = new google.maps.Map(document.getElementById('mapaView'), {
      center: this.coordenadas,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    })
  }

  minhaPosicao(){
    let icon;
    let parameters = ``;
    //let parameters = `section=science&show-fields=body,thumbnail&api-key=test`;
    let url = `https://randomuser.me/api/?${parameters}`;
    // Sem Headers disponíveis
    let header ={};
    this.http.get(url,header).subscribe(sucesso =>{
      this.user.location = sucesso.json().results[0].location;
      this.user.img = sucesso.json().results[0].picture.large;
      this.user.name = sucesso.json().results[0].name;
      this.user.thumbnail = sucesso.json().results[0].picture.thumbnail;
      icon = this.user.thumbnail;

      let marker = new google.maps.Marker({
        map: this.mapa,
        animation: google.maps.Animation.DROP,
        position: this.coordenadas,
        icon: icon
      })
      marker.addListener('click', ()=>{
        this.informacoes(this.user);
      });
    })


  }

  informacoes(user){
    let ge = new google.maps.Geocoder;
    ge.geocode({location: this.coordenadas}, (res,status)=>{
      if(status== google.maps.GeocoderStatus.OK){
        this.endereco = res[0].formatted_address;
      }
      this.modal.create('ModalInfo',{
        user : user
      }).present();
    })
  }

  pesquisar(){
    let geocoder = new google.maps.Geocoder;
    if(this.pesquisa.length==0){
      this.localizar()
    }else{
      geocoder.geocode({address: this.pesquisa}, (res,status)=>{
        if(status== google.maps.GeocoderStatus.OK){
          this.mapa = new google.maps.Map(document.getElementById('mapaView'), {
            center: res[0].geometry.location,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
          });
          let marker = new google.maps.Marker({
            map: this.mapa,
            animation: google.maps.Animation.DROP,
            position: res[0].geometry.location,
          });
        }
      })
    }

  }

}
