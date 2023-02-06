
const forecast = ( long, lat, callback ) => {
  const url = 'http://api.weatherstack.com/current?access_key=2cc241dd2a7a2cbbbe993b8ad8de7350&query=' + lat + ',' + long;


  request( {
    url: url,
    json: true
  }, ( error, response ) => {

    if ( error ) {
      callback( "Unable to connect to weather services", undefined )
    } else if ( response.body.error ) {
      callback( "Unable to find location", undefined )

    } else {

      callback( undefined, response.body.current.weather_descriptions[ 0 ] + ". It is currently " + response.body.current.temperature + " degrees out. There is " + response.body.current.precip + " of rain." )
    }

  } )
}