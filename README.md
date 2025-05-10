# MMM-SweepClock

A [MagicMirror²](https://magicmirror.builders) module to display a clasic Railway Clock based on the code written by  [manuelmeister](https://github.com/manuelmeister/Swiss-Railway-Clock).

[![Platform](https://img.shields.io/badge/platform-MagicMirror-informational)](https://MagicMirror.builders)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

<a href="https://www.buymeacoffee.com/mumblebaj" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 45px !important;width: 180px !important;" ></a>

## Support
If you like my module you can support my work by giving me a star ir buy me a coffee.

## Updates

### v1.1.4
- Add support for multiple instances as per [issue request #7](https://github.com/mumblebaj/MMM-SweepClock/issues/7)

### v1.1.3
- Update issue [Github Issue 6](https://github.com/mumblebaj/MMM-SweepClock/issues/6)

### v1.1.2
- Added support for timezones. User can now specify a timezone as input. I.e. `America/New_York` or `Europe/Zurich`. If local date and time is required then leave the `timezone` option out of the config.
### V1.1.0
- Added option to remove date.
- Added option provide Date Format
- If Date is not required to keep the look and feel minimal just set showDate option to false.

<a href="https://www.buymeacoffee.com/mumblebaj" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Beer" style="height: 45px !important;width: 180px !important;" ></a>

![Example](images/image-1.png) 
![Example](images/image-2.png)
![Example](images/image-3.png)

## Installation

In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/mumblebaj/MMM-SweepClock.git
````

Add the module to the modules array in the `config/config.js` file:
## Sample without timezone
````javascript
  {
	module: "MMM-SweepClock",
	position: "top_left",
    config: {
              showDate: false,
              dateFormat: "dddd, LLL"
            }
  },
````
## Sample with timezone
````javascript
  {
	module: "MMM-SweepClock",
	position: "top_left",
    config: {
              showDate: true, // set to true or false to show date
              dateFormat: "dddd, LLL",
              timezone: "America/New_York"
            }
  },
````

## Updating

To update the module to the latest version, use your terminal to go to your MMM-SweepClock module folder and type the following command:

````
cd ~/MagicMirror/modules/MMM-SweepClock/
git pull
```` 
