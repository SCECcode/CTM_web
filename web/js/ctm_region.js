/****

  ctm_region.js

****/

var CTM_tb={
"models": [
{'id':1,
     'name':'Lee 2025',
     'abb name':'Lee_2025',
     'path name':'lee2025',
     'model filename':'ThermalModel_WUS_v2.nc',
     'description':'CTM of Lee et al. (2025) is a statewide California-Nevada 3D thermal model. This model is built by a Monte-Carlo sampling technique to generate unique thermal parameters (e.g., thermal conductivity, radiogenic heat production) and crustal heat flow scenarios that fit the input independent temperature proxies, including surface heat flow (Mordensky et al., 2023), new seismogenic thickness inferred from >40 years of earthquake records, crustal thickness (Buehler and Shearer, 2017) and Moho temperature (Schutt et al., 2018). This model integrates best-fit 1D vertical steady-state conductive geotherm at each pixel across the model, yielding a 3D volume of crustal temperature estimates. 3D temperature volume is statistically diffused in the lateral direction for 5 myr with a thermal diffusivity of 10^-6m^2s^-1',
     'description_brief':'CTM of Lee et al. (2025) is a statewide California-Nevada 3D thermal model. This model is built by a Monte-Carlo sampling technique to generate unique thermal parameters (e.g., thermal conductivity, radiogenic heat production) and crustal heat flow scenarios that fit the input independent temperature proxies, including surface heat flow (Mordensky et al., 2023), ...',
     'coordinates': [ {'lon':-125.0,'lat':41.97},
                      {'lon':-114.0,'lat':41.97},
                      {'lon':-114.0,'lat':32.06},
                      {'lon':-125.0,'lat':32.06} ],
     'color':'#0000FF'},
{'id':2,
     'name':'Shinevar 2018',
     'abb name':'Shinevar_2018',
     'path name':'shinevar2018',
     'model filename':'Shinevar_2018_Temperature.nc',
     'description':'CTM of Shinevar et al. (2018) is a southern California 3D thermal model. This model assumes steady-state, 1D vertical heat conduction throughout the region, and relies on heat flow measurements from Williams and DeAngelo (2011) and the SMU Geothermal Database. Temperature as a function of depth is calculated at each grid point assuming a steady-state 1-D geotherm following the assumption that the heat production in the upper crust accounts for 40% of the measured surface heat flow (Pollack and Chapman, 1977). Thermal conductivity is taken to be a function of temperature (Durham et al., 1987, and EQ 8 in Shinevar et al., 2018). To smooth horizontal temperature gradients, the temperature field is allowed to diffuse laterally for 5 myr, assuming constant boundary temperatures and a thermal diffusivity of 10^-6m^2s^-1',
     'description_brief':'CTM of Shinevar et al. (2018) is a southern California 3D thermal model. This model assumes steady-state, 1D vertical heat conduction throughout the region, and relies on heat flow measurements from Williams and DeAngelo (2011) and the SMU Geothermal Database. Temperature as a function of depth is calculated at each grid point assuming a steady-state 1-D geotherm following the assumption that ...',
     'coordinates': [ {'lon':-121.0,'lat':37.0},
                      {'lon':-112.0,'lat':37.0},
                      {'lon':-112.0,'lat':31.0},
                      {'lon':-121.0,'lat':31.0} ],
     'color':'#FF0000'},
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
     'description':'3 Vertical profile plots are produced for the selected location. The plot starts at Z start, ends at Z ends, and in Z step interval'},
    {'id': 3,
     'product name': '2D Vertical Cross Section',
     'description':'A Cross section of a selected property is produced between two selected points. The plot starts at Z start, ends at Z ends, and the interval is determined by the web service'},
    {'id': 3,
     'product name': '2D Horizontal Slice',
     'description':'A Horizontal slice of a selected property is produced in a area marked by the rectangle drawn with the depth or elevation supplied as Z, and the interval is determined by the web service.'}
 ],
"descript": [
    {'id':'longitude','label':'lon','show':1,'descript':'Longitude'},
    {'id':'latitude','label':'lat','show':1,'descript':'Latitude'},
    {'id':'depth','label':'Z','show':1,'descript':'Depth'},
    {'id':'temperature','label':'temperature','show':1,'descript':'Temperature'},
    {'id':'model','label':'model','show':1,'descript':'Model'}
 ],
"references": [
{ 'type':'model','name': ['Lee_2025'],
     'author': 'Lee et al., (2025)',
     'ref': 'Lee, T., Zuza, A. V., Trugman, D. T., Vlaha, D. R., & Cao, W. (2025, 09). Statewide Community Thermal Model of California and Nevada: Model comparisons, implications, and a new explorer platform. Poster Presentation at 2025 SCEC Annual Meeting. SCEC Contribution 14291'
},
{ 'type':'model','name':['Shinevar_2018'],
     'author':'Shinevar et al. (2018)',
     'ref':'Shinevar, W. J., Behn, M. D., Hirth, G., & Jagoutz, O. (2018). Inferring crustal viscosity from seismic velocity: Application to the lower crust of Southern California. Earth and Planetary Science Letters, 494, 83-91'
}]

};

