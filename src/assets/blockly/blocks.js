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
        .appendField(new Blockly.FieldDropdown([["MQTT","MQTT"], ["OPC-UA","OPC-UA"]]), "messageType");
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(40);
 this.setTooltip("Send a MQTT or OPC-UA message to another asset.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['OnMessageReceive'] = {
  init: function() {
    this.appendValueInput("messageContent")
        .setCheck("String")
        .appendField("OnMessageReceive")
		.appendField(new Blockly.FieldDropdown([["MQTT","MQTT"], ["OPC-UA","OPC-UA"]]), "messageType");
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(40);
 this.setTooltip("React to a MQTT or OPC-UA message by another asset.");
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