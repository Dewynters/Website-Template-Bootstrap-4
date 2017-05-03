<?php
// Nav Variables.
$page = explode( '/', $_SERVER['PHP_SELF'] );
$page = end( $page );

$user = 'cpanelaccountname';
$domain = 'domainname.com';
$localfolder = 'Local-Folder-Name';

// Doc root paths and urls
if (strpos($_SERVER['SERVER_NAME'], 'dev.') !== FALSE) {
	// DEV SITE
	$fullPath 	= '/var/home/' . $domain . '/websites/www/build/';
	$root 		= '//dev.' . $domain . '/websites/www/build/';
} elseif (strpos($_SERVER['SERVER_NAME'], 'localhost') !== FALSE) {
	// LOCAL SITE	
	$fullPath 	= '/Applications/XAMPP/XAMPP-Sites/' . $localfolder . '/build/';
	$root 		= '//localhost/XAMPP-Sites/' . $localfolder . '/build/';
} else {
	// LIVE SITE	
	$fullPath 	= '/var/home/' . $user . '/public_html/';
	$root 		= '//'. $domain .'/';
}

// Head meta variables.
$title = "Page title";
$description = "Meta description";

// Custom vars.
$body_class = "";
$body_id    = "";

// Social
$facebook = "";
$twitter = "";
$instagram = "";

//Booking links
$booking_link = "";
