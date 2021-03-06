<?php get_header();?>
<?php
global $wp_query;
$paged = get_query_var('paged') ? get_query_var('paged') : 1;
$jsparam = array('max_num_pages' => $wp_query->max_num_pages, 'found_posts' => $wp_query->found_posts, 'current_page' => $paged);

?>
<div class="container home_content">
<?php echo "<script>WCTPE.posts=" . json_encode($jsparam) . ";</script>"; ?>
<?php if (have_posts()): ?>

<!-- Add the pagination functions here. -->
<div class="row">
<div class="tattoo_posts_lists">
<!-- Start of the main loop. -->
<?php while (have_posts()): the_post();
	// $datetime = get_post_meta(get_the_ID(), 'wctp2018-post-datetime', true);
	// $email = get_post_meta(get_the_ID(), 'wctp2018-author-email', true);
	// $website = get_post_meta(get_the_ID(), 'wctpe2018-author-website', true);
	$name = get_post_meta(get_the_ID(), 'wctp2018-author-name', true);
	$title = get_post_meta(get_the_ID(), 'wctp2018-post-title', true);
	$content = mb_substr(get_post_meta(get_the_ID(), 'wctp2018-post-content', true), 0, 40) . "...";
	// $image_full = get_post_meta(get_the_ID(), 'wctp2018-post-image-full', true);
	$image_large = get_post_meta(get_the_ID(), 'wctp2018-post-image-large', true);

	echo '<div class="col-md-3 m_b_20 post"><div class="box"><div class=" post_img"><a href="' . get_permalink($post->ID) . '"><img src="' . $image_large . '"/></a></div><a href="' . get_permalink($post->ID) . '" class="name"><h2 >' . $content . ' - ' . $name . '</h2></a></div></div>';
endwhile
?>
</div>
<!-- End of the main loop -->

</div>
<?php else: ?>
<p><?php echo '<p class="text-center">Sorry, no posts here. <a href="/submit/">Strat from you now!</a> / 尚未有投稿哦！<a href="/submit/">來當第一個吧～</a></p>'; ?></p>
<?php endif;?>
<div class="row more_btn">
<?php if ($wp_query->max_num_pages > 1 && ($paged + 1) <= $wp_query->max_num_pages): ?>
<div class="col-sm-6"><a class=" new_posts" href="javascript://">Find News / 查看最新</a></div>
<div class="col-sm-6"><a class=" more_posts" href="javascript://">Load More / 載入更多</a></div>
<?php endif;?>
</div>
<a class="f_btn" href="/submit">這是什麼？ / What's this?</a>
</div>
</div>
<?php get_footer();?>
