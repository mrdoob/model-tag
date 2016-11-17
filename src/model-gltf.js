/**
 * @author mrdoob / http://mrdoob.com/
 */

import { ModelElement } from './model.js';
import { GLTFLoader } from './loaders/GLTFLoader.js';

class GLTFModelElement extends ModelElement {

	constructor() {

		super();

		var scope = this;

		scope.data = {};

		function animate( time ) {

			GLTFLoader.Animations.update();
			GLTFLoader.Shaders.update( scope.scene, scope.camera );

			scope.renderer.render( scope.scene, scope.camera );

			requestAnimationFrame( animate );

		}

		requestAnimationFrame( animate );

	}

	static get observedAttributes() { return [ 'src' ]; }

	attributeChangedCallback( attribute, oldValue, newValue ) {

		var scope = this;

		if ( attribute === 'src' ) {

			new GLTFLoader().load( newValue, function ( data ) {

				if ( data.animations ) {

					var animations = data.animations;

					for ( var i = 0, l = animations.length; i < l; i++ ) {

						var animation = animations[ i ];

						animation.loop = true;
						animation.play();

					}

				}

				scope.scene = data.scene;
				scope.camera = data.cameras[ 1 ];

			} );

		}

	}

}

customElements.define( 'model-gltf', GLTFModelElement );
