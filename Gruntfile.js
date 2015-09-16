module.exports = function(grunt){
	grunt.initConfig({

	  uglify: {
	    options: {
	      mangle: {
	        except: ['jQuery', 'vtexjs']
	      }
	    },
	    my_target: {
	      files: {
	        'dist/jquery.vtexcart.min.js': ['src/jquery.vtexcart.js']
	      }
	    }
	  },

	  jshint: {
	  	options:{
	  		reporter: require('jshint-stylish'),
	  		globals:{
	  			jQuery:true
	  		}
	  	},
	  	target:['src/jquery.vtexcart.js']
	  },

	  watch: {
	  	scripts: {
		    files: ['src/**.js'],
		    tasks: ['jshint', 'uglify']
		}
	  }
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);
}