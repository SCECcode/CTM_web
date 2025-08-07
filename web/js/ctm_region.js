/****

  ctm_region.js

****/

var CTM_tb={
"models": [
{'id':1,
     'name':'Lee_2025',
     'abb name':'lee2025',
     'path name':'lee2025',
     'model filename':'ThermalModel_WUS_v2.nc',
     'description':'ThermalModel_WUS_v2',
     'detail':'USGS developed San Francisco and Central California velocity model',
     'coordinates': [ {'lon':-120.644051,'lat':37.050062},
                      {'lon':-121.922036,'lat':36.320331},
                      {'lon':-123.858493,'lat':38.424179},
                      {'lon':-122.562365,'lat':39.174505},
                      {'lon':-120.644051,'lat':37.050062} ],
     'color':'#FF00FF'},
{'id':2,
     'name':'Shinevar_2018',
     'abb name':'shinevar2018',
     'path name':'shinevar2018',
     'model filename':'Shinevar_2018_Temperature.nc',
     'map':'ucvm_utah',
     'description':'Shinevar_2018_Temperature',
     'description_brief':'blah blah ...',
     'coordinates': [ {'lon':-112.699997,'lat':39.75},
                      {'lon':-112.699997,'lat':42},
                      {'lon':-111.5,'lat':42},
                      {'lon':-111.5,'lat':39.75} ],
     'color':'#CBC0FF'},
    ],
"fileformats": [
    {'id':1,
     'format name':'csv',
     'suffix':'csv',
     'description':'thermal model data in csv'},
    ],
"Products": [
    {'id': 1,
     'product name': '0D Point',
     'description':'Material Properties are returned for the selected location'},
    {'id': 2,
     'product name': '1D Vertical Profile',
     'description':'3 Vertical profile(Vp, Vs, Rho) plots are produced for the selected location. The plot starts at Z start, ends at Z ends, and in Z step interval'},
    {'id': 3,
     'product name': '2D Vertical Cross Section',
     'description':'A Cross section of a selected property is produced between two selected points. The plot starts at Z start, ends at Z ends, and the interval is determined by the web service'},
    {'id': 3,
     'product name': '2D Horizontal Slice',
     'description':'A Horizontal slice of a selected property is produced in a area marked by the rectangle drawn with the depth or elevation supplied as Z, and the interval is determined by the web service.'}
 ],
"descript": [
    {'id':'lon','label':'lon','show':1,'descript':'Longitude'},
    {'id':'lat','label':'lat','show':1,'descript':'Latitude'},
    {'id':'Z','label':'Z','show':1,'descript':'depth - meters below ground surface. Positive numbers below ground surface'}
 ],
"references": [
{ 'type':'model','name': ['lee2025'],
     'author': 'Bowden et al., (2016)',
     'ref': 'Bowden, D. C., Kohler, M. D., Tsai, V. C., & Weeraratne, D. S. (2016). Offshore southern California lithospheric velocity structure from noise cross-correlation functions. Journal of Geophysical Research, 121(5), 3415-3427. doi:10.1002/2016JB012919'
},
{ 'type':'model','name':['shinevar2018'],
     'author':'Doody et al., (2023)',
     'ref':'Doody, C., Rodgers, A., Afanasiev, M., Boehm, C., Krischer, L., Chiang, A., & Simmons, N. (2023). CANVAS: An adjoint waveform tomography model of California and Nevada. Journal of Geophysical Research: Solid Earth, 128(12). https://doi.org/10.1029/2023JB027583'
}]

};

