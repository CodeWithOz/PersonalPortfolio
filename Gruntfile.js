module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          // engine: 'im', <-- commented out for Windows (Udacity's instructions)
          separator: '_',
          sizes: [
            // NOTE: I used 150 dpi as 1x DPR which works for mobile/tablet
            // displays. For laptop/desktop displays, the value may be around
            // 72-96 dpi.
            // see https://www.html5rocks.com/en/mobile/high-dpi/#toc-bg

            // I focused on mobile displays to enforce a mobile-first
            // priority and minimize use cases that I had to account for.

            {
              quality: 60,
              width: 350,
              density: 150,
              name: '1x'
            },
            {
              quality: 60,
              width: 700,
              density: 300,
              name: '2x'
            }
          ]
        },

        files: [{
          expand: true,
          // only process images meant for Featured Work section (for now)
          src: ['*.{jpg,png}', '!bitmoji_uche.jpg', '!real_uche.jpg'],
          cwd: 'images_sm/',
          dest: 'images_resp/sm/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['images_resp/sm'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images_resp/sm']
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default', ['clean', 'mkdir', 'responsive_images']);

};
