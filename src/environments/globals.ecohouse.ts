'use strict';

// Development variables

export const debug = false;


// Base path variables - SRFG staging

// export const base_path = "http://nimble-staging.salzburgresearch.at";
// export const ub_base = "http://nimble-staging.salzburgresearch.at/search";
// export const pw_reset_link = "http://nimble-staging.salzburgresearch.at:8080/auth/realms/master/login-actions/reset-credentials?client_id=nimble_client";


// Base path variables - MVP productive

// export const base_path = "https://nimble-platform.salzburgresearch.at/nimble";
// export const ub_base = "https://nimble-platform.salzburgresearch.at/ub-search";
// export const pw_reset_link = "https://nimble-platform.salzburgresearch.at:8080/auth/realms/master/login-actions/reset-credentials?client_id=nimble_client";


// Base path variables - FMP productive

// export const base_path = "https://fmp-nimble.salzburgresearch.at/api";
// export const ub_base = "https://fmp-nimble.salzburgresearch.at/ub-search";
// export const pw_reset_link = "https://fmp-nimble.salzburgresearch.at:8080/auth/realms/master/login-actions/reset-credentials?client_id=nimble_client";


// Base path variables - EFAC productive

// export const base_path = "https://efactory-nimble.salzburgresearch.at/api";
// export const ub_base = "https://efactory-nimble.salzburgresearch.at/ub-search";
// export const pw_reset_link = "https://efactory-nimble.salzburgresearch.at:8080/auth/realms/master/login-actions/reset-credentials?client_id=nimble_client";


// Base path variables - SRFG K8S

// export const base_path = "https://nimble.salzburgresearch.at";
// export const ub_base = "https://hydra2.ikap.biba.uni-bremen.de:8443";
// export const pw_reset_link = "https://nimble-platform.salzburgresearch.at:8080/auth/realms/master/login-actions/reset-credentials?client_id=nimble_client";


// Base path variables - K8S domain

// export const base_path = "http://nimble.uk-south.containers.mybluemix.net";
// export const ub_base = "https://hydra2.ikap.biba.uni-bremen.de:8443";
// export const pw_reset_link = "https://nimble-platform.salzburgresearch.at:8080/auth/realms/master/login-actions/reset-credentials?client_id=nimble_client";


// Base path variables - BIBA domain

export const base_path = "http://nimble-dev.ikap.biba.uni-bremen.de";
export const ub_base = "http://nimble-dev.ikap.biba.uni-bremen.de:10096";
export const pw_reset_link = "http://nimble-dev.ikap.biba.uni-bremen.de:8080/auth/realms/master/login-actions/reset-credentials?client_id=nimble_client";


// Base path variables - IBM domain

// export const base_path = "http://161.156.70.122";
// export const ub_base = "http://161.156.70.122:8090";
// export const pw_reset_link = "http://161.156.70.122:8080/auth/realms/master/login-actions/reset-credentials?client_id=nimble_client";


// Base path variables - Local development

// export const base_path = "http://localhost";
// export const ub_base = "http://localhost:8090";
// export const pw_reset_link = "http://localhost:8080/auth/realms/master/login-actions/reset-credentials?client_id=nimble_client";


// Service endpoints

export const user_mgmt_endpoint=`${base_path}/identity`;
export const catalogue_endpoint=`${base_path}/catalog`;
export const bpe_endpoint=`${base_path}/business-process`;
export const data_channel_endpoint=`${base_path}/data-channel`;
export const data_aggregation_endpoint=`${base_path}/data-aggregation`;
export const trust_service_endpoint=`${base_path}/trust`;
export const indexing_service_endpoint=`${base_path}/indexing-service`;
export const rocketChatEndpoint = `${base_path}:3000`;
export const logstash_endpoint = `${base_path}:9200`;
export const kibana_endpoint = `${base_path}/kibana/app/kibana`;
export const delegate_endpoint = `${base_path}:9265`;


// BIBA endpoints

export const languageEndPoint = `${ub_base}/getSupportedLanguages`;
export const endpoint = `${ub_base}/detectMeaningLanguageSpecific`;
export const logicalViewEndpoint = `${ub_base}/getLogicalView`;
export const propertyEndPoint = `${ub_base}/getPropertyValuesDiscretised`;
export const sparqlEndPoint = `${ub_base}/executeSPARQLSelect`;
export const sparqlOptionalSelectEndPoint = `${ub_base}/executeSPARQLOptionalSelect`;
export const spqButton = `${ub_base}/getSQPFromOrangeGroup`;
export const obs_propFromConcept = `${ub_base}/getPropertyFromConcept`;
export const obs_propValueFromConcept = `${ub_base}/getPropertyValuesFromGreenGroup`;
export const referenceFromConcept = `${ub_base}/getReferencesFromAConcept`;
export const sqpOrangeConcept = `${ub_base}/getPropertyValuesFromOrangeGroup`;


// TnT Endpoints

export const tntEndpoint = `${base_path}/tracking`;
export const tntAnalysisEndpoint = `${base_path}/tnt/simpleTrackingAnalysis`;
export const tntMasterDataEndpoint = `${base_path}/tracking/masterData/id/`;


// Platform Configuration

export const config = {
  "platformName": "Eco-House",
  "companyRegistrationRequired": false,
  "categoryFilter": {
    "eClass": {
      "hiddenCategories": [],
      "logisticsCategory": "14000000",
      "ontologyPrefix": "http://www.nimble-project.org/resource/eclass#"
    },
    "FurnitureOntology": {
      "hiddenCategories": ["Catalogue","Company","ContactPerson","Guarantee","Price","Process","Standard","Style","Technique"],
      "logisticsCategory": "LogisticsService",
      "ontologyPrefix": "http://www.aidimme.es/FurnitureSectorOntology.owl#"
    }
  },
  "dataChannelsEnabled" : true,
  "delegationEnabled": false,
  "frameContractTabEnabled":true,
  "imprint": "<table class='table table-borderless'><tr><td class='w-50 p-0 pr-3'><u>Platform Owner</u><br/><b>Lindbäcks Bygg Aktiebolag</b><br/>Hammarvägen 21<br/>94336 Öjebyn<br/>Sweden<br/></td><td class='w-50 p-0 pl-3'><u>Platform Provider</u><br/><b>Universität Bremen</b><br/>Bibliothekstraße 1<br/>28359 Bremen, Germany<br/>Phone: +49 421 218-1<br/>Internet: <a href='https://www.uni-bremen.de' target='_blank'>www.uni-bremen.de</a><br/>Die Universität Bremen ist eine Körperschaft des Öffentlichen Rechts. Sie wird durch den Rektor Prof. Dr.-Ing. Bernd Scholz-Reiter gesetzlich vertreten.\n" +
      "Zuständige Aufsichtsbehörde ist die Senatorin für Wissenschaft, Gesundheit und Verbraucherschutz, Rembertiring 8 – 12, 28195 Bremen.<br/>DE 811 245 070 (gemäß § 27 a UStG)<br/></td></tr></table>",
  "kibanaConfig": {
    "dashboards": []
  },
  "kibanaEnabled": false,
  "loggingConfig": {
    "index": "logstash-{DATE}",
    "type": "doc",
    "dateFormat": "YYYY.MM.DD"
  },
  "loggingEnabled": false,
  "logoPath": "./assets/logo_mvp.png",
  "logoRequired": false,
  "phoneNumberRequired": false,
  "projectsEnabled": true,
  "requiredAgreements": [
    {
      "title":"End-User License Agreement (EULA)",
      "src":"./assets/eula.pdf"
    }
  ],
  "showChat": false,
  "showCompanyMembers": false,
  "showExplorative": true,
  "showLCPA": true,
  "showPPAP": true,
  "showTrack": true,
  "showTrade": true,
  "showVerification": true,
  "standardCurrency": "SEK",
  "standardTaxonomy": "All",
    "defaultSearchIndex": "Products",
    "supportedActivitySectors": {
  	"": [],
  	"Logistics Provider": [],
  	"Manufacturer": [],
  	"Service Provider": [],
  	"Other": []
  },
  "supportedBusinessTypes": [
  	"",
  	"Logistics Provider",
  	"Manufacturer",
  	"Service Provider",
  	"Other"
  ],
  "supportedCertificates": [
      "Appearance Approval Report",
      "Checking Aids",
      "Control Plan",
      "Customer Engineering Approval",
      "Customer Specific Requirements",
      "Design Documentation",
      "Design Failure Mode and Effects Analysis",
      "Dimensional Results",
      "Engineering Change Documentation",
      "Initial Process Studies",
      "Master Sample",
      "Measurement System Analysis Studies",
      "Part Submission Warrant",
      "Process Failure Mode and Effects Analysis",
      "Process Flow Diagram",
      "Qualified Laboratory Documentation",
      "Records of Material / Performance Tests",
      "Sample Production Parts",
      "Other"
  ],
  "supportedRoles": [
      "company_admin",
      "external_representative",
      "legal_representative",
      "monitor",
      "publisher",
      "purchaser",
      "sales_officer"
  ],
  "supportMail": "wel1@biba.uni-bremen.de",
  "supportMailContent": {
    "en":"Dear NIMBLE support team,\n\n\nI have encountered an issue.\n\nDescription of the issue:\n[Please insert a detailed description of the issue here. Add some screenshots as an attachement if they are of use.]"
  }
};


// Catalogue format variables

export const product_vendor = "manufacturer";
export const product_vendor_id = "id";
export const product_vendor_img = "logoId";
export const product_vendor_name = "legalName";
export const product_vendor_rating = "trustRating";
export const product_vendor_rating_seller = "trustSellerCommunication";
export const product_vendor_rating_fulfillment = "trustFullfillmentOfTerms";
export const product_vendor_rating_delivery = "trustDeliveryPackaging";
export const product_vendor_trust = "trustScore";
export const product_name = "label";
export const class_label = "classification.allLabels";
export const product_description = "description";
export const product_img = "imgageUri";
export const product_price = "price";
export const product_currency = "currency";
export const product_cat = "classificationUri";
export const product_cat_mix = "commodityClassficationUri";
export const product_filter_prod = ["freeOfCharge","certificateType","applicableCountries"];
export const product_filter_comp = ["manufacturer.legalName","manufacturer.businessType","manufacturer.activitySectors","manufacturer.businessKeywords","manufacturer.origin","manufacturer.certificateType","manufacturer.ppapComplianceLevel","manufacturer.ppapDocumentType"];
export const party_facet_field_list = ["legalName","businessType","activitySectors","businessKeywords","origin","certificateType","ppapComplianceLevel","ppapDocumentType"];
export const party_filter_main = ["businessType","activitySectors","businessKeywords","origin","certificateType","ppapComplianceLevel","ppapDocumentType"];
export const party_filter_trust = ["trustScore","trustRating","trustSellerCommunication","trustFullfillmentOfTerms","trustDeliveryPackaging","trustNumberOfTransactions"];
export const item_manufacturer_id = "manufacturerId";
export const product_filter_trust = ["manufacturer.trustScore","manufacturer.trustRating","manufacturer.trustSellerCommunication","manufacturer.trustFullfillmentOfTerms","manufacturer.trustDeliveryPackaging","manufacturer.trustNumberOfTransactions"];
export const product_filter_mappings = {
  "price": "Price",
  "currency": "Currency",
  "manufacturer.businessType": "Business Type",
  "manufacturer.activitySectors": "Activity Sectors",
  "manufacturer.businessKeywords": "Business Keywords",
  "businessType": "Business Type",
  "activitySectors": "Activity Sectors",
  "businessKeywords": "Business Keywords"
};
export const product_nonfilter_full = ["_text_","_version_","id","image","localName","languages","catalogueId","doctype","manufacturerId","manufacturerItemId","allLabels"];
export const product_nonfilter_regex = ["lmf.","_id", "_txt", "_desc", "_label", "_key", "_price", "_currency", "httpwwwnimbleprojectorgresourceeclasshttpwwwnimbleprojectorgresourceeclasshttpwwwnimbleprojectorgresourceeclasshttpwwwnimbleprojectorgresourceeclass"];
export const product_configurable = [];
export const product_default = {};
export const facet_min = 1;
export const facet_count = -1;
export const query_settings = {
  "fields": ["STANDARD","commodityClassficationUri","{LANG}_label","{LANG}_desc"],
  "boosting": true,
  "boostingFactors": {
    "STANDARD": 4,
    "commodityClassficationUri": 16,
    "{LANG}_label": 64,
    "{LANG}_desc": -1
  }
};
export const query_settings_comp = {
  "fields": ["STANDARD","legalName"],
  "boosting": true,
  "boostingFactors": {
    "STANDARD": 4,
    "legalName": 64
  }
};
