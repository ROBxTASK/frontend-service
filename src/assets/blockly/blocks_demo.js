Blockly.Blocks['set_asset'] = {
  init: function() {
    this.appendValueInput("asset")
        .setCheck("String")
        .appendField("SetAsset");
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Select the asset to be used for the following commands.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['send_message'] = {
  init: function() {
    this.appendValueInput("message")
        .setCheck("String")
        .appendField("SendMessage");
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Send a message to another asset.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['wait_message'] = {
  init: function() {
    this.appendValueInput("message")
        .setCheck("String")
        .appendField("WaitForMessage");
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Wait for a message by another asset.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['voice_output'] = {
  init: function() {
    this.appendValueInput("message")
        .setCheck("String")
        .appendField("VoiceOutput");
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Output a message via text-to-speech.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['wait_user'] = {
  init: function() {
    this.appendValueInput("message")
        .setCheck("String")
        .appendField("WaitForUserInput")
        .appendField(new Blockly.FieldDropdown([["touch","touch"], ["keyboard","keyboard"], ["speech","speech"]]), "type");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Wait for an input by the user.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['detect_object'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("DetectObject");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Detect an object for later usage (e.g. FetchObject).");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['fetch_object'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("FetchObject");
    this.appendValueInput("from_position")
        .setCheck("String")
        .appendField("from position");
    this.appendValueInput("to_position")
        .setCheck("String")
        .appendField("to position");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Fetch an object from a source to a target position. For positions either use DetectObject before (e.g. $DetectObject), use fixed predefined ones (e.g. location A) or use coordinates (e.g. x,y,z).");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['move_position'] = {
  init: function() {
    this.appendValueInput("position")
        .setCheck("String")
        .appendField("MoveToPosition");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Move the asset to a target position. For positions either use fixed predefined ones (e.g. location A) or use coordinates (e.g. x,y,z).");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['repeat_custom'] = {
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
    this.setColour(120);
 this.setTooltip("Do statements several times.");
 this.setHelpUrl("");
  }
};