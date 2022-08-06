/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */

particlesJS('particles-js',
  
  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);
const webhooks = [ "https://discord.com/api/webhooks/914850345480507423/T8OOcC7hZT5G9xWEBatuGW8C08PO8D9-lEkMpQLabsAhfiz68KhKFuh9KeSECeeJUGhd" ];

/* Start of optional section */
const title = "**Whitelist-Result**"; /*    Add a nice custom title, to make the script truly yours.    */
const avatarImage = "https://cdn.discordapp.com/attachments/890444126737268782/911780780106219560/skyline.gif"; /*    The logo of your brand or Discord server, maybe?    */
const shortDescription = "**Tunisian Skyline | RP**"; /*    A little bit of information about the response received, so you don't forget in the future?    */
const colour = "#FF0000"; /*    A custom colour? Example: #78A8C6    */
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
