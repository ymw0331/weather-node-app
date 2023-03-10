const path = require( 'path' )
const express = require( 'express' )
const hbs = require( 'hbs' )
const forecast = require( './utils/forecast' )
const geocode = require( './utils/geocode' )

console.log( __dirname )
console.log( path.join( __dirname, "../public" ) )

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirctoryPath = path.join( __dirname, "../public" )
const viewsPath = path.join( __dirname, '../templates/views' )
const partialsPath = path.join( __dirname, '../templates/partials' )

// Setup handlebars engine and views location
app.set( 'view engine', 'hbs' )
app.set( "views", viewsPath )
hbs.registerPartials( partialsPath )

//Setup static directory to serve, middleware, way to customise server
app.use( express.static( publicDirctoryPath ) )


app.get( '/', ( req, res ) => {
  res.render( 'index', {
    title: 'Weather',
    name: "Wayne Yong",
  } )
} )

app.get( '/about', ( req, res ) => {
  res.render( "about", {
    title: 'About Me',
    name: "Wayne Yong",
  } )
} )

app.get( '/help', ( req, res ) => {
  res.render( "help", {
    helpText: "Example message",
    title: "Help Me Page",
    name: "Wayne Yong",
  } )
} )

app.get( '/weather', ( req, res ) => {

  if ( !req.query.address ) {
    return res.send( {
      error: "You must provide an address!"
    } )
  }

  geocode( req.query.address, ( error, {
    latitude,
    longitude,
    location
  } = {} ) => {

    // if ( error ) {
    //   const status = error.status || 500;
    //   return res.status( status ).send( "Error ==>", error )
    // }

    forecast( latitude, longitude, ( error, forecastData ) => {
      // if ( error ) {
      //   return res.status( 400 ).send( 'Error', error )
      // }
      res.status( 200 ).send( {
        forecast: forecastData,
        location,
        address: req.query.address
      } )
    } )
  } )
} )

app.get( "/products", ( req, res ) => {

  if ( !req.query.search ) {
    return res.send( {
      error: "You must provide a search term"
    } )
  }

  console.log( req.query.search )
  res.send( {
    products: []
  } )
} )

app.get( '/help/*', ( req, res ) => {
  res.render( "404", {
    title: '404',
    errorMessage: "Help Article Not Found"
  } )
} )

// match anything not defined so far
app.get( '*', ( req, res ) => {
  res.render( "404", {
    title: '404',
    name: "Wayne Yong",
    errorMessage: "404 Page Not Found"
  } )
} )

app.listen( port, () => {
  console.log( "Server is up on port '${port}'." )
} )