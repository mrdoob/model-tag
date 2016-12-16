/**
 * @author mrdoob / http://mrdoob.com/
 */

import { ModelElement } from './model.js';
import { Box3, ObjectLoader } from '../node_modules/three/build/three.module.js';

class ThreeModelElement extends ModelElement {

	constructor() {

		super();

		var scope = this;

		scope.cameraDistance = 1;

		function animate( time ) {

			time /= 2000;

			var distance = scope.cameraDistance / 2;

			scope.camera.position.x = Math.sin( time ) * distance;
			scope.camera.position.y = distance / 3;
			scope.camera.position.z = Math.cos( time ) * distance;
			scope.camera.lookAt( scope.scene.position );

			scope.renderer.render( scope.scene, scope.camera );

			requestAnimationFrame( animate );

		}

		requestAnimationFrame( animate );

	}

	static get observedAttributes() { return [ 'src' ]; }

	attributeChangedCallback( attribute, oldValue, newValue ) {

		var scope = this;

		if ( attribute === 'src' ) {

			new ObjectLoader().load( newValue, function ( object ) {

				scope.cameraDistance = new Box3().setFromObject( object ).getSize().length();
				scope.scene.add( object );

			} );

		}

	}

}

customElements.define( 'model-three', ThreeModelElement );
