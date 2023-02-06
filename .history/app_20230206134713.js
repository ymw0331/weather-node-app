const geocode = require( "./utils/geocode" )
const forecast = require( './utils/forecast' )

geocode( "Kuala Lumpur", ( error, data ) => {

  if ( error ) {
    return console.log( "Error", error )
  }


  forecast( data.latitude, data.longitude, ( error, f ) => {
    if ( error ) {
      return console.log( 'Error', error )

    }
    console.log( 'Data', data )
  } )
} )