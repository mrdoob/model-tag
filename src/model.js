/**
 * @author mrdoob / http://mrdoob.com/
 */

import { PerspectiveCamera, Scene, WebGLRenderer } from '../node_modules/three/build/three.module.js';

class ModelElement extends HTMLElement {

	constructor() {

		super();

		var scope = this;

		scope.width = 400;
		scope.height = 400;
		scope.camera = new PerspectiveCamera();
		scope.camera.position.set( 0, 0, 1 );

		scope.scene = new Scene();

		scope.renderer = new WebGLRenderer( { antialias: true } );
		scope.renderer.shadowMap.enabled = true;
		scope.renderer.setSize( this.width, this.height );

		var shadow = this.attachShadow( { mode: 'open' } );
		shadow.appendChild( this.renderer.domElement );

	}

}

export { ModelElement };
