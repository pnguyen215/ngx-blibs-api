import { Component, OnInit } from '@angular/core';
import { BlibsToastService } from '../../blibs/blibs-toast.service';

@Component({
  selector: 'lib-blibs-toast',
  templateUrl: './blibs-toast.component.html',
  styleUrls: ['./blibs-toast.component.css']
})
export class BlibsToastComponent implements OnInit {

  constructor(
    public blibsToastService: BlibsToastService
  ) { }

  ngOnInit() {
  }

}
