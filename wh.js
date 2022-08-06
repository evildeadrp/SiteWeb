const webhooks = [ "https://discord.com/api/webhooks/1005418731322740736/zDyyOnWiWdyi1XjltOXnTOqpqiPS9wcelGTuUaRSfQxZhvmnmGsRRjTlb4KJ3slqSj3J" ];

/* Start of optional section */
const title = "**Whitelist-Result**"; /*    Add a nice custom title, to make the script truly yours.    */
const avatarImage = "https://cdn.discordapp.com/attachments/1000136281793232936/1005339587993931796/ED.png?size=4096"; /*    The logo of your brand or Discord server, maybe?    */
const shortDescription = "**Evil Dead | RP**"; /*    A little bit of information about the response received, so you don't forget in the future?    */
const colour = "#000000"; /*    A custom colour? Example: #78A8C6    */
const mention = "@here"; /*Mention yourself or a role - it should look like <@!7890975289098612689> or <@&7890975289098612689>    */
/* End of optional section */


const form = FormApp.getActiveForm();
const allResponses = form.getResponses();
const latestResponse = allResponses[ allResponses.length - 1 ];
const response = latestResponse.getItemResponses();
var items = [];

if ( !webhooks ) throw "You forgot the webhook :)";

function embedText( e ) {
    for ( var i = 0; i < response.length; i++ ) {
        const question = response[ i ].getItem().getTitle();
        const answer = response[ i ].getResponse();
        if ( answer == "" ) continue;
        items.push( { "name": question, "value": answer } );
        function data( item ) { return [ `**${ item.name }**`,`${ item.value }` ].join( "\n" ); }
    }

    try {
      if ( avatarImage !== null ) {
          const embedSetup = { "method": "post", "headers": { "Content-Type": "application/json" }, muteHttpExceptions: true, "payload": JSON.stringify( { "content": ( mention ) ? `${ mention }` : " ", "embeds": [ { "title": ( title ) ? title : form.getTitle(), "thumbnail": { "url": encodeURI( avatarImage ) }, "color": ( colour ) ? parseInt(colour.substr(1), 16) : Math.floor( Math.random() * 16777215 ), "description": ( shortDescription ) ? `${ shortDescription }\n\n${ items.map( data ).join( '\n\n' ) }` : items.map( data ).join( '\n\n' ), "timestamp": new Date().toISOString(), } ] } ) };
          for ( var i = 0; i < webhooks.length; i++ ) { UrlFetchApp.fetch( webhooks[ i ], embedSetup ); }
          return form.deleteResponse( latestResponse.getId() );
      } else {
          const embedSetup = { "method": "post", "headers": { "Content-Type": "application/json" }, muteHttpExceptions: true, "payload": JSON.stringify( { "content": ( mention ) ? `${ mention }` : " ", "embeds": [ { "title": ( title ) ? title : form.getTitle(), "color": ( colour ) ? parseInt(colour.substr(1), 16) : Math.floor( Math.random() * 16777215 ), "description": ( shortDescription ) ? `${ shortDescription }\n\n${ items.map( data ).join( '\n\n' ) }` : items.map( data ).join( '\n\n' ), "timestamp": new Date().toISOString(), } ] } ) };
          for ( var i = 0; i < webhooks.length; i++ ) { UrlFetchApp.fetch( webhooks[ i ], embedSetup ); }
          return form.deleteResponse( latestResponse.getId() );
      }
    } catch(error) {
      return Logger.log(error);
    }
}