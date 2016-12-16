/**
 * @author mrdoob / http://mrdoob.com/
 */

import { ModelElement } from './model.js';
import { STLLoader } from './loaders/STLLoader.js';
import { Box3, DirectionalLight, HemisphereLight, Mesh, MeshPhongMaterial, Vector3 } from '../node_modules/three/build/three.module.js';

class StlModelElement extends ModelElement {

	constructor() {

		super();

		var scope = this;

		var light = new HemisphereLight( 0xaaaaff, 0x806060, 0.2 );
		light.position.set( 0, 1, 0 );
		scope.scene.add( light );

		var light = new DirectionalLight( 0xffffff, 0.8 );
		light.position.set( 1, 1, 1 );
		scope.scene.add( light );

		scope.cameraDistance = 1;
		scope.cameraCenter = new Vector3();

		function animate( time ) {

			time /= 2000;

			var distance = scope.cameraDistance / 1.25;

			scope.camera.position.x = Math.sin( time ) * distance;
			scope.camera.position.y = distance / 5;
			scope.camera.position.z = Math.cos( time ) * distance;
			scope.camera.position.add( scope.cameraCenter );
			scope.camera.lookAt( scope.cameraCenter );

			scope.renderer.render( scope.scene, scope.camera );

			requestAnimationFrame( animate );

		}

		requestAnimationFrame( animate );

	}

	static get observedAttributes() { return [ 'src' ]; }

	attributeChangedCallback( attribute, oldValue, newValue ) {

		var scope = this;

		if ( attribute === 'src' ) {

			new STLLoader().load( newValue, function ( geometry ) {

				var object = new Mesh( geometry, new MeshPhongMaterial() );

				var box = new Box3().setFromObject( object );
				scope.cameraDistance = box.getSize().length();
				scope.cameraCenter = box.getCenter();
				scope.scene.add( object );

			} );

		}

	}

}

customElements.define( 'model-stl', StlModelElement );
