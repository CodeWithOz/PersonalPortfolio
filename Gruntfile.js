module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      // NOTE: I used 150 dpi as 1x DPR which works for mobile/tablet
      // displays. For laptop/desktop displays, the value may be around
      // 72-96 dpi.
      // see https://www.html5rocks.com/en/mobile/high-dpi/#toc-bg

      // I focused on mobile displays to enforce a mobile-first
      // priority and minimize use cases that I had to account for.

      // the selected widths and heights are based my CSS declarations and
      // browser testing to determine what is actually ideal

      // task target for logo for small breakpoint
      small_logo: {
        options: {
          // engine: 'im', <-- commented out for Windows (Udacity's instructions)
          separator: '_',
          sizes: [
            {
              quality: 60,
              width: 125,
              density: 150,
              name: '1x'
            },
            {
              quality: 60,
              width: 250,
              density: 300,
              name: '2x'
            }
          ]
        },

        files: [{
          expand: true,
          src: ['bitmoji_uche.jpg'],
          cwd: 'images_sm/',
          dest: 'images_resp/sm/'
        }]
      },

      // task target for logo for medium breakpoint
      med_logo: {
        options: {
          // engine: 'im', <-- commented out for Windows (Udacity's instructions)
          separator: '_',
          sizes: [
            {
              quality: 60,
              height: 125,
              density: 150,
              name: '1x'
            },
            {
              quality: 60,
              height: 250,
              density: 300,
              name: '2x'
            }
          ]
        },

        files: [{
          expand: true,
          src: ['bitmoji_uche.jpg'],
          cwd: 'images_md/',
          dest: 'images_resp/md/'
        }]
      },

      // task target for other images for small breakpoint
      small_not_logo: {
        options: {
          // engine: 'im', <-- commented out for Windows (Udacity's instructions)
          separator: '_',
          sizes: [
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
          // don't process Bitmoji image
          src: ['*.{jpg,png}', '!bitmoji_uche.jpg'],
          cwd: 'images_sm/',
          dest: 'images_resp/sm/'
        }]
      },

      // task target for my pic for medium breakpoint
      med_my_pic: {
        options: {
          // engine: 'im', <-- commented out for Windows (Udacity's instructions)
          separator: '_',
          sizes: [
            {
              quality: 60,
              width: 252,
              density: 150,
              name: '1x'
            },
            {
              quality: 60,
              width: 504,
              density: 300,
              name: '2x'
            }
          ]
        },

        files: [{
          expand: true,
          // process my pic
          src: ['real_uche.jpg'],
          cwd: 'images_md/',
          dest: 'images_resp/md/'
        }]
      },

      // task target for my pic for large breakpoint
      lg_my_pic: {
        options: {
          // engine: 'im', <-- commented out for Windows (Udacity's instructions)
          separator: '_',
          sizes: [
            {
              // use full quality because these screens are big
              quality: 100,
              width: 389,
              density: 150,
              name: '1x'
            },
            {
              quality: 100,
              width: 778,
              density: 300,
              name: '2x'
            }
          ]
        },

        files: [{
          expand: true,
          // process my pic
          src: ['real_uche.jpg'],
          cwd: 'images_lg/',
          dest: 'images_resp/lg/'
        }]
      },

      // task target for Featured Work images for medium breakpoint
      med_featured_work: {
        options: {
          // engine: 'im', <-- commented out for Windows (Udacity's instructions)
          separator: '_',
          sizes: [
            {
              quality: 60,
              width: 210,
              density: 150,
              name: '1x'
            },
            {
              quality: 60,
              width: 420,
              density: 300,
              name: '2x'
            }
          ]
        },

        files: [{
          expand: true,
          // process Featured Work images
          src: ['*.{jpg,png}', '!bitmoji_uche.jpg', '!real_uche.jpg'],
          cwd: 'images_md/',
          dest: 'images_resp/md/'
        }]
      },

      // task target for Featured Work images for medium breakpoint
      lg_featured_work: {
        options: {
          // engine: 'im', <-- commented out for Windows (Udacity's instructions)
          separator: '_',
          sizes: [
            // use full quality because these screens are large
            {
              quality: 100,
              width: 245,
              density: 150,
              name: '1x'
            },
            {
              quality: 100,
              width: 490,
              density: 300,
              name: '2x'
            }
          ]
        },

        files: [{
          expand: true,
          // process Featured Work images
          // NOTE: no Bitmoji image at this breakpoint because it's
          // limited to the same dimensions as the medium breakpoint
          src: ['*.jpg', '!real_uche.jpg'],
          cwd: 'images_lg/',
          dest: 'images_resp/lg/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      // task target for folder for small breakpoint
      dev: {
        src: ['images_resp/sm']
      },

      // task target for folder for medium breakpoint
      med: {
        src: ['images_resp/md']
      },

      // task target for folder for large breakpoint
      lg: {
        src: ['images_resp/lg']
      }
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      // task target for folder for small breakpoint
      dev: {
        options: {
          create: ['images_resp/sm']
        }
      },

      // task target for folder for medium breakpoint
      med: {
        options: {
          create: ['images_resp/md']
        }
      },

      // task target for folder for medium breakpoint
      lg: {
        options: {
          create: ['images_resp/lg']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default', [
    'clean',
    'mkdir',
    'responsive_images:small_logo',
    'responsive_images:small_not_logo'
  ]);

  // task for images for medium breakpoint
  grunt.registerTask('med_imgs', [
    'clean:med',
    'mkdir:med',
    'responsive_images:med_logo',
    'responsive_images:med_my_pic',
    'responsive_images:med_featured_work'
  ]);

  // task for images for large breakpoint
  grunt.registerTask('lg_imgs', [
    'clean:lg',
    'mkdir:lg',
    'responsive_images:lg_my_pic',
    'responsive_images:lg_featured_work'
  ]);

};
