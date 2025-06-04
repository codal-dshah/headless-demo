<?php
/**
 * Plugin Name: Custom Gutenberg Blocks
 * Description: A plugin providing a testimonial slider and feature grid blocks with Slick Slider.
 * Version: 1.2
 * Author: Your Name
 */

if (!defined('ABSPATH')) exit;

function register_custom_blocks_plugin_assets() {
  
    // Testimonial Block
    wp_register_script('testimonial-block-js', plugins_url('testimonial-block.js', __FILE__), ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-block-editor'], filemtime(__DIR__ . '/testimonial-block.js'));
    register_block_type('custom/testimonial-slider', [
        'editor_script' => 'testimonial-block-js',
        'style'         => ['custom-block-style'],
    ]);

    // Feature Grid Block
    wp_register_script('fgb-block-js', plugins_url('fgb-block.js', __FILE__), ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-block-editor'], filemtime(__DIR__ . '/fgb-block.js'));
    register_block_type('custom/feature-grid', [
        'editor_script' => 'fgb-block-js',
        'style'         => ['custom-block-style'],
    ]);
}
add_action('init', 'register_custom_blocks_plugin_assets');
