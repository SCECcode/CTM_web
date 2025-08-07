/***
   ctm_util.js

***/

// footer is about 58px
function setIframHeight(id) {
  let top = document.documentElement.clientHeight;
//  var f_h=58;
  var f_h=40;
  var height=top -(f_h);

  document.getElementById(id).height = height;
  return height;
}

function setDailyCleanResult(targetHour, targetMinute) {
    const now = new Date();

    // Set target time a day after now
    const targetTime = new Date(now);
    targetTime.setDate(now.getDate() + 1);  

    // Calculate the time difference in milliseconds
    const timeUntilTarget = targetTime - now;

    // Set a timeout to execute a function once every 24 hours
    setTimeout(function() {
        // After running, set up another timeout for the next day (same time)
        setDailyCleanResult(targetHour, targetMinute);
    }, timeUntilTarget);
}



// remove an item from a list base on its matching 'uid'
function removeFromList(alist, uid) {
    var cnt=alist.length;
    var item;
    for(var i=0;i<cnt;i++) {
       item=alist[i];
       if(item['uid']==uid) { // found the item to remove
           var index = alist.indexOf(item);
           if (index > -1) {
             alist.splice(index, 1);
             return item;
           }
           return undefined; 
       }
    }
    return undefined;
}

function checkInList(alist, uid) {
    var cnt=alist.length;
    var item;
    for(var i=0;i<cnt;i++) {
       item=alist[i];
       if(item['uid']==uid) { // found the item to remove
           var index = alist.indexOf(item);
	   return(index);
       }
    }
    return undefined;
}

// [[lon1,lat1,z1],...,[lonn,latn,zn]]
// make sure it is unique
function makeLatlngs(darray) {
   var cnt=darray.length;
   var latlngs=[];
   for(var i=0;i<cnt;i++) {
      var item=darray[i];
      var lon=item[0];
      var lat=item[1];
      var z=item[2];
      var nitem= {"lat":lat,"lon":lon}
      if(latlngs.indexOf(nitem) == -1) {
        latlngs.push(nitem);
      }
   }
   return latlngs;
}

/*
   first latlon has to be sw side 
   second latlons is the ne side of the rectangle
*/
// [flat, flon, slat, slon ]=fixOrdering(firstlat, firstlon, secondlat, secondlon) 
function fixAreaOrdering(firstlat, firstlon, secondlat, secondlon) {
    var minlon = firstlon;
    var maxlon = secondlon;
    if(firstlon > secondlon) {
        minlon = secondlon;
        maxlon = firstlon;
    }

    var minlat = firstlat;
    var maxlat = secondlat;
    if( firstlat >  secondlat) {
        minlat = secondlat;
        maxlat = firstlat;
    }
    return [minlat, minlon, maxlat, maxlon];
}

/*
XXX ??? might need something so that backend would work 
plot tool can not do a complete horizontal line ???
*/
function fixLineOrdering(firstlat, firstlon, secondlat, secondlon) {

    return firstAreaOrdering(firstlat, firstlon, secondlat, secondlon);
}

function processSearchResult(rlist,uid=0) {
    if (rlist == 'replotVerticalProfile') {
        dstr = '[data-side=\"'+"verticalProfileReplot"+'\"]';
        str = $(dstr).data('params');
    }
    if (rlist == 'replotCrossSection') {
        dstr = '[data-side=\"'+"crossSectionReplot"+'\"]';
        str = $(dstr).data('params');
    }
    if (rlist == 'replotHorizontalSlice') {
        dstr = '[data-side=\"'+"horizontalSliceReplot"+'\"]';
        str = $(dstr).data('params');
    }
    if (rlist == 'plotHorizontalSlice') {
        dstr = '[data-side=\"'+"horizontalSlice"+uid+'\"]';
        str = $(dstr).data('params');
    }
    if (rlist == 'plotHorizontalSlice') {
        dstr = '[data-side=\"'+"horizontalSlice"+uid+'\"]';
        str = $(dstr).data('params');
    }
    if (rlist == 'plotVerticalProfile') {
        dstr = '[data-side=\"'+"verticalProfile"+uid+'\"]';
        str = $(dstr).data('params');
    }
    if (rlist == 'plotCrossSection') {
        dstr = '[data-side=\"'+"crossSection"+uid+'\"]';
        str = $(dstr).data('params');
    }
    if (rlist == 'getMaterialPropertyByLatlon') {
        dstr = '[data-side=\"'+"materialPropertyByLatlon"+uid+'\"]';
        str = $(dstr).data('params');
    }
    if (rlist == 'getMaterialPropertyByLatlonChunk') {
        dstr = '[data-side=\"'+"materialPropertyByLatlonChunk"+uid+'\"]';
        str = $(dstr).data('params');
    }
    if (rlist == 'getMaterialPropertyByLatlonList') {
        dstr = '[data-side=\"'+"materialPropertyByLatlonList"+uid+'\"]';
        str = $(dstr).data('params');
    }

    if (rlist == 'getInstallModelList') {
        dstr = '[data-side=\"'+"installModelList"+'\"]';
        str = $(dstr).data('params');
    }
    if (rlist == 'cleanResultDirectory') {
        dstr = '[data-side=\"'+"cleanResultDirectory"+'\"]';
        str = $(dstr).data('params');
    }

    if (rlist == undefined) {
       window.console.log("processSearchResult: BAD BAD BAD");
       return (undefined);
    }
    return (str);
}


function makeVProfileMetaFname(uid) {
  var s=uid+"_v_meta.json";
  return s;
}

function makeVProfileMPFname(uid) {
  var s=uid+"_v_matprops.json";
  return s;
}

//not used ??
function makeVProfileCSVFname(uid) {
  //var s=uid+"_v_data.csv";
  var s=uid+"_v_matprops.csv";
  return s;
}

var CHUNK_SIZE=100;

//https://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects-by-property
/* sorting json blobs
var homes = [
   {"h_id":"3","city":"Dallas","state":"TX","zip":"75201","price":"162500"},
   {"h_id":"4","city":"Bevery Hills","state":"CA","zip":"90210","price":"319250"}]
-- Sort by price high to low
homes.sort(sort_by('price', true, parseInt));
-- Sort by city, case-insensitive, A-Z
homes.sort(sort_by('city', false, function(a){return a.toUpperCase()}));
*/
var sort_by=function(field, reverse, primer){

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}

//
// Reading files using the HTML5 FileReader.
//
function readAndProcessLocalFile(fobj,forPoint) {
  if(forPoint==1) {
    readAndProcessLocalFileForPoint(fobj);
    } else {
      readAndProcessLocalFileForProfile(fobj);
  }
}

function readAndProcessLocalFileForPoint(fobj) {

  var reader = new FileReader();

  reader.onload=function(event) {
    var csv = event.target.result; 
    var ffline = reader.result.split('\n');
    var cnt=ffline.length;
    var fdata=[];
    if(cnt == 0) { 
      window.console.log("ERROR, can not process the upload file ");
      return;
    }
    for(i=0;i<cnt;i++) {
      var fline=ffline[i];
      if(fline[0]=='#')
        continue;
        
      if(fline.includes(",")) { 
        $.csv.toArray(fline, {}, function(err, data) {
           var v=[];
           if( data != "" && data.length >= 3 ) {
             v.push(data[0]);
             v.push(data[1]);
             v.push(data[2]);
             fdata.push(v);
           }
        }); 
        } else {
// space separated format 
           var data=fline.split(' ');
           var v=[]; 
           if( data != "" && data.length >= 3 ) {
             v.push(data[0]);
             v.push(data[1]);
             v.push(data[2]);
             fdata.push(v);
           }
      }
    }

    var cnt=fdata.length;
    var chunk_size=CHUNK_SIZE;
    var chunks=Math.ceil(cnt/chunk_size);
    if(chunks == 1)
       chunk_size=cnt;

    var uid=getRnd("CTM");
     
    add_file_of_point(uid,fobj);
    getMaterialPropertyByLatlonList(uid,fdata,0, chunks, chunk_size);

  };
  reader.readAsText(fobj);
  
}

function readAndProcessLocalFileForProfile(fobj) {

  var reader = new FileReader();

  reader.onload=function(event) {
    var csv = event.target.result; 
    var ffline = reader.result.split('\n');
    var cnt=ffline.length;
    var all="vs,vp,density";
    var fdata=[];
    if(cnt == 0) { 
      window.console.log("ERROR, can not process the upload file ");
      return;
    }

    for(i=0;i<cnt;i++) {
      var fline=ffline[i];
      if(fline[0] == '#')
        continue; 	     
      if(fline.includes(",")) { 
        $.csv.toArray(fline, {}, function(err, data) {
           var v=data;
           if(v != "" && v.length >= 5) {
             fdata.push(v);
           }
        }); 
        } else {
// space separated format 
          var v=fline.split(' ');
          if(v != "" && v.length >= 5) {
            fdata.push(v);
          }
      }
    }

    for(let i=0; i< fdata.length; i++) {
       let item=fdata[i];
       let stub=item[5];
       let uid=getRnd(stub); // rewrite the stub
       fdata[i][5]=all;
       fdata[i].push(uid);
    }
    plotVerticalProfileByList(fdata,0,fdata.length);

  };
  reader.readAsText(fobj);
}

function refreshMPTable() {
    var table=document.getElementById("materialPropertyTable");
    table.innerHTML="<tbody><tr id=\"placeholder-row\"><td colspan=\"12\">Material Property for selected locations will appear here. </td></tr></tbody>";
    hold_mptable=1;
    clear_materialproperty();
}

function refreshResultTable() {
    var table=document.getElementById("metadataPlotTable");
    table.innerHTML="<tbody><tr id=\"placeholder-row\"><td colspan=\"12\">Result, Plot and Metadata will appear here. </td></tr></tbody>";
}
