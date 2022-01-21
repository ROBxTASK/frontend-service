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
  downloadXML() {
    let xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    let xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    let blob = new Blob([xmlText], {type: 'text/xml'});
    let url = URL.createObjectURL(blob);
    window.open(url);
    URL.revokeObjectURL(url);
  }
}
