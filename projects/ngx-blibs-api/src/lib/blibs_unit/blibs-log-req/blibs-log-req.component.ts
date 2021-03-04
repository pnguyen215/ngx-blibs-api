import { Component, OnInit } from '@angular/core';
import { BlibsLogReqService } from '../../blibs/blibs-log-req.service';

@Component({
  selector: 'lib-blibs-log-req',
  templateUrl: './blibs-log-req.component.html',
  styleUrls: ['./blibs-log-req.component.css']
})
export class BlibsLogReqComponent implements OnInit {

  logs$ = this.blibsLogReqService.logs$;

  constructor(
    public blibsLogReqService: BlibsLogReqService
  ) { }

  ngOnInit() {
  }

  clearLog() {
    this.blibsLogReqService.reset();
  }

}
