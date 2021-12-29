import { Component, OnInit } from '@angular/core';
import { Art } from 'src/app/model/Art';
import { ArtService } from 'src/app/services/art.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  ownedArt: Art[] = [];
  constructor(private as: ArtService) { }

  ngOnInit(): void {
    this.refreshOwnedArt();
  }

  refreshOwnedArt() {
    let id: any = localStorage.getItem('token');
    if(id) id = id.split(":")[0];
    id = Number.parseInt(id);
    this.as.getOwnedArt(id).subscribe((res: any) => {
      this.ownedArt = this.as.arts;
      console.log(this.ownedArt)
    })
  }


}
