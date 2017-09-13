import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, AfterViewInit } from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit,  OnChanges, OnDestroy, AfterViewInit {

  @Input() elementMap: string;
  @Input() makers: Array<any>;
  @Input() makerTitle: string;
  @Input() isLoadMapDefault: boolean;
  @Input() mapHeight: number;
  @Input() isShowTooltip: boolean;
  @Input() zoomValue: number;
  @ViewChild('mapElement') mapElement: ElementRef;
  @Output() output: EventEmitter<Object>;
  public map: any;
  public isInitMap: boolean;
  constructor() {
    this.isInitMap = false;
    this.output = new EventEmitter<Object>();
    if (!this.zoomValue) {
      this.zoomValue = 15;
    }
  }

  ngOnInit() {
    this.styleMap();

    if (this.isLoadMapDefault) {
      this.initMap();
      this.multiMarkers();
    }
  }
  ngOnChanges() {
    if (!this.isLoadMapDefault) {
      this.loadMapInPopup();
    }
  }
  ngOnDestroy() {
  }
  ngAfterViewInit() {
  }
  /**
   * inline style of map
   */
  styleMap() {
    const height = this.mapHeight ? this.mapHeight : 300;
    this.mapElement.nativeElement.style.height = `${height}px`;
  }
  /**
  * init or change map center in popup
  */
  loadMapInPopup() {
    setTimeout( () => {
      if (!this.isInitMap) {
        this.initMap();
        this.isInitMap = true;
      } else {
        this.changeMapCenter();
      }
      this.setMapMarker();
    }, 500);
  }
  /**
   * init map
   */
  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: this.makers[0].lat, lng: this.makers[0].lng },
      zoom: this.zoomValue
    });
  }
  /**
   * change map center
   */
  changeMapCenter() {
    this.map.setCenter({ lat: this.makers[0].lat, lng: this.makers[0].lng });
  }
  /**
   * set maker
   */
  setMapMarker() {
    let marker = new google.maps.Marker({
      position: { lat: this.makers[0].lat, lng: this.makers[0].lng },
      title: this.makers[0].title
    });
    marker.setMap(this.map);
  }
  /**
   * multi markers of map
   */
  multiMarkers() {
    /*this.makers = [
      { lat: 51.503510, lng: -0.119434, title: 'London Eye' },
      { lat: 51.507383, lng: -0.127202, title: 'Charing Cross' },
      { lat: 51.511336, lng: -0.128361, title: 'Leicester Square' }
    ];*/
    let mapMarkers = new Array();
    for (let i = 0; i < this.makers.length; i++) {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.makers[i].lat, this.makers[i].lng),
        map: this.map
      });
      // marker.setMap(this.map);
      // mapMarkers.push(marker);

      // hover marker
      google.maps.event.addListener(marker, 'mouseover', () => {
        var point = this.fromLatLngToPoint(marker.getPosition(), this.map);
        this.output.emit({ index: i, position: point });
      });
      google.maps.event.addListener(marker, 'mouseout', () => {
        this.output.emit({ index: -1 });
      });
    }
  }
  fromLatLngToPoint(latLng, map) {
    const topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
    const bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
    const scale = Math.pow(2, map.getZoom());
    const worldPoint = map.getProjection().fromLatLngToPoint(latLng);
    return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
  }
}
