<?php

function custom_render_testimonial_block($attributes) {
    ob_start();
    ?>
    <div class="testimonial-block">
        <blockquote>
            <p><?php echo esc_html($attributes['quote']); ?></p>
            <cite><?php echo esc_html($attributes['name']); ?></cite>
        </blockquote>
    </div>
    <?php
    return ob_get_clean();
}
