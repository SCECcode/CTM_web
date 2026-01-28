/****

  ctm_region.js

****/

var CTM_tb={
"models": [
{'id':1,
     'name':'Lee 2026',
     'abb name':'Lee_2026',
     'path name':'lee2026',
     'model filename':'ThermalModel_WUS_v2.nc',
     'description':'CTM of Lee et al. (2026) is a statewide California-Nevada 3D thermal model. This model is developed by a Monte-Carlo inversion approach to generate unique thermal parameters (e.g., thermal conductivity, radiogenic heat production) and crustal heat flow scenarios that best-fit the input independent temperature proxies, including surface heat flow (Williams et al., 2007; Mordensky and DeAngelo, 2023), new seismogenic thickness (D95) inferred from >40 years of earthquake records, crustal thickness (Buehler and Shearer, 2017) and Moho temperature (Schutt et al., 2018). This model assumes that the depth to the D95 is equivalent to an isothermal surface of 350 ± 100 °C, 1D vertical steady-state heat conduction from the base of the crust to the surface, exponential decrease of radiogenic heat production through depth, and temperature-independent thermal conductivity. This model integrates best-fit 1D vertical steady-state conductive geotherms at each crustal column across the modeling area, yielding a statewide 3D temperature volume for California and Nevada. White areas are regions that do not yield any accepted, best-fit modeling results, suggesting that steady-state conductive heat condition cannot fit the observed temperature proxies at crustal depths. The resultant 3D temperature volume is statistically diffused in lateral directions for 5 myr with a thermal diffusivity of 10^-6m^2s^-1',
     'description_brief':'CTM of Lee et al. (2026) is a statewide California-Nevada 3D thermal model. This model is developed by a Monte-Carlo inversion approach to generate unique thermal parameters (e.g., thermal conductivity, radiogenic heat production) and crustal heat flow scenarios that best-fit the input independent temperature proxies, including surface heat flow (Williams et al., 2007; Mordensky and DeAngelo, 2023), new seismogenic thickness (D95) inferred from >40 years of earthquake records, ...',
     'coordinates': [ {'lon':-125.0,'lat':41.97},
                      {'lon':-114.0,'lat':41.97},
                      {'lon':-114.0,'lat':32.06},
                      {'lon':-125.0,'lat':32.06} ],
     'color':'#0000FF',
     'skip': 'no'},
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
     'color':'#FF0000',
     'skip': 'no'},
{'id':3,
     'name':'Suietal 2025',
     'abb name':'Suietal_2025',
     'path name':'suietal2025',
     'model filename':'Suietal_GJI_2025_vol.nc',
     'description':'The crustal thermal model of Sui et al. (2025) provides temperature estimates for the conterminous United States. First, this model calculates the crustal heat production profiles at 1,683 locations using the empirical geochemical-seismic relationship and approach of Sui et al. (2022). Integrating the resultant crustal heat production profiles with surface temperature (Wan et al., 2015), surface heat conductivity (SMU, 2015; Fuchs & Norden, 2021), surface heat flow (SMU, 2015; Fuchs & Norden, 2021), Moho temperature (Schutt et al., 2018; Boyd, 2019), and Curie depth (Gard and Hasterok, 2021) into a Markov Chain Monte-Carlo inversion model yield a series of 1,683 1D vertical geotherms throughout the conterminous United States. The resultant 3D thermal model is interpolated from the 1,683 1D vertical geotherms throughout the conterminous United States at a resolution of 0.25°',
     'description_brief':'The crustal thermal model of Sui et al. (2025) provides temperature estimates for the conterminous United States. First, this model calculates the crustal heat production profiles at 1,683 locations using the empirical geochemical-seismic relationship and approach of Sui et al. (2022). Integrating the resultant crustal heat production profiles with surface temperature (Wan et al., 2015), surface heat conductivity (SMU, 2015; Fuchs & Norden, 2021), surface heat flow (SMU, 2015; Fuchs & Norden, 2021), ...',
     'coordinates': [ {'lon':-126.0,'lat':24.0},
                      {'lon':-65.0,'lat':24.0},
                      {'lon':-65.0,'lat':50.0},
                      {'lon':-126.0,'lat':50.0} ],
     'color':'#008080',
     'skip': 'no'},
{'id':4,
     'name':'Boyd 2019',
     'abb name':'Boyd_2019',
     'path name':'boyd2019',
     'model filename':'NCM_TemperatureVolume_250929_ll.nc',
     'description':'The national 3D thermal model of Boyd (2019) is part of the USGS National Crustal Model. It integrates observational data of surface temperature (Wan et al., 2015), surface temperature gradient (SMU, 2015; UND, 2015), thermal conductivity (SMU, 2015; UND, 2015), surface heat production (SMU, 2015; UND, 2015; Hasterok and Webb, 2017), crustal thickness of Buehler and Shearer (2017), and Moho temperature inverted from Pn wave speed with the approach of Schutt et al. (2018) and Pn velocity model of Buehler and Shearer (2017). These compiled parameters are together input into an analytical 1D steady-state heat conduction models to derive the 3D thermal structure of the conterminous United States. This model assumes exponential decrease of heat production through depth and depth-dependent thermal conductivity',
     'description_brief':'The national 3D thermal model of Boyd (2019) is part of the USGS National Crustal Model. It integrates observational data of surface temperature (Wan et al., 2015), surface temperature gradient (SMU, 2015; UND, 2015), thermal conductivity (SMU, 2015; UND, 2015), surface heat production (SMU, 2015; UND, 2015; Hasterok and Webb, 2017), crustal thickness of Buehler and Shearer (2017), and Moho temperature inverted from Pn wave speed with the approach of Schutt et al. (2018) and ...',
     'coordinates': [ {'lon':-126.0,'lat':24.0},
                      {'lon':-65.0,'lat':24.0},
                      {'lon':-65.0,'lat':50.0},
                      {'lon':-126.0,'lat':50.0} ],
     'color':'#FF00FF',
     'skip': 'no'},
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
    {'id':'lon','label':'Longitude','show':1,'descript':'Longitude'},
    {'id':'lat','label':'Latitude','show':1,'descript':'Latitude'},
    {'id':'Z','label':'Depth (m)','show':1,'descript':'Depth'},
    {'id':'temp','label':'Temperature (C)','show':1,'descript':'Temperature'},
    {'id':'model','label':'Model','show':1,'descript':'Model'}
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

