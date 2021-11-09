import { Component, OnInit } from '@angular/core';

declare var Blockly: any;

@Component({
  selector: 'task-design',
  templateUrl: './task-design.component.html',
  styleUrls: ['./task-design.component.css']
})

export class TaskDesignComponent implements OnInit {
  workspace: any;
  ngOnInit() {
    this.workspace = Blockly.inject('blocklyDiv', {
      toolbox: document.getElementById('toolbox'),
      scrollbars: false
    });
  }
}
