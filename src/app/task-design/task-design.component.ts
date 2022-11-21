import { Component, OnInit } from '@angular/core';
import { TaskDesignService } from './task-design.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistryService } from '../registry/registry.service';

declare var Blockly: any;

@Component({
  selector: 'task-design',
  templateUrl: './task-design.component.html',
  styleUrls: ['./task-design.component.css']
})

export class TaskDesignComponent implements OnInit {

  workspace: any;
  mode = "select";
  device_ids = [];
  devices = [];
  devices_filtered = [];
  xml = "";

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let m = params['mode'];
      if (m) {
        if (m == 'dynamic') {
          let ids = params['ids'];
          if (ids)
            this.device_ids = ids;
        }
        this.setMode(m);
      }
    });
  }

  constructor(private registryService: RegistryService,
              private taskDesignService: TaskDesignService,
              public router: Router,
              public route: ActivatedRoute) {}

  setMode(mode:string):any {
    if (mode == 'dynamic') {
      this.mode = 'dynamic';
      this.buildWorkspace();
    }
    else if (mode == 'generic') {
      this.mode = 'generic';
      this.buildWorkspace();
    }
    else {
      this.mode = 'select';
    }
  }

  buildWorkspace() {
    if (this.mode == 'generic')
      this.getGenericToolbox();
    else
      this.getDynamicToolbox();
  }

  addDevices() {
    this.router.navigate(['registry/device-search'], { queryParams: {mode: 'select'} });
  }

  uploadXML() {
  	var xmlText = window.prompt("Enter your XML: ");
    if (xmlText.indexOf("_-_DynamicBlock") != -1) {
      alert("'Dynamic mode' task design detected - loading devices");
      var dev_to_pull = [];
      var parts1 = xmlText.split('<block type="');
      for (var i=0; i<parts1.length; i++) {
        var parts2 = parts1[i].split('_-_DynamicBlock"')[0].split("_-_")[1];
        if (parts2)
          dev_to_pull.push(parts2);
      }
      this.mode = "dynamic";
      this.device_ids = dev_to_pull;
      this.xml = xmlText;
      this.getDynamicToolbox();
    }
    else {
      alert("'Generic mode' task design detected - loading skills");
      this.mode = "generic";
      this.xml = xmlText;
      this.getGenericToolbox();
    }
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
	  console.log(error,typeof(error),error._body,typeof(error._body));
	  var fr = new FileReader();
	  fr.onload = function(evt) {
		var res = evt['target']['result'];
		console.log("onload",arguments, res, typeof res);
	  };
	  fr.readAsText(error._body);
	  //console.log(error,error.text(),error.json(),error.json().text(),error.json().text().toString(),error._body.text(),error._body.text().toString(),error._body.text()['<value>']);
	  if (error.message && error.message != "")
		  alert("Error generating code.\n"+error.message);
	  else if (error.statusText && error.statusText!="")
		  alert("Error generating code.\n"+error.statusText);
	  else
		  alert("Error generating code.")
    })
  }

  getDynamicToolbox():void{
    this.registryService.getDevices()
      .then(res => {
        this.devices = res;
        this.buildDynamicSkills();
      })
			.catch(error => {
				this.devices = [];
        this.buildDynamicSkills();
      });
  }

  buildDynamicSkills():void {
    for (let device of this.devices) {
      if (this.device_ids.indexOf(device.DeviceID) != -1)
        this.devices_filtered.push(device);
    }
    Blockly.Blocks['SendMessage'] = {
      init: function() {
        this.appendValueInput("messageContent")
            .setCheck("String")
            .appendField("SendMessage")
            .appendField(new Blockly.FieldDropdown([["MQTT","MQTT"], ["ROS","ROS"]]), "messageType");
    	this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#333333");
     this.setTooltip("Send a MQTT or ROS message to another device.");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['OnMessageReceive'] = {
      init: function() {
        this.appendValueInput("messageContent")
            .setCheck("String")
            .appendField("OnMessageReceive")
    		.appendField(new Blockly.FieldDropdown([["MQTT","MQTT"], ["ROS","ROS"]]), "messageType");
    	this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#333333");
     this.setTooltip("React to a MQTT or ROS message by another device.");
     this.setHelpUrl("");
      }
    };
    var toolbox = '<xml>';
    toolbox += '<category name="Internal Communication" colour="#333333">';
    toolbox += '<block type="SendMessage"></block>';
    toolbox += '<block type="OnMessageReceive"></block>';
    toolbox += '<block type="text"><field name="TEXT">Text</field></block>';
    toolbox += '</category>';
    var col_mult = 320/(this.devices_filtered.length);
    for (var i=0; i<this.devices_filtered.length; i++) {
      var device = this.devices_filtered[i];
      var col = col_mult*(i+1);
      toolbox += '<category name="'+device.DeviceName+'" colour="'+col+'">';
        for (var j=0; j<device.Skills.length; j++) {
          this.initDynamicBlock(device,device.Skills[j],col);
          toolbox += '<block type="'+device.Skills[j].SkillName+'_-_'+device.DeviceID+'_-_DynamicBlock"></block>';
        }
        toolbox += '<block type="text"><field name="TEXT">Text</field></block>';
      toolbox += '</category>';
    }
    toolbox += '<category name="Basic Control Structures" colour="#555555">';
    toolbox += '<block type="controls_if"><mutation else="1"></mutation></block>';
    toolbox += '<block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><field name="NUM">10</field></block></value></block>';
    toolbox += '<block type="controls_whileUntil"></block>';
    toolbox += '<block type="math_number"><field name="NUM">10</field></block>';
    toolbox += '<block type="math_arithmetic"></block>';
    toolbox += '<block type="logic_compare"></block>';
    toolbox += '<block type="logic_operation"></block>';
    toolbox += '<block type="logic_negate"></block>';
    toolbox += '<block type="logic_boolean"></block>';
    toolbox += '<block type="text"><field name="TEXT">Text</field></block>';
    toolbox += '</category>';
    toolbox += '<category name="Variables" custom="VARIABLE" colour="#777777"></category>';
    toolbox += '</xml>';
    if (Blockly.mainWorkspace)
      Blockly.mainWorkspace.dispose();
    Blockly.Themes.Classic.blockStyles={colour_blocks:{colourPrimary:"#555555"},list_blocks:{colourPrimary:"#555555"},logic_blocks:{colourPrimary:"#555555"},loop_blocks:{colourPrimary:"#555555"},math_blocks:{colourPrimary:"#555555"},procedure_blocks:{colourPrimary:"#555555"},text_blocks:{colourPrimary:"#555555"},variable_blocks:{colourPrimary:"#777777"},variable_dynamic_blocks:{colourPrimary:"#777777"},hat_blocks:{colourPrimary:"#555555",hat:"cap"}};
    this.workspace = Blockly.inject('blocklyDiv', {
      toolbox: toolbox,
      scrollbars: false
    });
    this.workspace.addChangeListener(function(event){
      if (event.blockId && event.newParentId) {
        let xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        let xmlText = Blockly.Xml.domToPrettyText(xmlDom);
        try {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlText, "text/xml");
            var blocks = xmlDoc.getElementsByTagName("block");
            var wrong_setup = false;
            for (var i=0; i<blocks.length; i++) {
              var block = blocks[i];
              if (block.parentNode.nodeName == "xml") {
                var type = Blockly.mainWorkspace.getBlockById(block.id).type;
                var device_id_root = "";
                if (type.indexOf('_-_DynamicBlock') != -1)
                  device_id_root = type.split("_-_")[1];
                var dynamic = block.innerHTML.split('_-_DynamicBlock');
                var other_id = "";
                for (var j=0; j<dynamic.length; j++) {
                  var dynamic_id = dynamic[j].split("_-_")[1];
                  if (dynamic_id) {
                    if (device_id_root != "" && dynamic_id != device_id_root)
                      wrong_setup = true;
                    else if (other_id == "")
                      other_id = dynamic_id;
                    else if (other_id != dynamic_id)
                      wrong_setup = true;
                  }
                }
              }
            }
            if (wrong_setup)
              alert("Warning!!!\nYou are trying to match blocks of different devices. This has a high chance of producing unusable code.\nUse the 'Internal Communication' blocks for exchanging information between devices.")
        } catch (e) {}
      }
    });
    if (this.xml != "") {
      var xmlDom = Blockly.Xml.textToDom(this.xml);
      Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlDom,Blockly.mainWorkspace);
    }
  }

  initDynamicBlock(device,skill,col):void {
    Blockly.Blocks[skill.SkillName+'_-_'+device.DeviceID+'_-_DynamicBlock'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(skill.SkillName);
        for (var k=0; k<skill.SkillSlots.length; k++) {
          var slot = skill.SkillSlots[k];
          if (slot.SlotType == "String") {
            this.appendValueInput(slot.SlotName)
                .setCheck("String")
                .appendField(slot.SlotName);
          }
          else if (slot.SlotType == "Enum") {
            var arr = [];
            for (var l=0; l<slot.SlotValues.length; l++) {
              arr.push([slot.SlotValues[l],slot.SlotValues[l]]);
            }
            this.appendDummyInput()
                .appendField(slot.SlotName)
                .appendField(new Blockly.FieldDropdown(arr), slot.SlotName);
          }
        }
        if (skill.ReturnResult && skill.ReturnResult.ReturnResultType && skill.ReturnResult.ReturnResultType == "String") {
          this.setOutput(true, "String");
        }
        else {
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
        }
        this.setColour(col);
        this.setTooltip(skill.SkillDescription);
        this.setHelpUrl("");
      }
    };
  }

  getGenericToolbox():void {
    this.registryService.getDevices()
      .then(res => {
        this.devices = res;
        this.buildGenericToolbox();
      })
			.catch(error => {
				this.devices = [];
        this.buildGenericToolbox();
      });
  }

  buildGenericToolbox():void{
    this.initGenericBlocks();
    var toolbox = '<xml>';
    toolbox += '<category name="Device Initialization" colour="0">';
    toolbox += '<block type="SetAsset"></block>';
    toolbox += '<block type="Text" editable="false">';
    toolbox += '<field name="text">chasi</field>';
    toolbox += '</block>';
    toolbox += '<block type="Text" editable="false">';
    toolbox += '<field name="text">camera</field>';
    toolbox += '</block>';
    toolbox += '<block type="Text" editable="false">';
    toolbox += '<field name="text">fitbit</field>';
    toolbox += '</block>';
    toolbox += '<block type="Text" editable="false">';
    toolbox += '<field name="text">panda</field>';
    toolbox += '</block>';
    toolbox += '<block type="Text" editable="false">';
    toolbox += '<field name="text">mir100</field>';
    toolbox += '</block>';
    toolbox += '<block type="Text" editable="false">';
    toolbox += '<field name="text">qbo</field>';
    toolbox += '</block>';
    toolbox += '<block type="Text" editable="false">';
    toolbox += '<field name="text">ur10cb3</field>';
    toolbox += '</block>';
    toolbox += '<block type="Text"></block>';
    toolbox += '</category>';
    toolbox += '<category name="Internal Communication" colour="40">';
    toolbox += '<block type="SendMessage"></block>';
    toolbox += '<block type="OnMessageReceive"></block>';
    toolbox += '<block type="Text"></block>';
    toolbox += '</category>';
    toolbox += '<category name="Moving" colour="80">';
    toolbox += '<block type="MoveToPosition"></block>';
    toolbox += '<block type="MoveToLocation"></block>';
    toolbox += '<block type="DeliverObject"></block>';
    toolbox += '<block type="FetchObject"></block>';
    toolbox += '<block type="Text"></block>';
    toolbox += '</category>';
    toolbox += '<category name="Detecting" colour="120">';
    toolbox += '<block type="MeasureHydration"></block>';
    toolbox += '<block type="DetectObject"></block>';
    toolbox += '<block type="Text"></block>';
    toolbox += '</category>';
    toolbox += '<category name="Grabbing and Unloading" colour="160">';
    toolbox += '<block type="GrabObject"></block>';
    toolbox += '<block type="PutObject"></block>';
    toolbox += '<block type="Text"></block>';
    toolbox += '</category>';
    toolbox += '<category name="Teaching" colour="200">';
    toolbox += '<block type="TeachingWorkspacePosition"></block>';
    toolbox += '<block type="TeachingObjectRecognition"></block>';
    toolbox += '<block type="Text"></block>';
    toolbox += '</category>';
    toolbox += '<category name="Basic Control Structures" colour="240">';
    toolbox += '<block type="Loop"></block>';
    toolbox += '<block type="Selection"></block>';
    toolbox += '<block type="WaitForCondition"></block>';
    toolbox += '<block type="Text"></block>';
    toolbox += '</category>';
    toolbox += '<category name="Getting / Setting Data" colour="280">';
    toolbox += '<block type="GetData"></block>';
    toolbox += '<block type="GetDataReturn"></block>';
    toolbox += '<block type="SetData"></block>';
    toolbox += '<block type="WaitForExternalEvent"></block>';
    toolbox += '<block type="Text"></block>';
    toolbox += '</category>';
    toolbox += '<category name="User Input" colour="320">';
    toolbox += '<block type="WaitForUserInput"></block>';
    toolbox += '<block type="VoiceOutput"></block>';
    toolbox += '<block type="GraphicalUserInteraction"></block>';
    toolbox += '<block type="Text"></block>';
    toolbox += '</category>';
    toolbox += '</xml>';
    if (Blockly.mainWorkspace)
      Blockly.mainWorkspace.dispose();
    this.workspace = Blockly.inject('blocklyDiv', {
      toolbox: toolbox,
      scrollbars: false
    });
    if (this.xml != "") {
      var xmlDom = Blockly.Xml.textToDom(this.xml);
      Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlDom,Blockly.mainWorkspace);
    }
  }

  initGenericBlocks(){
    Blockly.Blocks['SetAsset'] = {
      init: function() {
        this.appendValueInput("asset")
            .setCheck("String")
            .appendField("SetDevice");
        this.setNextStatement(true, null);
        this.setColour(0);
     this.setTooltip("Select the device to be used for the following commands.");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['Text'] = {
      init: function() {
    	this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput(""), "text");
        this.setOutput(true, null);
        this.setColour("#777777");
     this.setTooltip("A string, object or statement.");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['SendMessage'] = {
      init: function() {
        this.appendValueInput("messageContent")
            .setCheck("String")
            .appendField("SendMessage")
            .appendField(new Blockly.FieldDropdown([["MQTT","MQTT"], ["ROS","ROS"]]), "messageType");
    	this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(40);
     this.setTooltip("Send a MQTT or ROS message to another device.");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['OnMessageReceive'] = {
      init: function() {
        this.appendValueInput("messageContent")
            .setCheck("String")
            .appendField("OnMessageReceive")
    		.appendField(new Blockly.FieldDropdown([["MQTT","MQTT"], ["ROS","ROS"]]), "messageType");
    	this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(40);
     this.setTooltip("React to a MQTT or ROS message by another device.");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['MoveToPosition'] = {
      init: function() {
        this.appendValueInput("position")
            .setCheck("String")
            .appendField("MoveToPosition");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(80);
     this.setTooltip("Move the asset to a target position using coordinates (x,y,z).");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['MoveToLocation'] = {
      init: function() {
        this.appendValueInput("location")
            .setCheck("String")
            .appendField("MoveToLocation");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(80);
     this.setTooltip("Move the asset to a target location using predefined options (e.g. location A).");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['DeliverObject'] = {
      init: function() {
        this.appendValueInput("objectType")
            .setCheck("String")
            .appendField("DeliverObject");
        this.appendValueInput("objectDestinationLocation")
            .setCheck("String")
            .appendField("from position");
        this.appendValueInput("objectTargetLocation")
            .setCheck("String")
            .appendField("to position");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(80);
     this.setTooltip("Deliver an object from a source to a target position. For positions either use DetectObject before (e.g. $DetectObject), use fixed predefined ones (e.g. location A) or use coordinates (e.g. x,y,z).");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['FetchObject'] = {
      init: function() {
        this.appendValueInput("objectType")
            .setCheck("String")
            .appendField("FetchObject");
        this.appendValueInput("objectSourceLocation")
            .setCheck("String")
            .appendField("from position");
        this.appendValueInput("objectTargetLocation")
            .setCheck("String")
            .appendField("to position");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(80);
     this.setTooltip("Fetch an object from a source to a target position. For positions either use DetectObject before (e.g. $DetectObject), use fixed predefined ones (e.g. location A) or use coordinates (e.g. x,y,z).");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['MeasureHydration'] = {
      init: function() {
    	this.appendDummyInput()
            .appendField("MeasureHydration");
    	this.appendValueInput("measurementInterval")
            .setCheck("String")
            .appendField("measurement interval");
        this.appendValueInput("alarmThreshold")
            .setCheck("String")
            .appendField("alarm threshold");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
     this.setTooltip("Measure hydration data in a specified interval (e.g. 10 seconds) and trigger an alarm when a certain threshold is reached (ranges from 0 - 100).");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['DetectObject'] = {
      init: function() {
        this.appendValueInput("object")
            .setCheck("String")
            .appendField("DetectObject");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
     this.setTooltip("Detect an object for later usage (e.g. DeliverObject, FetchObject).");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['GrabObject'] = {
      init: function() {
        this.appendValueInput("objectType")
            .setCheck("String")
            .appendField("GrabObject");
        this.appendValueInput("objectPosition")
            .setCheck("String")
            .appendField("from position");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
     this.setTooltip("Grab an object from a position. For positions either use DetectObject before (e.g. $DetectObject), use fixed predefined ones (e.g. location A) or use coordinates (e.g. x,y,z).");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['PutObject'] = {
      init: function() {
    	this.appendDummyInput()
            .appendField("PutObject");
        this.appendValueInput("position")
            .setCheck("String")
            .appendField("to position");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
     this.setTooltip("Put an object to a position. Requires using GrabObject beforehand. For positions either use DetectObject before (e.g. $DetectObject), use fixed predefined ones (e.g. location A) or use coordinates (e.g. x,y,z).");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['TeachingWorkspacePosition'] = {
      init: function() {
        this.appendValueInput("robotPosition")
            .setCheck("String")
            .appendField("TeachingWorkspacePosition");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(200);
     this.setTooltip("Teach a workspace position for later usage (e.g. DeliverObject, FetchObject).");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['TeachingObjectRecognition'] = {
      init: function() {
        this.appendValueInput("objData")
            .setCheck("String")
            .appendField("TeachingObjectRecognition");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(200);
     this.setTooltip("Teach an object for later usage (e.g. DeliverObject, FetchObject).");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['Loop'] = {
      init: function() {
        this.appendValueInput("repeat")
            .setCheck("String")
            .appendField("repeat");
        this.appendDummyInput()
            .appendField("times");
        this.appendStatementInput("statement")
            .setCheck(null)
            .appendField("do");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(240);
     this.setTooltip("Do statements several times.");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['Selection'] = {
      init: function() {
        this.appendValueInput("condition")
            .setCheck("String")
            .appendField("if");
        this.appendDummyInput()
            .appendField("then");
        this.appendStatementInput("statement")
            .setCheck(null)
            .appendField("do");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(240);
     this.setTooltip("Do statement based on condition.");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['WaitForCondition'] = {
      init: function() {
        this.appendValueInput("condition")
            .setCheck("String")
            .appendField("wait until");
        this.appendStatementInput("statement")
            .setCheck(null)
            .appendField("do");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(240);
     this.setTooltip("Wait until a condition is reached before executing the next statement.");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['GetData'] = {
      init: function() {
    	this.appendValueInput("inputData")
            .setCheck("String")
            .appendField("GetData");
        this.appendValueInput("Endpoint")
            .setCheck("String")
            .appendField("Endpoint");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(280);
     this.setTooltip("Get input data from a specified endpoint.");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['GetDataReturn'] = {
      init: function() {
    	this.appendValueInput("inputData")
            .setCheck("String")
            .appendField("GetData");
        this.appendValueInput("Endpoint")
            .setCheck("String")
            .appendField("Endpoint");
        this.setOutput(true, null);
        this.setColour(280);
     this.setTooltip("Get return data from a specified endpoint.");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['SetData'] = {
      init: function() {
    	this.appendValueInput("outputData")
            .setCheck("String")
            .appendField("SetData");
        this.appendValueInput("Endpoint")
            .setCheck("String")
            .appendField("Endpoint");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(280);
     this.setTooltip("Set output data to a specified endpoint.");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['WaitForExternalEvent'] = {
      init: function() {
        this.appendValueInput("inputText")
            .setCheck("String")
            .appendField("WaitForExternalEvent");
    	this.appendValueInput("timestamp")
            .setCheck("String")
            .appendField("at time");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(280);
     this.setTooltip("Wait for an external event at a specified time (e.g. unix timestamp, ISO datetime).");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['WaitForUserInput'] = {
      init: function() {
        this.appendValueInput("inputContent")
            .setCheck("String")
            .appendField("WaitForUserInput")
            .appendField(new Blockly.FieldDropdown([["touch","touch"], ["keyboard","keyboard"], ["speech","speech"]]), "inputMode");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(320);
     this.setTooltip("Wait for an input by the user.");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['VoiceOutput'] = {
      init: function() {
        this.appendValueInput("outputMessage")
            .setCheck("String")
            .appendField("VoiceOutput");
    	this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(320);
     this.setTooltip("Output a message via text-to-speech.");
     this.setHelpUrl("");
      }
    };
    Blockly.Blocks['GraphicalUserInteraction'] = {
      init: function() {
    	this.appendValueInput("outputMessage")
            .setCheck("String")
            .appendField("GraphicalUserInteraction");
        this.appendValueInput("userOptions")
            .setCheck("String")
            .appendField("with options");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(320);
     this.setTooltip("Output a message / question and selection options in the form of an array (e.g. ['option A','option B','option C'].");
     this.setHelpUrl("");
      }
    };
  }

}
