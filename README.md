# CMSC-447-Game-Project

Refer to:  
  https://flaviocopes.com/phaser-setup/
  https://flaviocopes.com/phaser-multiple-scenes/ 

  You mostly need the first one, since I put in the multiple scenes.
  I had to install node/npm to install the other code.

  In order to run multiple scenes, you need (or want) multiple files, 
    BUT this requires importing them, 
    AND importing requires building the code,
    AND this requires running in a web server,
    OR you get cross domain errors when it tries to load the images.

    So you need 2 things running in separate cmd windows:
    1) parcel watch    # this builds the code and creates a /dist directory
                         It's really smart and will auto build code on changes
    2) Browsersync     # this runs a fake webserver and auto updates the server
                         when the /dist changes.  

    When it works it's magic, else you need to refresh your browser web page to get it to update.
