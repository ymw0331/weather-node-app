const path = require( 'path' )
const express = require( 'express' )
const hbs = require( 'hbs' )

console.log( __dirname )
console.log( path.join( __dirname, "../public" ) )

const app = express()

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
    title: "Help Mep age",
    name: "Wayne Yong",
  } )
} )

app.get( '/weather', ( req, res ) => {
  res.send( {
    forecast: "36 c",
    location: "Subang",
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

app.listen( 3000, () => {
  console.log( "Server is up on port 3000." )
} )