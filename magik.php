<?php
$image = new Imagick($_GET['background']);
foreach($_GET as $key => $value){
  $layer = new Imagick($value);
  $image->compositeImage($layer,imagick::COMPOSITE_DEFAULT,0,0);
}
 
ob_clean();

header("Content-Type: image/jpeg");
echo $image;
$image->clear();
?>