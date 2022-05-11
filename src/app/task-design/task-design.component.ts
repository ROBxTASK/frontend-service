import { Component, OnInit } from '@angular/core';
import { TaskDesignService } from './task-design.service';

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
  constructor(private taskDesignService: TaskDesignService) {}
  uploadXML() {
	var xmlText = window.prompt("Enter your XML: ");
	var xmlDom = Blockly.Xml.textToDom(xmlText);
	Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlDom,Blockly.mainWorkspace);
  }
  downloadXML() {
    let xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    let xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    let blob = new Blob([xmlText], {type: 'text/xml'});
    let url = URL.createObjectURL(blob);
    window.open(url);
    URL.revokeObjectURL(url);
  }
  triggerCodeGen(simulation:string){
    let xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    let xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    let json = {
      "BlocklyWorkspace":xmlText
    }
    this.taskDesignService.generateCode(json,simulation)
    .then(res=>{
      var filename = res.headers.get('content-disposition');
      if (filename)
        filename = filename.split("=");
      else
        filename = "codegen.zip";
      if (filename.length == 2)
        filename = filename[1];
      filename = filename.split(".");
      filename = filename[0]+"_"+Date.now()+"."+filename[1];
      let url = URL.createObjectURL(res.blob());
      var downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = filename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    })
    .catch(error=>{
      alert("Error generating code.")
    })
  }
}
