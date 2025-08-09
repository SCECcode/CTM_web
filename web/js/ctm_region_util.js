/****

  ctm_region_util.js

****/

// information on model 
var CTM_installed=[];

// str is a blob { 'models': ['lee2025','shinevar2018'] }
function makeInstallModelList(str) {
  var blob;
  if( str == undefined || str == "" ) {
     window.console.log("ERROR: no return result");
     return "";
  }
  if( typeof str === 'string') {
     blob=JSON.parse(str);
     } else {
       blob=str;
  }
  var mlist=blob['models'];
  var cnt=mlist.length;
  var i;
  for(i=0;i<cnt;i++) {
    var item=mlist[i];
    CTM_installed.push(item);
  }
  setup_modeltype();
}

function isModelInstalled(pname) {
  var cnt=CTM_installed.length;
  var i=0;
  for(i=0; i<cnt;i++) {
     if(CTM_installed[i]==pname) {
        return 1;
     }
  }
  return 0;
}

function makeModelSelection() {
   var tb=CTM_tb['models'];
   var cnt=tb.length;
   var i;
   var option;
   for(i=0; i<cnt; i++) {
     var item=tb[i];
     var color=item['color'];
     var aname=item['abb name'];
     var mname=item['name'];
     var pname=item['path name'];
     // check the model directory to make sure it exists before adding 
     // the option
     if(isModelInstalled(pname)) {
        var sel=document.getElementById('selectModelType');
        option = document.createElement("option");
        option.text = mname;
        option.label = mname;
        option.value= aname;
        sel.add(option);
     }
   } 
}

// target_nm is abb_name
function getModelIndex(nm) {
   let target=nm.trim();
   var tb=CTM_tb['models'];
   var icnt=tb.length;
   var i;
   for(i=0; i<icnt; i++) {
     var item=tb[i];
     if(item['abb name'] == target) {
        return i;
     }
  }
  return -1;
}

// using id in CTM_tb
function getModelDescriptionById(id) {
   let tb=CTM_tb['models'];
   let item=tb[id];
   var descript=item['description'];
   return descript;
}

function getModelDescriptionBriefById(id) {
   let tb=CTM_tb['models'];
   let item=tb[id];

   let tmp=item['description_brief'];
   if('description_brief' in item) { 
       return item['description_brief'];
   } else return null;
}

function getModelNameById(id) {
   let tb=CTM_tb['models'];
   let item=tb[id];
   var name=item['name'];
   return name;
}
function getModelAbbNameById(id) {
   let tb=CTM_tb['models'];
   let item=tb[id];
   var name=item['abb name'];
   return name;
}

function getModelFilenameById(id) {
   let tb=CTM_tb['models'];
   let item=tb[id];
   var name=item['model filename'];
   return name;
}

// nm = 'abb name'
// return unique index list into references array
function getReferenceIndex(nm, olist,alist,rlist) {
   let target=nm.trim();
   let mlist=CTM_tb['references'];
   let foo=mlist[0];
   let mcnt=mlist.length;
   for(let i=0; i<mcnt; i++) {
      let fitem=mlist[i];
      let nlist=fitem['name'];
      let ncnt=nlist.length;
      for(let j=0; j<ncnt; j++) {
        if(nlist[j] == target) {
          if(olist.includes(i)) {
            } else {
             
              if( 'author' in fitem ) {
                olist.push(i);
                alist.push(fitem['author']);
                rlist.push(fitem['ref']);
              }
          }
        }
      }
   }
}

function getReferenceByList(reflist,alist,rlist) {
   let mlist=CTM_tb['references'];
   let cnt=reflist.length;
   for(let i=0; i<cnt; i++) {
      let item=mlist[i];
      if('author' in item) {
        alist.push(item['author']);
        rlist.push(item['ref']);
      }
   }
   return alist,rlist;
}

function getModelColor(nm) {
   let target=nm.trim();
   var tb=CTM_tb['models'];
   var icnt=tb.length;
   var i;
   for(i=0; i<icnt; i++) {
     var item=tb[i];
     if(item['abb name'] == target) {
        var color=item['color'];
        return color;
     }
  }
  return "black";
}

function makeLatlngsCoordinate(nm) {
   let target=nm.trim();
   var ret=[];
   var tb=CTM_tb['models'];
   var icnt=tb.length;
   var lon, lat;
   var i,j;
   for(i=0; i<icnt; i++) {
     var item=tb[i];
     if(item['abb name'] == target) {
        var coord=item['coordinates'];
        var jcnt=coord.length;
        for(j=0;j<jcnt;j++) {
          var c=coord[j];
          lon=c['lon'];
          lat=c['lat'];
          ret[ret.length]=([lat, lon]);      
        }
//        window.console.log(ret);
        return ret;
      }
   }
   return ret;
}

function makeModelTable() {
   var tb=CTM_tb['models'];
   var cnt=tb.length;
   var i;
   var tbhtml="<table><tbody><tr><td style=\"border:1px solid white;\">CTM Model Table</td></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"ctm-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><th style=\"width:8vw\"><b>Model</b></th><th style=\"width:6vw\"><b>CTM abbreviation</b></th><th style=\"width:40vw\"><b>Description</b></th></tr>";

   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var mname=item['name'];
     var aname=item['abb name'];
     var pname=item['path name'];
     if(isModelInstalled(pname)) {
       var descript=item['description'];
       var t="<tr><td style=\"width:6vw\">"+mname+"</td><td style=\"width:6vw\">"+aname+"</td><td style=\"width:40vw\">"+descript+"</td></tr>";
       tbhtml=tbhtml+t;
     }
   }
   tbhtml=tbhtml+"</tbody></table></div>";
   return tbhtml;
}

function _getModelItemWithID(id) {
   var tb=CTM_tb['models'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var model=tb[i];
      if(model['id'] == id) {
        return model;
      }
   }
   return undefined;
}

function getModelNameWithID(id) {
   var item=_getModelItemWithID(id);
   if(item != undefined) {
       var n= item['name'];
       return n;
   }
   return undefined;
}

function getModelNameWithType(t) {
   // t could be multiple, "albacore,ctms"
   var rt="";
   var mlist=t.split(',');
   var mcnt=mlist.length;
   var tlist=CTM_tb['models'];
   var tcnt=tlist.length;
   var i,j;

   for(i=0;i<mcnt;i++) {
      for(j=0; j<tcnt;j++) {
         var target=tlist[j];
         if(target['abb name'] == mlist[i]) {
            rt=rt+target['name'];
            if(mcnt>1 && i!=(mcnt-1))
               rt=rt+", ";
            break;
	 } 
      }
      if(j == tcnt) { // not found
         rt=rt+mlist[i];
      }
   }
   if(rt=="") {
       rt=undefined;
   }

   return rt;
}

function getModelColorWithID(id) {
   var item=_getModelItemWithID(id);
   if(item != undefined) {
       var c= item['color'];
       return c;
   }
   return undefined;
}

function getModelCoordinatesWithID(id) {
   var item=_getModelItemWithID(id);
   if(item != undefined) {
       var coord= item['coordinates'];
       return coord;
   }
   return undefined;
}

function getAllModelNames() {
   var ret=[];
   var tb=CTM_tb['models'];
   var cnt=tb.length;
   var i,item,aname;
   for(i=0; i<cnt; i++) {
     item=tb[i]; 
     aname=item['abb name'];
     ret.push(aname);
   }
   return ret;
}

function showInTable(key) {
   var tb=CTM_tb['descript'];
   var cnt=tb.length;
   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var label=item['id'];
     if(label == key) {
       return item['show'];
     }
  }
  window.console.log("ERROR, showInTable, no such key",key);
  return 0;
}

function makeParametersTable() {
   var tb=CTM_tb['descript'];
   var cnt=tb.length;
   var i;
   var tbhtml="<table><tbody><tr><td style=\"border:1px solid white;\">CTM Parameters Table</td></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"ctm-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><th style=\"width:10vw\"><b>Parameter</b></th><th style=\"width:45vw\"><b>Description</b></th></tr>";
   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var label=item['id'];
     var descript=item['descript'];
     if( item['show'] ) {
       var t="<tr><td style=\"width:10vw\">"+label+"</td><td style=\"width:45vw\">"+descript+"</td></tr>";
       tbhtml=tbhtml+t;
     }
   }
   tbhtml=tbhtml+"</tbody></table></div>";
   return tbhtml;
}

