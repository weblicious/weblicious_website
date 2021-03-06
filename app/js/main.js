$(document).ready(function() {
	$(".section").hide();
	$(".weblicious").show();
	function initFullPage(){
    $('#fullpage').fullpage({
        sectionsColor: ['#ffffff', '#f4f5f7', '#f4f5f7C', '#f4f5f7C', '#f4f5f7C', '#f4f5f7C', '#f4f5f7C'],
		anchors:['firstPage', 'secondPage'],
        // continuousVertical: true,
        // loopTop: false,
        // loopBottom: true,
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Home', 'Les chiffres', 'Analysis', 'Your e-commerce partner', 'Our services', 'Contractor to contractor', 'References'],
        // css3: true
    });
	}
	$('.logo').addClass('animation');
	var logo = $('.logo').find('svg').find('path');
	
	TweenMax.staggerFrom(logo, .5, {drawSVG:0}, 0.1,moveLogo);


	
	function moveLogo(){
		
		TweenMax.to($('.logo'), 2, {top:0,onComplete:placeAll});
	} 

  	function placeAll(){
		
		  TweenMax.to($('.overlayer'), .5, {opacity:0});
		    $("#logo").find('svg').find('.st0').css("display","inline");
		$("#logo").find('svg').find('#Layer_2').css("display","none");
		$(".section").show();
		 init();
			animate();
			initFullPage();
	  }
  


//three
  			var mouseX = 0, mouseY = 0,
			windowHalfX = window.innerWidth / 50,
			windowHalfY = window.innerHeight / 50,
			SEPARATION = 200,
			AMOUNTX = 10,
			AMOUNTY = 10,
			camera, scene, renderer;
		    // init();
			// animate();
			function init() {
				var container, separation = 100, amountX = 50, amountY = 50,
				particles, particle, parent;
				container = document.createElement('div');
                container.className='geometry';
                parent =  document.getElementsByClassName('weblicious');               
				parent[0].appendChild(container);                
				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 100;
				scene = new THREE.Scene();
				renderer = new THREE.CanvasRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );
				// particles
				var PI2 = Math.PI * 2;
				var material = new THREE.SpriteCanvasMaterial( {
					color: 0x000000,
					program: function ( context ) {
						context.beginPath();
						context.arc( 0, 0, 0.5, 0, PI2, true );
						context.fill();
					}
				} );
				var geometry = new THREE.Geometry();
				for ( var i = 0; i < 100; i ++ ) {
					particle = new THREE.Sprite( material );
					particle.position.x = Math.random() * 2 - 1;
					particle.position.y = Math.random() * 2 - 1;
					particle.position.z = Math.random() * 2 - 1;
					particle.position.normalize();
					particle.position.multiplyScalar( Math.random() * 10 + 450 );
					particle.scale.x = particle.scale.y = 4;
					scene.add( particle );
					geometry.vertices.push( particle.position );
				}
				// lines
				var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.5 } ) );
				scene.add( line );
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );
				//
				window.addEventListener( 'resize', onWindowResize, false );
			}
			function onWindowResize() {
				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
			//
			function onDocumentMouseMove(event) {
				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;
			}
			function onDocumentTouchStart( event ) {
				if ( event.touches.length > 1 ) {
					event.preventDefault();
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
				}
			}
			function onDocumentTouchMove( event ) {
				if ( event.touches.length == 1 ) {
					event.preventDefault();
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
				}
			}
			//
			function animate() {
				requestAnimationFrame( animate );
				render();
			}
			function render() {
				camera.position.x += ( mouseX - camera.position.x ) * .05;
				camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
				camera.lookAt( scene.position );
				renderer.render( scene, camera );
			}
            //three

//parallax
 var tiga = document.getElementById('scene');
 var tigarallax = new Parallax(tiga);

////parallax

});