(function (global) {
	System.config({
		paths: {
			'npm:': 'node_modules/',
            'underscore': 'node_modules/underscore/underscore-min.js'
		},
		map: {
			'app': 'app',
			'@angular/core': 'npm:@angular/core/bundles/core.umd.js',
			'@angular/common': 'npm:@angular/common/bundles/common.umd.js',
			'@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
			'@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
			'@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
			'@angular/http': 'npm:@angular/http/bundles/http.umd.js',
			'@angular/router': 'npm:@angular/router/bundles/router.umd.js',
			'@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
			'rxjs': 'npm:rxjs',
			'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
			'@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
			'ng2-cookies': 'npm:ng2-cookies/cookie.js',
			'file-saver': 'npm:file-saver',
			'moment': 'npm:moment',
			'd3': 'npm:d3/dist',
		},
		packages: {
			app: {
				main: './main.js',
				defaultExtension: 'js',
				meta: {
					'./*.js': {
						loader: 'systemjs-angular-loader.js'
					}
				}
			},
			rxjs: {
				defaultExtension: 'js'
			},
			'file-saver': {
				format: 'global',
				main: 'FileSaver.js',
				defaultExtension: 'js'
			},
			'moment' : {
				format: 'global',
				main: 'moment.js',
				defaultExtension: 'js'
			},
			'd3': {
				main: 'd3.js',
				defaultExtension: 'js'
			}
		}
	});
})(this);