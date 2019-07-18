
# Riverscout - A distributed envrionmental monitoring system

This README provides info on what Riverscout is, it’s architecture and how to set it up. For more info, refer to the PDF (Project-Report.pdf) which is an edited version of the final year report submitted along with the source code. The report goes into more about the 'how' and 'why' behind the project as well as an explanation of why this set of tools & technologies were used.


- [Riverscout - A distributed envrionmental monitoring system](#Riverscout---A-distributed-envrionmental-monitoring-system)
    - [What Is Riverscout?](#What-Is-Riverscout)
    - [System Architecture](#System-Architecture)
      - [Gauge:](#Gauge)
      - [Backend Server:](#Backend-Server)
    - [Configuring the Riverscout Environment](#Configuring-the-Riverscout-Environment)
    - [Setting up & Connecting a Gauge](#Setting-up--Connecting-a-Gauge)
    - [API Docs](#API-Docs)
      - [Device Info](#Device-Info)
        - [POST: /addOrUpdateDevice](#POST-addOrUpdateDevice)
        - [DELETE: /deleteDeviceInfo](#DELETE-deleteDeviceInfo)
        - [GET: /getInfoForDeviceID](#GET-getInfoForDeviceID)
      - [Device Group](#Device-Group)
        - [GET: /getAllDeviceGroups](#GET-getAllDeviceGroups)
        - [GET: /findDeviceGroup](#GET-findDeviceGroup)
        - [GET: /getDevicesInGroup](#GET-getDevicesInGroup)
        - [GET: /getDevicesInCountry](#GET-getDevicesInCountry)
        - [POST: /addOrUpdateDeviceGroup](#POST-addOrUpdateDeviceGroup)
        - [DELETE: /deleteDeviceGroup](#DELETE-deleteDeviceGroup)
      - [Device Types](#Device-Types)
        - [GET: /getAllDeviceTypes](#GET-getAllDeviceTypes)
        - [DELETE: /deleteDeviceType](#DELETE-deleteDeviceType)
        - [POST: /addOrUpdateDeviceType](#POST-addOrUpdateDeviceType)
      - [Sigfox Device Readings](#Sigfox-Device-Readings)
        - [POST: /addSigfoxDeviceReading](#POST-addSigfoxDeviceReading)
        - [DELETE: /deleteOneSigfoxDeviceReading](#DELETE-deleteOneSigfoxDeviceReading)
        - [DELETE: /deleteAllSigfoxDeviceReadings](#DELETE-deleteAllSigfoxDeviceReadings)
        - [GET: /getReadingsForDeviceID](#GET-getReadingsForDeviceID)
      - [Country Codes & Info](#Country-Codes--Info)
        - [POST: /addOrUpdateCountry](#POST-addOrUpdateCountry)
        - [GET: /getAllCountries](#GET-getAllCountries)
        - [DELETE: /deleteCountry](#DELETE-deleteCountry)
    - [Data Compression Scheme](#Data-Compression-Scheme)
      - [Code - device side](#Code---device-side)
      - [Code - server side](#Code---server-side)

### What Is Riverscout?

Riverscout was my final year college project submitted as part of my degree. 
It aims to provide near real-time analytics on environmental phenomena such as water levels, water temperature and air quality to provide data for commercial and recreational users.

The idea was that low-power and cost effective 'gauges' could be deployed to an area to monitor certain environmental phenomena like air temperature, river levels and soil quality (to name a few).

The data is available through an API. The[spec](#API-Docs)  is listed below. The API allows a user to query based on a country, a group within that country and finally a device within a selected group. The timeframe can be specified to only return the amount of data required.

Overall the project was a proof of concept and not launched in a commercial sense. This code + documentation is provided for reference only.



### System Architecture

The project focused on two main areas, the device 'gauge' and a backend server platform for collecting and aggregating data. A front end application based on [CoreUI Vue](https://github.com/coreui/coreui-free-vue-admin-template) was planned but abandoned due to time constraints.

#### Gauge: 

Riverscout uses a [Pycom SiPy](https://pycom.io/product/sipy/) with a [US-100 ultrasonic sensor](https://www.adafruit.com/product/4019) and a DS18B20 temperature sensor. The SiPy is a internet enabled microcontroller that connects to the Sigfox network and can be programmed using a specialized variant of Python called MicroPython.

- For the device code, please visit [the device repo]():
  



#### Backend Server:

Riverscout is written in Javascript, uses [oas-tools](https://github.com/isa-group/oas-tools) for middleware/API docs and stores it's data in MongoDB via [Mongoose](https://mongoosejs.com/). The server is powered by NodeJS and is tailored towards a Linux/Unix like environment.

**NOTE** Riverscout was not tested in a Windows environment. While Node and MongoDB are OS independent, I cannot guarantee that the app will function correctly.


### Configuring the Riverscout Environment
**Required Software**

The Riverscout environment was developed and tested on Ubuntu 18.04 LTS. It also needs the following installed to function:
- Node JS (select the .deb version of the latest LTS release). Setup instructions available here: https://github.com/nodesource/distributions#deb 

- MongoDB (use version 4 or above for Ubuntu Bionic 18.04). Instructions available on MongoDB website https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

**Database configuration**

By default MongoDB comes with access control disabled and outside traffic blocked. When we open it up to external traffic, access control *must* be enabled otherwise the database will be wide open for anyone to access! See https://www.theregister.co.uk/2017/01/09/mongodb/ for an idea.

The following instructions were based on Ian London’s article “How to connect to your remote MongoDB server”, https://ianlondon.github.io/blog/mongodb-auth/


To setup a new user and configure access control:
1. Start the mongo service if it is not already running ( `sudo service mongod start`)
2. Check the status of the mongod.service ( `systemctl status mongod.service` )
If the service is running, log into Mongo by typing `mongo` at the shell. This brings you into the MongoDB Shell.
3. Switch to the ‘riverscout’ database by typing `use riverscout`. If this does not exist, Mongo will create it for you. 
4. Create a new user by typing:
```
 db.createUser({
    user: 'riverscout',
    pwd: 'riverscout',
    roles: [{ role: 'readWrite', db:'riverscout'}]
})
```
The above will create a user called ‘riverscout’ with the password ‘riverscout’
If you have specified a different username and/or password, please modify the ```mongoose.connect``` line in ```app.js``` to reflect these changes.

5. Now the new user has been added, type ```db.auth("riverscout","riverscout")```
This should return 1 which means your new user can successfully authenticate on the ‘riverscout’ db
6. Exit the Mongo shell by pressing Ctrl+D
7. Edit the file `/etc/mongod.conf` with your editor of choice

By default the server is only bound to ```localhost``` so to open it to the outside world,uncomment the net portion of the config file.
```
Bind the server to all interfaces:
# network interfaces
net:
  port: 27017 (default port)
  bindIp: 0.0.0.0  NOTE this needs to be explicitly declared as such in Mongo DB versions 4 + 
```

If the port is changed from the default, please modify the ```mongoose.connect``` line in ```app.js``` to include the custom port. See [Mongoose API Docs on connection options](https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-connect)

1. Enable access control by modifying the 'security' part as follows
```
security: (uncomment this)
  authorization: 'enabled' (add this)
``` 

Save this file and exit. Restart MongoDB by typing `sudo service mongod restart`
Check the status. If MongoDB fails to start, it is probably an indentation issue with the config file. Refer to the log file and the output from systemctl.



**Vagrant based development environment**

*Not necessary for cloud deployment or development. Use only if desired.*

Riverscout can use Vagrant to provision and manage virtual machines for it's dev environment. To set up the development environment with Vagrant, perform the following steps
1. Install Vagrant (+ whatever dependencies it needs)
2. Install Virtualbox and its corresponding expansion pack
VMWare has not been tested and would require some modification to the Vagrantfile
3. Clone the dev-environment repo and cd into it
4. If necessary, change the amount of RAM the VM receives by editing the `vb.memory` line in the Vagrantfile to a value that fits your system. Min recommended value is 1024MB
5. Start the Riverscout VM by typing `vagrant up`.
This will download and set up the new VM. When this is done, login with `vagrant ssh`.



### Setting up & Connecting a Gauge
To set up a Pycom SiPy to talk to Riverscout:

1. Follow the steps to set up the backend server on a cloud provider such as AWS or Google Cloud. Make sure to properly secure your instance with appropiate security groups!
2. Register your SiPy on the [Sigfox Backend](https://backend.sigfox.com) .
   Steps to do this can be found on Pycom's [website](https://docs.pycom.io/gettingstarted/registration/sigfox/)
3. Once the device is registered, follow the guide on [programming a gauge](). This is necessary for programming the SiPy and connecting the sensors.
4. Go to the Sigfox Backend and select 'Device Type' in the top menu.
5. Click the link in the 'Name' column in the table of available devices. This will take you to a page showing device info.
6. Click the 'Callbacks' link in the left-hand sidebar.
7. To create a new callback, click the 'New' button (top right) and select 'Custom Callback'. Fill out the fields as follows: 

* Type = ```DATA```
* Direction = ```UPLINK```
* Leave the 'Custom Payload Config' box blank.
* URL Pattern = ```http://<IPADDRESS>:8080/api/addSigfoxDeviceReading``` , where ```IPADDRESS``` is the IP address of your cloud instance.  
* Use HTTP Method: ```POST```
* Content type: ```application/json```
* Body: ```{"rawHexString" : "{data}","sigfoxID" : "{device}","timestamp" : "{time}"}``` 

Here is what the edit callback screen should look like.
[![editcallback.png](https://i.postimg.cc/1zMBnpYh/editcallback.png)](https://postimg.cc/KKkBCg2J)
 
Click OK to save the callback.  
### API Docs
The Riverscout API, as explained in the introduction, is structured as follows:
1. The user selects a country using a 'country code'. The list of codes can be found by calling the ```/getAllCountries``` route.
2. Once a country has been selected, you can query for a list of device 'groups' within that country by calling ```/getAllDeviceGroups```  with the countries' code. 
3. To get data for one device, you need to then query for all the devices within the selected group with ```/getDevicesInGroup```.
4. Using the 'deviceID' of the gauge in question, you can call ```/getReadingsForDeviceID```  which will return data for the device within the specified timeframe. 

My reasoning for this was scale. For a small number of devices, it is okay to simply return a list of all device ID's in the system with every request. But when the number of devices increases, the amount of data being transferred from server to client increases. To minimise the amount of wasted data (and processing on the server end), the API is designed to allow granular selection of devices.

Also the grouping allows large dots to be shown on a country map when it is zoomed out. As the user zooms in, the groups closest to the centre of the map window disappear and are replaced with dots indicating the devices.


When a large area is selected, the user only sees the groups (black markers)

[![groups.png](https://i.postimg.cc/524FHZcy/groups.png)](https://postimg.cc/4m03q2xR)

When the map is zoomed in on a specific area containing groups, the map now shows the devices in those groups (red markers)


[![zoomed.png](https://i.postimg.cc/J0QzMzzq/zoomed.png)](https://postimg.cc/ZvCSLZ3B)

*Map image from [OpenStreetMap](https://www.openstreetmap.org)*

API Routes

The following is a brief description of each API route, broken into the various categories.

#### Device Info

These routes handle CRUD operations for a gauge/device. Device info is defined as it's install location or date, country code, hardware IDs whether it's active or not and so on.
For getting readings from a device, use the ```/getReadingsForDeviceID```  route.

##### POST: /addOrUpdateDevice

Adds a new device (Sigfox/NBIoT) or if the device already exists, updates it's details

| Value | Type | Description |
| --- | --- | --- |
| displayName | ```string``` | Name to display in front end |
| gpsLong | ```number``` | GPS longitude of the gauge install location  |
| gpsLat | ```number``` | GPS latitude of the gauge install location |
| countryCode | ```string``` | Uses the same codes as web domains. Eg:  ``` IE ```= Ireland  |
| sigfoxID | ```string``` | Sigfox ID as generated by the Sigfox backend |
| installDate | ```string``` | Install date of device in UTC. Please use ISO 8601 format. Eg: ```2018-09-09T14:00:00Z``` |
| replacementDate | ```string``` | UTC formatted date of the expected date the device is to be replaced. Use ISO 8601 format. |
| EOLDate | ```string``` | UTC format date of the time a device was actuallly replaced |
| reportingFreq | ```string``` | How often (in minutes) the device is expected to send up data |
| groupIDS | ```Array [string]``` | An array of the group IDs this device is in |
| activeStatus | ```boolean``` | Device active status |
| downlinkEnabled | ```boolean``` | Whether the device allows data to be sent to it or not. |

##### DELETE: /deleteDeviceInfo

Deletes the selected device

| Value | Type | Description |
| --- | --- | --- |
| deviceID | ```String``` | Database ID of device to delete data for. |

##### GET: /getInfoForDeviceID

Returns data for the specified device like it's location and group

| Value | Type | Description |
| --- | --- | --- |
| deviceID | ```String``` | Database ID of device to return data for. |

#### Device Group

CRUD operations on device groups.

##### GET: /getAllDeviceGroups

Returns all the device groups for the specified country code

| Value | Type | Description |
| --- | --- | --- |
| countryCode | ```String``` | Return all groups matching this country. |

##### GET: /findDeviceGroup

Returns a device group matching the specified name

| Value | Type | Description |
| --- | --- | --- |
| groupName | ```String``` | The name of the group to return |

##### GET: /getDevicesInGroup

Returns the IDs of the devices in a group

| Value | Type | Description |
| --- | --- | --- |
| groupID |```String``` | Return devices in a group with this ID. |

##### GET: /getDevicesInCountry

**Note**: this route is not required and was added to facilitate testing. Use the above method when querying the API

Returns the IDs of all devices matching a specified country code

| Value | Type | Description |
| --- | --- | --- |
| countryCode | ```String``` | Return devices with this countryCode. |

##### POST: /addOrUpdateDeviceGroup

Adds a group for devices

| Value | Type | Description |
| --- | --- | --- |
| groupLat | ```Number``` | GPS Latitude of the new group. |
| groupLong | ```Number``` | GPS Longitude of the new group |
| groupName | ```String``` | Name of new group. MUST be unique otherwise will trigger an update instead of an add. |
| countryCode | ```String``` | Two character code representing countries |

##### DELETE: /deleteDeviceGroup

Deletes the selected device group

| Value | Type | Description |
| --- | --- | --- |
| deviceGroupID | ```String``` | Database ID of the group to remove |

#### Device Types

CRUD operations on device 'types'. This was not implemented fully in the above code due to ```enum``` type issues with Mongoose. A device has a type which described it's primary role. A river level sensor would have type ```'river'``` for example.

##### GET: /getAllDeviceTypes

Has no parameters, returns all the possible types of devices

##### DELETE: /deleteDeviceType

Deletes the selected device type

| Value | Type | Description |
| --- | --- | --- |
| deviceTypeID | ```String``` | Database ID of the type to remove |

##### POST: /addOrUpdateDeviceType

Adds a new / updates an exising device type

| Value | Type | Description |
| --- | --- | --- |
| deviceTypeName | ```String```. Min:1, Max: 30 | The name to use for a new device type  |
| deviceType | ```String``` (Default: ```river```) | The type of this new device |
| deviceTypeDescription | String. Min:1, Max: 250 | Describe the device characteristics here |



#### Sigfox Device Readings

CRUD operations of sensor readings from Sigfox networked devices.
##### POST: /addSigfoxDeviceReading

Adds a reading for a Sigfox device. This is the route used by the Sigfox backend to add data.

| Value | Type | Description |
| --- | --- | --- |
| sigfoxID | ```String``` | The Sigfox ID for a device |
| rawHexString | ```String``` | The raw hex data coming from the Sigfox backend |
| timestamp | ```String``` | UNIX timestamp coming from the Sigfox backend |

##### DELETE: /deleteOneSigfoxDeviceReading

Deletes a single device reading.

| Value | Type | Description |
| --- | --- | --- |
| readingID | ```String``` | Database ID of the reading to remove |

##### DELETE: /deleteAllSigfoxDeviceReadings

Deletes all readings for a Sigfox device matching the specified ID

**CAUTION** This action is irreversable!

| Value | Type | Description |
| --- | --- | --- |
| deviceID | ```String ```| Database ID of the device to remove readings for |

##### GET: /getReadingsForDeviceID

Returns readings for the specified device between the timestamps specified

| Value | Type | Description |
| --- | --- | --- |
| deviceID | ```String``` | The ID of the device to get data for |
| timestampGt | ```String``` | Fetch results greater than this timestamp. Timestamp is to be specified in ISO 8601 format in UTC timezone |
| timestampLt | ```String``` | Fetch results less than this timestamp. Timestamp is to be specified in ISO 8601 format in UTC timezone|

#### Country Codes & Info
CRUD operations for country objects which contain a code and name.
##### POST: /addOrUpdateCountry

Adds a new country with a name and a country code. If the specified country exists, it will be updated instead.

| Value | Type | Description |
| --- | --- | --- |
| countryName | ```String``` | Country Name (MUST be unique or will trigger update) |
| countryCode | ```String``` | Code for the new country |

##### GET: /getAllCountries

Returns all countries.

##### DELETE: /deleteCountry

Deletes the selected country

| Value | Type | Description |
| --- | --- | --- |
| countryID | ```String``` | Database ID of the country to remove |

### Data Compression Scheme
Due to the constrained nature of LPWAN technologies, there has to be a method of compressing data generated on the device before tramsmitting it to the backend. Riverscout uses a scheme derived from [this example](https://dzone.com/articles/build-an-end-to-end-sigfox-gps-tracker-using-wia-a) provided by Austin Spivey/Wia.io 

Both parts are as follows:
#### Code - device side
The Micropython code for compressing the data is below:

```struct.pack('f',float(waterTemp)) + bytes([waterLevel])```

This converts the float value (with 2 decimal places) into a 32 bit IEEE 754 value (which is the binary representation). The float is now represented with 4 hexadecimal characters (8 bits) which is combined with the temperature value and sent to Sigfox.

Specifying ‘f’ as the first argument in struct.pack tells Python to store the value as a 
C float  The values are stored as little endian (least significant bit first) as the ESP32 is a little-endian architecture (as reported by ```sys.byteorder```)


#### Code - server side
The hex string is passed from Sigfox into the ```‘parseSigfoxData’``` decompression function. It takes the raw string, slices the first 8 bits into one variable called ‘waterTemp’ and slices the rest of the buffer into another variable called ‘waterLevel’
To parse the waterTemp variable, use the ```readFloatLE()```  NodeJS function specifying 0 as the offset. We need to specify little endian as the encoding because the values were originally encoded that way.

To parse the ‘waterLevel’ value, we can use the ```readUInt8()```  function.

The full code is available to view in ```controllers/sigfoxReadingController.js```.

 
