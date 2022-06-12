import {Component, Input, OnInit} from '@angular/core';
import {Level} from "../../../shared/level";
import {SharedService} from "../../../shared/shared.service";

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  levelName = '';
  chapter: number = 100;

  @Input()
  currentLevel: Level | undefined;

  constructor(
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

}
